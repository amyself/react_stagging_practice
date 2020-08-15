import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

//withRouter是装饰器函数，withRouter有返回值

@withRouter
class Title extends Component {

	//后退
	back = ()=>{
		console.log('Title',this);
		this.props.history.goBack()
	}

	//前进
	goto = ()=>{
		this.props.history.goForward()
	}

	render() {
		//console.log('Title组件的实例对象：',this);
		return (
			<div className="page-header">
				<h2>React Router Demo</h2>
				<button onClick={this.back}>《=后退</button>&nbsp;
				<button onClick={this.goto}>前进=》</button>
			</div>
		)
	}
}
export default Title