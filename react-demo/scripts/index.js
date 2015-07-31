// import React from 'react';
// import App from './App';

// React.render(<App />, document.getElementById('root'));

var React = require('react');

var Main = require('./MixinsDemo.jsx');

var datas = [
				'lenq',
				'luly',
				'jone',
				'lucy',
				'melony'
			];

React.render(
	<Main />,
	document.getElementById('root')
);

