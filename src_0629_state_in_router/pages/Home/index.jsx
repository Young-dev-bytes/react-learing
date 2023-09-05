import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import MyNavLink from '../../components/MyNavLink'
import News from './News/index'
import Message from './Message/index'

export default class Home extends Component {
  render() {
    console.log('匹配到home组件啦');
    return (
      <div>
        <h3>我是Home的内容</h3>
        <div>
          <ul className='nav nav-tabs'>
            <li>
              {/* <a className='list-group-item' href='./'>News</a> */}
              <MyNavLink to="/home/news">News</MyNavLink>
            </li>&nbsp;&nbsp;
            <li>
              {/* <a className='list-group-item' href='./'>Message</a> */}
              <MyNavLink to="/home/message">Message</MyNavLink>
            </li>
          </ul>
          {/* <News />
          <Message /> */}
          {/* 注册路由 */}
          <Switch>
            <Route path="/home/news" component={News} />
            <Route path="/home/message" component={Message} />
            <Redirect to="/home/news"/>
          </Switch>
        </div>
      </div>
    )
  }
}
