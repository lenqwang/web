var React = require('react');

var BindData = React.createClass({
	getInitialState: function() {
		return {
			model: ''
		}
	},
	handleChange: function(e) {
		this.setState({model: e.target.value});
	},
	render: function() {
		return (
			<div>
				<p>{this.state.model}</p>
				<input type="text" onChange={this.handleChange} />
			</div>
		)
	}
});

module.exports = BindData;