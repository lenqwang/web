var React = require('react');

var Buttons = React.createClass({
	getInitialState: function() {
		return {
			like: 0,
			btnClass: ''
		};
	},
	handleClick: function() {
		var liked = this.state.like + 1;

		if(liked > 10 || isNaN(liked)) {
			this.setState({like: 'fuck!', btnClass: 'unactive'});
		}
		else {
			this.setState({like: liked, btnClass: ''});
		}
	},
	render: function() {
		return (
			<div>
				<button onClick={this.handleClick} className={this.state.btnClass}>{this.props.name + ' -> ' + this.state.like}</button>
				<strong>{this.state.like}</strong>
			</div>
		);
	}
});

var LikeButtons = React.createClass({
	render: function() {
		var cats = ['do1', 'do2', 'do3'];

		var button = cats.map(function(btn) {
			return <Buttons name={btn} />;
		});

		return (
			<div>
				{button}
			</div>
		);
	}
});

module.exports = LikeButtons;