import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
	handleCheckAll = (event) => {
		const { target: { checked } } = event
		this.props.checkAll(checked)
	}
	clearAllCompleted=()=>{
		const {clearAll}=this.props
		clearAll()
	}
	render () {
		const { todos } = this.props
		const total = todos.length
		// current是当前正在处理的元素
		let completedCount = todos.reduce((pre, current) => {
			return pre + (current.completed ? 1 : 0)
		}, 0)

		return (
			<div className="todo-footer">
				<label>
					<input type="checkbox" checked={total === completedCount && total > 0} onChange={this.handleCheckAll} />
				</label>
				<span>
					<span>已完成{completedCount}</span> / 全部{total}
				</span>
				<button onClick={this.clearAllCompleted} className="btn btn-danger" style={{display:completedCount>0?'block':'none'}}>清除已完成任务</button>
			</div>
		)
	}
}

