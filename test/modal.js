/*
	version: 0.0.2
	// 初始化配置
	Modal.init({
		title: '标题',
		content: '加载中...',
		width: 'auto',
		isDestory: true,
		callback: function() {},
		buttons: [
			{
				type: 'button',
				text: '确定',
				classes: 'btn btn-primary',
				events: {
					click: function() {
						alert('点击我弹出来了');
					}
				}
			}
		]
	});
	
	// 事件集
	// 
	Modal.on('md.')
	
	// 拓展
	Modal.fn({
		getWidth: function() {
			return this.opts.width;
		}
	});
*/

var Modal = function() {
	var exports = {};
	
	var Md = function() {};
	
	Md.prototype.init = function(opts) {
		// 初始化配置
		opts = $.extend({
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
						'data-dismiss': 'modal'
					}
				}	
			]
		}, opts || {});
		
		this.opts = opts;
		
		this.buildHtml();
		this.renderHtml();
		this.render();
	};
	
	Md.prototype.buildHtml = function() {
		var title = this.opts.title || '',
			
			el = $('<div />', {
				'class': 'modal fade'
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
	
	Md.prototype.renderHtml = function() {
		var opt = this.opts;
		
		this.dialog.width(opt.width);
		this.title.html(opt.title);
		this.body.html(opt.content);
		this.buildFooter();
		
	};
	
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
	
	Md.prototype.render = function() {
		this.modal.modal(this.opts.options);
		this.modal.modal('show');
		this.modal.on('hidden.bs.modal', function() {
			$(this).data('bs.modal', null);
			$(this).remove();
		});
		
	};
	
	Md.prototype.close = function() {
		this.modal.modal('hide');
	};
	
	// Md.prototype.setInfo = function() {
		
	// };
	
	
	exports.init = function(opts) {
		return new Md().init(opts);
	};
	
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