var Code = function() {
	var fn = {
		init: function() {
			this.insertLink('/project/demo1/lib/vendors/bower_components/highlight/styles/monokai_sublime.css');
			this.insertScript('/project/demo1/lib/vendors/bower_components/highlight/highlight.pack.js', function() {
				console.log(111);
				$('pre').html('<code class="javascript">'+$('#myscript').html()+'</code>');

				hljs.initHighlightingOnLoad();
			}, function() {
				console('error');
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
				lastScript = document.getElementsByTagName('script');
				len = lastScript.length;
				done = false;
			this.setAttributes(script, {
				'src': src,
				'charset': 'utf-8',
				'type': 'text/javacript'
			});

			if(script.readyState) {
				script.onreadystatechange = function() {
					if(script.readyState === 'loaded' || script.readyState === 'complete') {
						script.onreadystatechange = null;
						callback();
					}
				};
			}
			else {
				script.onload = function() {
					console.log('i am callback');
				};
			}

			script.onerror =  err;

			// script.onload = script.onreadystatechange = function() {
			// 	var ret = (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete'));
			// 	console.log(ret);
			// 	if(ret) {
			// 		done = true;

			// 		callback();

			// 		script.onload = script.onreadystatechange = null;
			// 	}
			// };

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