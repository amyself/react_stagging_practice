import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

	state = {
		bgColor: 'white',
		showDelBtn: 'none'
	}

	handleChange = (id) => {
		//不是value，获取勾选状态
		return (event) => {
			const { target: { checked } } = event
			//获取传递过来id的checkTodo
			const { checkTodo } = this.props
			checkTodo(id, checked)
		}
	}
	// handleEnter = () => {
	// 	this.setState({
	// 		bgColor: '#ddd',
	// 		showDelBtn: 'block'
	// 	})
	// }

	// handleLeave = () => {
	// 	this.setState({
	// 		bgColor: 'white',
	// 		showDelBtn: 'none'
	// 	})
	// }
	handleMove = (flag) => {
		return () => {
			this.setState({
				bgColor: flag ? '#ddd' : 'white',
				showDelBtn: flag ? 'block' : 'none'
			})
		}
	}
	handleDel = (id, title) => {
		const {delTodo}=this.props
		if (confirm(`确定删除${title}`)) {
			delTodo(id)
		}
	}


	render () {
		const { id, title, completed } = this.props
		const { bgColor, showDelBtn } = this.state
		return (
			<li onMouseEnter={this.handleMove(true)} onMouseLeave={this.handleMove(false)} style={{ backgroundColor: bgColor }}>
				<label>
					{/* 因为checked是固定的 值，所以需要onChange */}
					<input type="checkbox" checked={completed} onChange={this.handleChange(id)} />
					<span>{title}</span>
				</label>
				<button className="btn btn-danger" style={{ display: showDelBtn }} onClick={() => this.handleDel(id, title)} >删除</button>
			</li>
		)
	}
}

