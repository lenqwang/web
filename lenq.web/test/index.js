// web
var Index = (function() {
	var print = function(msg) {
		(console.log || throw new Error)(msg);
	};

	return {
		init: function() {
			print('for test');
		}
	}
})();

// node
module.exports = function() {
	Index.init();
};