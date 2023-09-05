import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {

  state = {
    messageArr: [
      { id: '1', title: '消息1' },
      { id: '2', title: '消息2' },
      { id: '3', title: '消息3' },
    ]
  }

  // 第一种方式接收参数
  pushShow1 = (id, title) => {
    return (p) => {
      console.log("push按钮", p, id, title);
    }
  }
  // 第二种方式接收参数，或者 (id, title,event) 或者写成这样也可以 = (id, title, event) =>,都能接受到参数
  // 两种方式中,里面的return语句就不会走了，因为按钮里面使用了=>形式
  pushShow2 =(id, title,event)=>{
    console.log('this:',this);
    console.log("第二种方式接收参数", id, title,event);
    this.props.history.push(`/home/message/detail/${id}/${title}`)
    // 这种方式return里面就不会走了
    return (p) => {
      console.log("push按钮", p, id, title);
    }
  }

  replaceShow(id, title){
    this.props.history.replace(`/home/message/detail/?id=${id}&title=${title}`)
  }



  render() {
    const { messageArr } = this.state
    console.log('message.this:',this);
    return (
      <div>
        <ul>
          {
            messageArr.map(item => {
              return (
                <li key={item.id}>
                  {/* 向路由组件传递params参数 */}
                  <Link replace to={`/home/message/detail/${item.id}/${item.title}`}>{item.title}</Link>&nbsp;&nbsp;&nbsp;
                  {/* 第一种方式传递参数 */}
                  {/* <button onClick={this.pushShow1(item.id, item.title)}>push按钮</button>&nbsp;&nbsp;&nbsp; */}
                  {/* 第一种方式传递参数 */}
                  <button onClick={(event)=>{this.pushShow2(item.id, item.title,event)}}>push按钮</button>&nbsp;&nbsp;&nbsp;
                  <button onClick={()=>this.replaceShow(item.id, item.title)}>replace按钮</button>
                </li>

              )
            })

          }

        </ul>
        <hr />
        <Route path='/home/message/detail/:id/:title' component={Detail}></Route>
      </div>
    )
  }
}
