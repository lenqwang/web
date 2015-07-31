var React = require('react');

var ItemList = React.createClass({
	getInitialState: function() {
		return {
			items: [
				'lenq',
				'gzwanglinquan',
				'jone',
				'lucy',
				'melony'
			]
		}
	},
	render: function() {
		var _item = this.props.items.map(function(item) {
			return <li>{item}</li>;
		});
		return (
			<div>
				<ul>{_item}</ul>
			</div>
		);
	}
});

module.exports = ItemList;