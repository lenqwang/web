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
     * 前置方法
     * @param target 被植入的对象
     * @param method 被植入的方法名称
     * @param advice 通知函数
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