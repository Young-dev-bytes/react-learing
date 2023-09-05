import React, { Component } from 'react'
import List from './components/List'
import Search from './components/Search'

export default class App extends Component {

    state = {
        users:[],
        // 表示是否处于加载中
        isLoading:false,
        // 是否为第一次打开页面
        isFirst:true,
        // 存储请求相关错误信息
        err:'',
    }

    updateStates=(stateObj)=>{
        console.log('stateObj:',stateObj);
        this.setState(stateObj)
    }

    render() {
        return (
            <div className="container">
                <Search saveUsersApp={this.updateStates}/>
                {/* <List usersApp = {{...this.state}}/> */}
                <List {...this.state}/>

            </div>
        )
    }
}


