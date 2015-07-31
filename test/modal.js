/**
 *  @author lenq <gzwanglinquan@corp.netease.com>
 *  主要通过Modal来创建一个模态窗口，使用方式如下：
 *
 *      @example
 *      Modal.init({
 *          title: '标题',
 *          content: '加载中...',
 *          width: 'auto',
 *          isDestory: true,
 *          callback: function() {},
 *          buttons: [
 *              {
 *                  type: 'button',
 *                  text: '确定',
 *                  classes: 'btn btn-primary',
 *                  events: {
 *                      click: function(event) {
 *                          var that = event.data.modal;
 *                          // do sth...
 *                          that.close();
 *                      }
 *                  }
 *              }
 *          ]
 *     });
 *
 */
var Modal = function() {
	var exports = {};

	// private
	var Md = function() {};

	/**
	 * 初始化modal配置
	 * @param opts - 用户输入的选项
	 */
	Md.prototype.init = function(opts) {
		// 初始化配置
		/**
		 * 初始化选项
		 *
		 *      @example
		 *      {
         *         title: '标题',
         *         content: '加载中...',
         *         width: 'auto',
         *         isDestory: true,
         *         options: {
         *             show: false,
         *             backdrop: 'static'
         *         },
         *         callback: function() {},
         *         buttons: [
         *             {
         *                type: 'button',
         *                text: '确定',
         *                classes: 'btn btn-primary',
         *                attrs: {
         *                  // 'data-dismiss': 'modal'
         *                }
         *             }
         *          ]
         *      }
		 */
		opts = $.extend(true, {
			title: '标题',
			content: '加载中...',
			width: 'auto',
			isDestory: true,
			options: {
				show: false,
				backdrop: 'static'
			},
			callback: function() {},
			buttons: [
				{
					type: 'button',
					text: '确定',
					classes: 'btn btn-primary',
					attrs: {
						// 'data-dismiss': 'modal'
					}
				}
			]
		}, opts || {});

		this.opts = opts;

		this.buildHtml();
		this.renderHtml();
		this.render();
	};

	/**
	 * 构建模态窗口的html结构
	 * @private
	 */
	Md.prototype.buildHtml = function() {
		var title = this.opts.title || '',
			cacheClass = 'cache_class'+ new Date().getTime(),

			el = $('<div />', {
				'class': 'modal fade '+cacheClass
			}),

			modal_dialog = $('<div />', {
				'class': 'modal-dialog'
			}),

			modal_content = $('<div />', {
				'class': 'modal-content'
			}),

			modal_header = $('<div />', {
				'class': 'modal-header'
			}).append('<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
				'<span aria-hidden="true">x</span>'+
				'</button>'),

			modal_body = $('<div />', {'class': 'modal-body'}),

			modal_footer = $('<div />', {'class': 'modal-footer'}),

			modal_title = $('<h4 />', {'class': 'modal-title'});

		modal_title.appendTo(modal_header);

		modal_header.appendTo(modal_content);

		modal_content.append(modal_header).append(modal_body).append(modal_footer);

		modal_dialog.append(modal_content);

		el.append(modal_dialog);

		this.modal = el;
		this.dialog = modal_dialog;
		this.title = modal_title;
		this.footer = modal_footer;
		this.body = modal_body;
	};

	/**
	 * 渲染页面
	 * @private
	 */
	Md.prototype.renderHtml = function() {
		var opt = this.opts;

		this.dialog.width(opt.width);
		this.title.html(opt.title);
		this.body.html(opt.content);
		this.buildFooter();

	};

	/**
	 * 构建模态窗口的底部按钮
	 * @private
	 */
	Md.prototype.buildFooter = function() {
		var buttons = this.opts.buttons,
			footer = this.footer,
			that = this,
			ret = $.isArray(buttons) && buttons.length > 0,
			i = 0;

		if(ret) {
			for(; i < buttons.length; i++) {
				var _button = buttons[i];

				$('<button />', {
					'type': _button.type,
				})
					.attr(_button.attrs)
					.text(_button.text)
					.addClass(_button.classes)
					.appendTo(footer)
					.on(_button.events, {modal: that});
			}
		}
	};

	/**
	 * 渲染到页面上并进行显示
	 * @private
	 */
	Md.prototype.render = function() {
		var isDestory = this.opts.isDestory, _modal,
			callback = this.opts.callback;

		if( $(document).find('.modal').size() > 0 ) {
			return;
		}

		this.modal.modal(this.opts.options);
		this.modal.modal('show');

		this.modal.on('shown.bs.modal', function(e) {
			callback && callback(e.target);
		});

		this.modal.on('hidden.bs.modal', function(e) {
			$(this).data('bs.modal', null);

			if(isDestory) $(this).remove();
		});

	};

	/**
	 * 关闭模态窗口
	 *
	 *      @example
	 *      Modal.init({
     *          button: [
     *              {
     *                  type: 'button',
     *                  text: '关闭窗口',
     *                  classes: 'btn btn-default',
     *                  events: {
     *                      click: function(event) {
     *                          var that = event.data.modal;
     *                          that.close();
     *                      }
     *                  }
     *              }
     *          ]
     *      });
	 */
	Md.prototype.close = function() {
		this.modal.modal('hide');
	};

	// Md.prototype.setInfo = function() {

	// };

	/**
	 * 返回一个构建好的对象
	 * @param {Object} opts
	 * @return {Object} 返回一个实例
	 */
	exports.init = function(opts) {
		return new Md().init(opts);
	};

	/**
	 * 拓展Modal的函数,用于继承Md.prototype
	 * @param obj
	 * @return {Object} Md.prototype
	 */
	exports.fn = function(obj) {
		if($.isPlainObject(obj)) {
			return $.extend(Md.prototype, obj);
		}
		else {
			return $.extend(Md.prototype, {});
		}
	};

	return exports;
}();