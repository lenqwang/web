/**
 * 通过以上操作，我们知道链表有以下特点：
 * more see: 

 不能执行随机索引查找，只能顺序查找
 查找一个元素的时间复杂度为线性级O(n)
 在已知待操作的节点时，插入和删除操作的时间复杂度为常数级O(1)
 由于每个节点都需要储存下一个节点的索引，所以更加耗费空间
 而数组的特点大多和链表相反：

 能够执行随机查找，查找耗费时间复杂度为O(1)
 插入和删除操作的时间复杂度为线性级O(n)
 需要开辟一整块连续的内存空间
 综上：链表不能进行随机索引查找，查找速度慢，而插入和删除的速度很快。所以适于那些不需要进行随机查找，但是频繁插入和删除的数据集。
 另外，由于链表的每个节点需要耗费额外空间，当数据集很大时，空间问题将会是一个可能的隐患。
 */

/**
 * ListNode 链表的节点类型
 * next: 索引域
 * @param data 数据域
 * @constructor
 */
function ListNode(data) {
    this.data = data;
    this.next = null;
}

/**
 * 首节点，tail：尾节点
 * @constructor
 */
function LinkedList() {
    this.head = null;
    this.tail = null;
}

/**
 * 从头开始查找，遍历元素
 * @param element
 * @returns {null}
 */
LinkedList.prototype.find = function (element) {
    var p = this.head;

    while(p != null && p.data != element) {
        p = p.next;
    }

    return p;
};

/**
 * 节点后插入
 * 在某个节点p后插入，只需要把待插入的节点x的next指向p的next节点，然后再把p节点的next指向x即可。
 * @param element
 * @param node
 */
LinkedList.prototype.insertAfterNode = function (element, node) {
    if(node == null) return;

    var n = new ListNode(element);

    n.next = node.next;

    node.next = n;

    if(node == this.tail) {
        this.tail = n;
    }
};

/**
 * 节点前插入
 * 节点前插入稍微复杂一些，这需要知道该节点之前的节点是什么
 * 我们需要先查找该节点之前的节点p，然后对p执行节点后插入。此中有一个特殊情况，就是节点p是头节点。
 * 我们从头节点开始，分别用prev表示前节点，而cur表示现节点，每次遍历时都使prev等于上一次的cur，这样prev.next永远指向cur。当cur节点为需要插入的节点时，prev节点就是它前面的节点了。
 * @param element
 * @returns {*[]}
 */
LinkedList.prototype.findPrevious = function (element) {
    var prev = null;
    var cur = this.head;

    while(cur != null && cur.data != element) {
        prev = cur;
        cur = cur.next;
    }
    return [prev, cur];
};

/**
 * 我们把头节点的特殊情况抽象出来。
 * @param element
 */
LinkedList.prototype.addFirst = function (element) {
    var h = new ListNode(element);
    h.next = this.head;

    if(this.head == null) {
        this.tail = h;
    }

    this.head = h;
};

/**
 * 节点前插入
 * 插入的最坏情况为待插入的节点为倒数第二个节点，时间复杂度为O(n)。若已知待插入节点，时间复杂度则为O(1)。
 * @param element
 * @param data
 */
LinkedList.prototype.insertBefore = function (element, data) {
    if(this.head == null) return;

    if(this.head.data === data) {
        this.addFirst(element);
        return;
    }
    var p = this.findPrevious(data);
    var prev = p[0];
    var cur = p[1];

    if(cur != null) {
        var n = new ListNode(element);
        prev.next = n;
        n.next = cur;
    }

};

/**
 * 删除
 * 删除操作跟节点后插入的操作正好相反。我们只需要找到待删除节点p的前一个节点prev，然后将prev的next指向p的next节点即可。特殊情况仍是待删除的节点为头节点，我们只需要将head指向原head的next即可。
 * 删除和插入的时间复杂度一致，若已知要删除的节点的前节点，则删除本身的操作时间复杂度为O(1)。
 * @param element
 */
LinkedList.prototype.delete = function (element) {
    if(this.head.data == element) {
        this.head = this.head.next;
        return;
    }

    var p = this.findPrevious(element);
    var prev = p[0];
    var cur = p[1];

    if(prev != null && cur != null) {
        prev.next = cur.next;
    }
};

/**
 * 倒置

 倒置操作是稍微需要点技巧的操作。如果你看到了这里，希望你先思考一下如何(在线性时间内)实现这个操作。

 有一种直观的思路是：遍历整个链表，将每个节点的下一个节点的next域指向自己。

 具体的操作为：设当前节点为p，p的next节点为q，每一次我们需要将q.next缓存到temp里，然后再将q.next指向p;然后将p移至q的位置，q移植tmp的位置，直至q为null。

 最后我们需要单独对头节点进行处理，由于倒置，之前的头结点变成了现在尾节点，需要将其next指向null，然后再将头节点指向之前的尾节点，即p。
 * @returns {*}
 */
LinkedList.prototype.reverse = function () {
    var p = this.head;
    if(p == null) {
        return null;
    }

    this.tail = p;
    var tmp, q = p.next;

    while(q != null) {
        tmp = q.next;
        q.next = p;
        p = q;
        q = tmp;
    }

    this.head.next = null;
    this.head = p;
    return this;
};


/**
 * 链表的应用：多项式
 */

function PolyData(cof, exp) {
    this.cof = cof;
    this.exp = exp;
}

/**
 * 整个多项式就是一个由多项式节点组成的链表，我们可以继承自LinkedList:
 */
function Poly(cofs, exps) {
    this.head = null;
    this.tail = null;
    var node;

    for(var i = 0; i < cofs.length; ++i) {
        node = new PolyData(cofs[i], exps[i]);
        this.append(node);
    }
}

Poly.prototype = new LinkedList();

Poly.prototype.constructor = Poly;
