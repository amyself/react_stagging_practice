import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {
	state = {
		isFirst:true, //标识是否第一次打开
		isLoading:false, //标识是否处于加载中
		error:'', //错误信息(最不希望看到的)
		users:[] //用户列表(最期待的)
	}

	componentDidMount(){
		//订阅消息
		this.token = PubSub.subscribe('UPDATE_LIST_STATE', (_,stateObj)=>{
			this.setState(stateObj)
		});
	}

	componentWillUnmount(){
		//取消订阅
		PubSub.unsubscribe(this.token);
	}

	render() {
		//获取App传递过来的状态数据
		const {
			isFirst,
			isLoading,
			error,
			users,
		} = this.state

		return (
			<div className="row">
				{
					isFirst ? //判断是否是初次展示
						<h1>输入关键字，随后点击搜索</h1> :
					isLoading ?//判断是否是加载中
						<h1>loading.....</h1> :
					error ? //判断是否有错误
						<h1 style={{color:'red'}}>{error}</h1> :
					//正常渲染列表
					users.map((user)=>{
						return (
							<div key={user.id} className="card">
								<a href={user.html_url} target="_blank">
									<img src={user.avatar_url} style={{width: '100px'}}/>
								</a>
								<p className="card-text">{user.login}</p>
							</div>
						)
					})
				}
			</div>
		)
	}
}
