import React, {useState} from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom';




export default function Home() {
  const[sum, setSum] = useState(0)
  return (
    <div>
      <h3>我是Home的内容</h3>
      {sum === 2 ? <Navigate to='/about'/> : <h4>当前sum值是{sum}</h4>}
      <button onClick={()=>{ setSum(2)}}>点我将sum值变为2</button>

      <div>
        <ul className='nav nav-tabs'>
          <li>
            {/* <a className='list-group-item' href='./'>News</a> */}
            <NavLink to="news">News</NavLink>
          </li>&nbsp;&nbsp;
          <li>
            {/* <a className='list-group-item' href='./'>Message</a> */}
            <NavLink to="message">Message</NavLink>
          </li>
        </ul>
        {/* <News />
        <Message /> */}
        {/* 路由其实已经注册了，这里说明在哪里来显示这个组件 ； 标记在哪里展示这个组件*/}
        {<Outlet/>}
        
      </div>
    </div>
  )
}

