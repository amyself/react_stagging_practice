import React, { Component } from 'react'

export default class About extends Component {

	componentWillUnmount(){
		//console.log('About组件即将卸载');
	}

	render() {
		//console.log('About组件的实例对象：',this);
		return <h3>我是About的内容</h3>
	}
}
