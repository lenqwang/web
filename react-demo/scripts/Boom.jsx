var React = require('react');

var Boom = React.createClass({
	getInitialState: function() {
		return {
			timers: 10
		}
	},
	tick: function() {
		var remain = this.state.timers - 1;

		if(remain == 0) {
			this.setState({timers: 'Boom!'});
			clearInterval(this.interval);
		}
		else {
			this.setState({timers: remain});
		}
	},
	componentDidMount: function() {
		this.interval = setInterval(this.tick, 1000);
	},
	render: function() {
		return (
			<div>{this.state.timers}</div>
		);
	}
});

module.exports = Boom;