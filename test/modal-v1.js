/*
    version: 0.0.1
    usage:
    
    Modal.init({
		title: '表格详情',
		width: 800,
		isDestory: true,
		footer: '<button class="btn btn-primary" data-dismiss="modal">确定</button>',
		content: '',
		options: {
			show: false,
			backdrop: 'static'
		},
		callback: function() {
			var that = this;
			
			// do sth..
		}
	});
*/

var Modal = function() {
	var template = function(title, content, footer) {
		return '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
		  '<div class="modal-dialog">'+
		    '<div class="modal-content">'+
		      '<div class="modal-header">'+
		        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
		          '<span aria-hidden="true">x</span>'+
		        '</button>'+
		        '<h4 class="modal-title">'+title+'</h4>'+
		      '</div>'+
		      '<div class="modal-body">'+
		        content +
		      '</div>'+
		      '<div class="modal-footer">'+
		      	footer +
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>';	
	};

	var Fn = function() {
		
	};

	Fn.prototype.init = function(option) {
		option = this.option = $.extend({
			title: '提示',
			width: 'auto',
			isDestory: true,
			footer: '<button class="btn btn-primary" data-dismiss="modal">确定</button>',
			callback: function() {},
			content: '加载中...',
			options: {
				show: false,
				backdrop: 'static'
			}
		}, option);

		this.render();
		
		// this.option.isDestory && this.destory();
		// callback
		option.callback && option.callback.call(this);
	};

	Fn.prototype.renderModal = function() {
		// 获取模版内容
		var modal_html = this.getTemplate(this.option.title, this.option.content, this.option.footer);
		// 模态对象
		this.option.modal = $.parseHTML(modal_html);
	};

	Fn.prototype.setModal = function() {
		this.modal = this.option.modal;
		var opts = this.option.options;

		$(this.modal).modal(opts);
	};

	Fn.prototype.setWidth = function() {
		var width = this.option.width,
			modal = this.modal;

		if(width) {
			$(modal).find('.modal-dialog').width(width);
		}
	};

	Fn.prototype.getTemplate = function(title, content, footer) {
		var html = template(title, content, footer);

		return html;
	};

	Fn.prototype.show = function() {
		$(this.modal).modal('show');
		this.destory();
	};

	Fn.prototype.render = function() {
		this.renderModal();
		// 设置模版
		this.setModal();
		// 设置模态宽度
		this.setWidth();
	};

	Fn.prototype.setInfo = function(opts) {
		opts = $.extend({},opts);
		$(this.modal)
			.find('.modal-title')
				.html(opts.title || '')
			.end()
			.find('.modal-body')
				.html(opts.content || '')
			.end()
			.find('.modal-footer')
				.html(opts.footer || '');
		this.render();
	};

	Fn.prototype.setTitle = function(title) {
		$(this.modal).find('.modal-title').html(title);
		this.render();
	};

	Fn.prototype.setFooter = function(html) {
		$(this.modal).find('.modal-footer').html(html);
		this.render();
	};

	Fn.prototype.setContent = function(html) {
		$(this.modal).find('.modal-body').html(html);
		// this.option.content = html;
		// this.destory();
		this.render();
	}

	Fn.prototype.destory = function() {
		$(this.modal).on('hidden.bs.modal', function() {
			$(this).data('bs.modal', null);
			$(this).remove();
		});
		// this.render();
	};

	return {
		init: function(option) {
			return new Fn().init(option);
		}
	};

}();