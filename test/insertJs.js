var Code = function() {
	var fn = {
		init: function(callback) {
			this.insertLink('/project/demo1/lib/vendors/bower_components/highlight/styles/monokai_sublime.css');
			this.insertScript('/project/demo1/lib/vendors/bower_components/highlight/highlight.pack.js', function() {
				$('pre').html('<code class="javascript">'+$('#myscript').html()+'</code>');

				hljs.initHighlightingOnLoad();

				callback && callback();
			});
		},
		createEl: function(tag) {
			return typeof tag === 'string' ? document.createElement(tag) : null;
		},
		setAttributes: function(el, attrs) {
			for(var k in attrs) {
				el.setAttribute(k, attrs[k]);
			}
		},
		insertScript: function(src, callback, err) {
			var script = this.createEl('script'), 
				lastScript = document.getElementsByTagName('script'),
				done = false,
				len = lastScript.length;

			this.setAttributes(script, {
				'type': 'text/javascript',
				'src': src
			});

			script.onload = script.onreadystatechange = function() {
				var ret = (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete'));
				if(ret) {
					done = true;

					callback();

					script.onload = script.onreadystatechange = null;
				}
			};

			if(err) script.onerror = err;

			document.body.insertBefore(script, lastScript[len-1]);
		},
		insertLink: function(src) {
			var link = this.createEl('link');
			var head = document.getElementsByTagName('head')[0];

			this.setAttributes(link, {
				'rel': 'stylesheet',
				'href': src
			});

			head.appendChild(link);
		}
	};

	var _fn = function() {
		fn.init();
	};

	return {init: _fn};
}();

$(function() {
	Code.init();
});