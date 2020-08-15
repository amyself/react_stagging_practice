//引入react核心库
import React from 'react'
//引入react-dom
import ReactDOM from 'react-dom'
//引入BrowserRouter
import {BrowserRouter} from 'react-router-dom'
//引入外壳组件App
import App from './App'

ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>,
document.getElementById('root'))