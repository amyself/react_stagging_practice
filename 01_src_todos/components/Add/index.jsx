import React, { Component } from 'react'
import './index.css'

export default class Add extends Component {
	//按下回车的回调函数
	handKeyUp = (event) => {
		const {addTodo}=this.props
		//解构赋值的连续写法、
		// const {target:{value}}=event
		//给结构出来的变量重名名
		const {target:{value:userInput}}=event
		if (event.keyCode === 13) {
			if (!userInput.trim()){
				alert('不能为空')
				return
			}else{
				addTodo(userInput.trim())
				// console.log('去添加一个todo',event.target.value)
				event.target.value=''
				// userInput=''//这么写不对
			}
		}
	}

	render () {
		return (
			<div className="todo-header">
				<input
					type="text"
					placeholder="请输入你的任务名称，按回车键确认"
					onKeyUp={this.handKeyUp}
				/>
			</div>
		)
	}
}

