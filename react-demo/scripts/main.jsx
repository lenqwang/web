var React = require('react');

var Controls = require('./controls.jsx');

var Listview = require('./listview.jsx');

//var App = require('./App');

// React.render(
// 	<App />,
// 	document.getElementById('root')
// );

var MainComponent = React.createClass({
	render: function() {
		return (
			<div>
				<Listview />
				<Controls />
			</div>
		);
	}
});

module.exports = MainComponent;