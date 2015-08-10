/**
 * ͨ�����ϲ���������֪�������������ص㣺
 * more see: 

 ����ִ������������ң�ֻ��˳�����
 ����һ��Ԫ�ص�ʱ�临�Ӷ�Ϊ���Լ�O(n)
 ����֪�������Ľڵ�ʱ�������ɾ��������ʱ�临�Ӷ�Ϊ������O(1)
 ����ÿ���ڵ㶼��Ҫ������һ���ڵ�����������Ը��Ӻķѿռ�
 ��������ص���������෴��

 �ܹ�ִ��������ң����Һķ�ʱ�临�Ӷ�ΪO(1)
 �����ɾ��������ʱ�临�Ӷ�Ϊ���Լ�O(n)
 ��Ҫ����һ�����������ڴ�ռ�
 ���ϣ������ܽ�������������ң������ٶ������������ɾ�����ٶȺܿ졣����������Щ����Ҫ����������ң�����Ƶ�������ɾ�������ݼ���
 ���⣬���������ÿ���ڵ���Ҫ�ķѶ���ռ䣬�����ݼ��ܴ�ʱ���ռ����⽫����һ�����ܵ�������
 */

/**
 * ListNode ����Ľڵ�����
 * next: ������
 * @param data ������
 * @constructor
 */
function ListNode(data) {
    this.data = data;
    this.next = null;
}

/**
 * �׽ڵ㣬tail��β�ڵ�
 * @constructor
 */
function LinkedList() {
    this.head = null;
    this.tail = null;
}

/**
 * ��ͷ��ʼ���ң�����Ԫ��
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
 * �ڵ�����
 * ��ĳ���ڵ�p����룬ֻ��Ҫ�Ѵ�����Ľڵ�x��nextָ��p��next�ڵ㣬Ȼ���ٰ�p�ڵ��nextָ��x���ɡ�
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
 * �ڵ�ǰ����
 * �ڵ�ǰ������΢����һЩ������Ҫ֪���ýڵ�֮ǰ�Ľڵ���ʲô
 * ������Ҫ�Ȳ��Ҹýڵ�֮ǰ�Ľڵ�p��Ȼ���pִ�нڵ����롣������һ��������������ǽڵ�p��ͷ�ڵ㡣
 * ���Ǵ�ͷ�ڵ㿪ʼ���ֱ���prev��ʾǰ�ڵ㣬��cur��ʾ�ֽڵ㣬ÿ�α���ʱ��ʹprev������һ�ε�cur������prev.next��Զָ��cur����cur�ڵ�Ϊ��Ҫ����Ľڵ�ʱ��prev�ڵ������ǰ��Ľڵ��ˡ�
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
 * ���ǰ�ͷ�ڵ������������������
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
 * �ڵ�ǰ����
 * ���������Ϊ������Ľڵ�Ϊ�����ڶ����ڵ㣬ʱ�临�Ӷ�ΪO(n)������֪������ڵ㣬ʱ�临�Ӷ���ΪO(1)��
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
 * ɾ��
 * ɾ���������ڵ�����Ĳ��������෴������ֻ��Ҫ�ҵ���ɾ���ڵ�p��ǰһ���ڵ�prev��Ȼ��prev��nextָ��p��next�ڵ㼴�ɡ�����������Ǵ�ɾ���Ľڵ�Ϊͷ�ڵ㣬����ֻ��Ҫ��headָ��ԭhead��next���ɡ�
 * ɾ���Ͳ����ʱ�临�Ӷ�һ�£�����֪Ҫɾ���Ľڵ��ǰ�ڵ㣬��ɾ������Ĳ���ʱ�临�Ӷ�ΪO(1)��
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
 * ����

 ���ò�������΢��Ҫ�㼼�ɵĲ���������㿴�������ϣ������˼��һ�����(������ʱ����)ʵ�����������

 ��һ��ֱ�۵�˼·�ǣ���������������ÿ���ڵ����һ���ڵ��next��ָ���Լ���

 ����Ĳ���Ϊ���赱ǰ�ڵ�Ϊp��p��next�ڵ�Ϊq��ÿһ��������Ҫ��q.next���浽temp�Ȼ���ٽ�q.nextָ��p;Ȼ��p����q��λ�ã�q��ֲtmp��λ�ã�ֱ��qΪnull��

 ���������Ҫ������ͷ�ڵ���д������ڵ��ã�֮ǰ��ͷ�����������β�ڵ㣬��Ҫ����nextָ��null��Ȼ���ٽ�ͷ�ڵ�ָ��֮ǰ��β�ڵ㣬��p��
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
 * �����Ӧ�ã�����ʽ
 */

function PolyData(cof, exp) {
    this.cof = cof;
    this.exp = exp;
}

/**
 * ��������ʽ����һ���ɶ���ʽ�ڵ���ɵ��������ǿ��Լ̳���LinkedList:
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
