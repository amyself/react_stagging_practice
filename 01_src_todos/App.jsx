import React, { Component } from 'react'
import Add from './components/Add'
import List from './components/List'
import Footer from './components/Footer'
import { nanoid } from 'nanoid'
// React:默认暴露
// {Component}：分别暴露或统一暴露
// const {Component}=React
export default class App extends Component {
	state = {
		todos: [
			{ id: '001', title: '吃饭', completed: false },
			{ id: '002', title: '睡觉', completed: true },
			{ id: '003', title: '敲代码', completed: false },

		]
	}
	addTodo = (title) => {
		const todo = { id: nanoid(), title, completed: false }
		this.setState({
			todos: [todo, ...this.state.todos]
		})
	}
	checkTodo = (id, completed) => {
		const todos = this.state.todos.map((todo) => {
			if (todo.id === id) return { ...todo, completed }
			return todo
		})
		this.setState({
			todos
		})
	}
	delTodo = (id) => {
		const index = this.state.todos.findIndex((todo) => {
			return todo.id === id
		})
		const todos = [...this.state.todos]//重新赋值一份，不改变原数组
		todos.splice(index, 1)
		this.setState({ todos })
	}
	checkAll = (checked) => {
		const todos = this.state.todos.map((todo) => {
			return { ...todo, completed: checked }
		})
		this.setState({ todos })
	}
	clearAll = () => {
		const todos = this.state.todos.filter((todo) => {
			if (!todo.completed) {
				return todo
			}
			return null
		})
		this.setState({ todos })
	}
	render () {
		const { todos } = this.state
		return (
			<div className='todo-container'>
				<div className="todo-wrap">
					<Add addTodo={this.addTodo} />
					<List todos={todos} checkTodo={this.checkTodo} delTodo={this.delTodo} />
					<Footer todos={todos} checkAll={this.checkAll} clearAll={this.clearAll}/>
				</div>
			</div>
		)
	}
}