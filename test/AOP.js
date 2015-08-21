function Person() {
    this.say = function () {
        console.log('i am saying!');
    };

    this.cry = function () {
        console.log('i am crying!');
    };

    this.round = function () {
        console.log('i am round!');
    };
}

Aspects = function () {

};

Aspects.prototype = {
    /**
     * ǰ�÷���
     * @param target ��ֲ��Ķ���
     * @param method ��ֲ��ķ�������
     * @param advice ֪ͨ����
     */
    before: function(target, method, advice) {
        (advice)();

        for(var i in target) {
            if(i == method) {
                target[i]();
            }
        }
    },
    after: function(target, method, advice) {
        for(var i in target) {
            if(i == method) {
                target[i]();
            }
        }
        (advice)();
    },
    around: function(target, method, advice) {
        (advice)();
        for (var i in target) {
            if (i == method) {
                target[i]();
            }
        }
        (advice)();
    }
};

var t = new Person();
var a = new Aspects();

//a.before(t, 'say', function() {
//   console.log('i running by before!');
//});
//
//a.after(t, 'cry', function() {
//    console.log('i running by after!');
//});

a.around(t, 'round', function () {
    console.log('i am running by round!');
})