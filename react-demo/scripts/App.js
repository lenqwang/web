// import React from 'react';

// export default class App extends React.Component {
//   render() {
//     return (
//       <h1>Hello, world. is me</h1>
//     );
//   }
// }

var evens = [1, 3, 4, 6, 8];

var arrs = evens.map(v => v + 1);

console.log(arrs);

var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<h1>Hello, lenq!</h1>
		);
	}
});