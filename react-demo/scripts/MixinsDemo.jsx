var React = require('react');

var SetIntervalMixin = {
	componentWillMount: function() {
		this.intervals = [];
	},
	setInterval: function() {
		this.intervals.push(setInterval.apply(null, arguments));
	},
	componentWillUnmount: function() {
		this.intervals.map(clearInterval);
	}
};

var MixinsDemo = React.createClass({
	mixins: [SetIntervalMixin],
	getInitialState: function() {
		return {second: 10};
	},
	componentDidMount: function() {
		this.setInterval(this.tick, 1000);
	},
	tick: function() {
		var timeFlag = this.state.second - 1;

		if(timeFlag < 0) {
			this.setState({second: 0});
		}
		else {
			this.setState({second: timeFlag});
		}
	},
	render: function() {
		return (
			<div>
				<p>时间到计时开始：<span>{this.state.second}</span></p>
			</div>
		);
	}
});

module.exports = MixinsDemo;