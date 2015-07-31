var React = require('react');

var PropDemo = React.createClass({
	render: function() {
		return <a {...this.props}>{this.props.text}</a>;
	}
});

module.exports = PropDemo;