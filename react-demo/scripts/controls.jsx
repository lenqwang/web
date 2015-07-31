var React = require('react');

var actions = require('./actions');

var Controls = React.createClass({
	handleAdd: function() {
		actions.add(Math.random().toString().substr(2, 5));
	},
	handeClear: function() {
		actions.clear();
	},
	render: function() {
		return (
			<div>
				<button onClick={this.handleAdd}>添加</button>
				<button onClick={this.handeClear}>清空</button>
			</div>
		);
	}
});

module.exports = Controls;