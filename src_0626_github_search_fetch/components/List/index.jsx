import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import './index.css'

export default class List extends Component {

  state = {
    users: [],
    // 表示是否处于加载中
    isLoading: false,
    // 是否为第一次打开页面
    isFirst: true,
    // 存储请求相关错误信息
    err: '',
  }

  // 组件挂载完毕调用
  componentDidMount(){
    console.log('所有组件挂载完毕...');
    PubSub.subscribe('qiuyang', (msg, data)=>{
      console.log('msg:', msg)
      console.log('data', data)
      this.setState(data)

    })
  }

  render() {
    console.log('123',this)
    const { users, isFirst, isLoading, err } = this.state
    console.log('users:', users);
    return (
      <div className='row'>
        {
          isFirst ? <h2>欢迎使用，请输入关键字，随后点击搜索</h2> :
            isLoading ? <h2>loading...</h2> :
              err ? <h2 style={{ color: 'red' }}>{err.message}</h2> :
                users.map(userObj => {
                  return (
                    <div key={userObj.id} className="card">
                      <a href={userObj.html_url}>
                        <img style={{ width: "100px" }} alt="用户头像" src={userObj.avatar_url} />
                      </a>
                      <p className="card-text">{userObj.login}</p>
                    </div>
                  )
                })
        }
      </div>
    )
  }
}
