import React, {useState} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import MyNavLink from '../../components/MyNavLink'
import News from './News/index'
import Message from './Message/index'


export default function Home() {

  const[sum, setSum] = useState(0)

  // function changeSum(){
  //   console.log('calling');
  //   setSum(2)
  // }

  return (
    <div>
      <h3>我是Home的内容</h3>
      {sum === 2 ? <Navigate to='/about'/> : <h4>当前sum值是{sum}</h4>}
      <button onClick={()=>{ setSum(2)}}>点我将sum值变为2</button>

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
        <Routes>
          <Route path="/home/news" element={<News/>} />
          <Route path="/home/message" element={<Message/>} />
          {/* <Redirect to="/home/news"/> */}
        </Routes>
      </div>
    </div>
  )
}

