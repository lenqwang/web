(function () {
    var EXECTIME = 50,
        DELAY = 25;

    var that = {},
        timer = '',
        slice = [].slice,
        channelList = {};

    var on = function (channel, type, callback, context) {
        var curChannel = channelList[channel];

        if(!curChannel) {
            curChannel = channelList[channel] = {};
        }
        curChannel[type] = curChannel[type] || [];

        curChannel[type].push({
            'func': callback,
            'context': context || that
        });
    };

    var once = function (channel, type, callback, context) {
        var _once = function () {
            that.off(channel, type, _once);
            return callback.apply(context || that, arguments);
        };

        on(channel, type, _once, context);
    };

    var trigger = function (channel, type, data) {
        if(channelList[channel] && channelList[channel][type] && channelList[channel][type].length) {
            var taskList = channelList[channel][type];
            var curHandlers = [];

            for(var i = taskList.length; i--;) {
                curHandlers.push({
                    'handler': taskList[i],
                    'args': slice.call(arguments, 1)
                });
            }

            (function () {
                var start = +new Date();

                do {
                   var curTask = curHandlers.shift(),
                       handler = curTask.handler;

                    try {
                        handler.func.apply(handler.context, curTask.args);
                    } catch (exp) {
                        throw new Error('error: '+ exp);
                    }
                } while (curHandlers.length && (+new Date() - start < EXECTIME));

                if(curHandlers.length > 0) {
                    setTimeout(arguments.callee, DELAY);
                }

            })();
        }
    };

    var off = function (channel, type, callback, context) {
        context = context || that;

        if(channelList[channel] && channelList[channel][type] && channelList[channel][type].length) {
            var taskList = channelList[channel][type];
            var handler;

            for(var i = taskList.length; i--;) {
                handler = taskList[i];

                if(handler.func === callback && handler.context === context) {
                    taskList.splice(i, 1);
                }
            }
        }
    };

    that.on = on;
    that.once = once;
    that.trigger = trigger;
    that.off = off;

    window.listener = window.listener || that;
})();