/**
 * 通用函数
 * now: 获取时间戳
 * share: 分享组件
 * adaption: {string: el || Object || jQuery Object}自适应弹窗高度，当弹窗小于当前屏幕高度的时候会使用绝对路径
 * 
 */
var Common = {
    now: function() {
        return Date.now ? Date.now() : +new Date();
    },
    /**
     * 可以通过设置函数
     * url: '/queryUsers'
     * queryUsers: function(url, callback) {
     * 	Common.doAjax('http://example.org/'+ url, callback);
     * }
     */
    doAjax: function(url, data, callback) {
    	$.ajax({
    		type: "get",
    		url: url,
    		data: data,
    		dataType: 'jsonp',
    		success: function(resp) {
    			callback && callback(resp);
    		},
    		error: function() {
    			alert('网络信号不稳定，请刷新后重试!');
    		}
    	});
    },
    adaption: function(el) {
    	var resize_fn = null,
    		el = $(el);
    	
    	(resize_fn= function() {
			var win_height = $(window).height();
		
			if(el.is(':visible')) {    // el是弹窗容器
				var _hei = el.height();
				
				if(win_height <= _hei) {
					el.css('position', 'absolute');
		      	}
				else {
					el.css('position', 'fixed');
		      	}
		   }
		})();
			
		$(window).bind('resize', resize_fn);
		
    	return resize_fn;
    },
    limitPhone: function(target) {
    	var el = $(target);

        // 阻止用户输入内容
        el.bind('keydown', function(e) {
            var len = $(this).val().length;

            // 开启backspace
            if(e.which == 8) {
                return true;
            }
            // 在11位数字内
            if(len < 11) {
                // 不是数字、Backspace
                if(!isNumber(e.which)) {
                    return false;
                }
                // 是数字
                else {
                    return true;
                }
            }
            // 大于11位数字或不是数字
            else {
                return false;
            }

        });

        // 判断用户输入的是否为数字、Backspace
        function isNumber(code) {
            // 数字
            if(code >= 48 && code <= 57) {
                return true;
            }
            // 小数字键盘
            if(code >= 96 && code <= 105) {
                return true;
            }
            // BACKSPACE
            if(code == 8) {
                return true;
            }
            return false;
        }
    },
    placeholder: function(elem) {
    	var el = elem instanceof jQuery ? elem : $(elem),
    		_input = document.createElement('input'),
    		ret = 'placeholder' in _input;
    		
    	if(!ret && el.attr('placeholder')) { // 不支持placeholder
    		var val = el.attr('placeholder');
    		
    		el.val(val);
    		
    		el.bind('focus', function() {
    			if($(this).val() == val) {
    				$(this).val('');
    			}
    		}).bind('blur', function() {
    			if($(this).val() == '' || $(this).val() == val) {
    				$(this).val(val);
    			}
    		});
    	}
    },
    /*
		elem: selectAll element [selector, js DOM object]

    */
    selectAll: function(elem) {
    	elem = elem instanceof jQuery ? elem : $(elem);

    	var $checkboxs = elem.find(':checkbox'),
    		len = $checkboxs.size() - 1,
			alt = $checkboxs.eq(0);

    	elem.delegate(':checkbox', 'click', function() {
    		var me = $(this);

    		if(me.is(alt)) {
    			$checkboxs.prop('checked', this.checked);
    		}
    		else {
    			alt.prop('checked', len == elem.find(':checked').not(alt).size());
    		}
    	});
    }
};

var Utils = (function() {
    var exports = {},
        
        opts = {
            
        },

        isType = function(type) {
        	return function(obj) {
        		return {}.toString.call(obj) == '[object '+ type +']';
        	};
        },

        isFunction = isType('Function'),
        isUndefined = isType('Undefined');
        
        events = {},
        
        event = {
            on: function(name, callback) {
                var list = events[name] || (events[name] = []);
                
                list.push(callback);
            },
            off: function(name, callback) {
                if(!(name || callback)) {
                    events = {};
                    return;
                }
                
                var list = events[name];
                
                if(list) {
                    if(callback) {
                        for(var i = list.length - 1; i >= 0; i--) {
                            if(list[i] === callback) {
                                list.splice(i, 1);
                            }
                        }
                    }
                    else {
                        delete events[name];
                    }
                }
            },
            emit: function(name, data) {
                var list = events[name];
                
                list = list.slice();
                
                if(list) {
                    for(var i = 0; i < list.length; i++) {
                        list[i](data);
                    }
                }
            }
        },
        
        require = function(url, succ, err) {
            var script = document.createElement('script'),
                lastScript = document.getElementsByTagName('script'),
                done = false,
                len = lastScript.length;

            script.setAttribute('src', url);
            script.setAttribute('type', 'text/javascript');

            script.onload = script.onreadystatechange = function() {
                var ret = (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete'));

                if(ret) {
                    done = true;

                    succ && succ();

                    script.onload = script.onreadystatechange = null;
                }
            };

            if(err) script.onerror = err;

            document.body.insertBefore(script, lastScript[len - 1]);

        };

        exports.isType = isType;
        
        
    return exports;
    
})();

(function(w) {
	/**
	 * _dialog('#box', {
	 *  duration: 250 {number}
	 *  isAnimate: false {boolean}
	 *  zIndex: 1000,   {number|string}
	 * });
	 */
	// 对话框
	var Dialog = function(target, opts) {
	    // 定义目标
	    this.el = $(target);
	    this.mask = $('<div/>').addClass('J_dmask');
	    this.opts = opts || {};
	    this.close_el = opts.close_el || '.J_close';
	    this.zIndex = opts.zIndex || 1000;
	    this.duration = this.opts.duration || 250;
	
	    this.init();
	};
	
	$.extend(Dialog.prototype, {
	    init: function() {
	        var self = this,
	        	el_width = this.el.width(),
	        	el_height = this.el.height(),
	        	el_left = ($(document).width() - el_width) / 2,
	        	el_top = ($(w).height() - el_height) / 2;
	
	        // 设定mask的属性
	        this.mask.css({
	            position: 'fixed',
	            left: 0,
	            top: 0,
	            width: '100%',
	            height: '100%',
	            overflow: 'hidden',
	            userSelect: 'none',
	            opacity: .6,
	            background: '#000',
	            zIndex: self.zIndex
	        }).hide();
	        
//	        self.el.css({
//	        	width: el_width,
//	        	left: el_left,
//	        	top: el_top
//	        });
	        
	        this.el.delegate(self.close_el, 'click', function() {
	        	self.close();
	        });
	
	    },
	    close: function(fn) {
	        var self = this,
	        	_mask = this.mask;
	        	
	        if($('.J_dmask').size() == 0) {
	        	_mask.appendTo('body');
	        }
	        else {
	        	_mask = $('.J_dmask').eq(0);
	        }
	
	        if(self.opts.isAnimate) {
	            this.el.fadeOut(self.duration, function() {
	                self.el.hide();
	                fn && fn(self);
	            });
	            this.mask.fadeOut(self.duration, function() {
	                _mask.hide();
	            });
	        }
	        else {
	            this.el.css('display', 'none');
	            _mask.css('display', 'none');
	            fn && fn(self);
	        }
	    },
	    open: function(fn) {
	        var self = this,
	        	_mask = this.mask;
	        
	        if($('.J_dmask').size() == 0) {
	        	_mask.appendTo('body');
	        }
	        else {
	        	_mask = $('.J_dmask').eq(0);
	        }
	        
	        if(self.opts.isAnimate) {
	            this.el.fadeIn(self.duration, function() {
	                self.el.show();
	                fn && fn(self);
	            });
	            
	        	_mask.fadeIn(self.duration, function() {
	                _mask.show();
	            });
	
	        }
	        else {
	            this.el.css('display', 'block');
	            _mask.css('display', 'block');
	            fn && fn(self);
	        }
	    }
	});
	// 弹窗
	w.dialog = function(target, opts) {
	    return new Dialog(target, opts);
	}
})(window);
