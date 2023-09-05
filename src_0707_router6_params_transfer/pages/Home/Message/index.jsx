import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'


function Message() {



  const[messages] = useState([
    { id: '1', title: '消息1', content: '锄禾日当午' },
    { id: '2', title: '消息2', content: '汗滴禾下土' },
    { id: '3', title: '消息3', content: '谁知盘中餐' },
    { id: '4', title: '消息4', content: '粒粒皆辛苦' },
  ])

  return (
    <div>
      <ul>
        {
          messages.map(item => {
            return (
               <li key={item.id}>
                {/* 向路由组件传递params参数 */}
                {/* <Link to={`detail/${item.id}/${item.title}/${item.content}`}>{item.title}</Link>&nbsp;&nbsp;&nbsp; */}
                {/* 向路由组件传递search参数 */}
                {/* <Link to={`detail/?id=${item.id}&title=${item.title}&content=${item.content}`}>{item.title}</Link>&nbsp;&nbsp;&nbsp; */}
                {/* 向路由组件传递state参数 */}
                <Link to='detail' state={{
                  id:item.id,
                  title:item.title,
                  content:item.content
                }}>{item.title}</Link>&nbsp;&nbsp;&nbsp;
              </li>
             
            )
          })

        }
      </ul>
      <hr />
      {/* <Route path='/home/message/detail/:id/:title' component={Detail}></Route> */}
      {/* <Route path='/home/message/detail/' component={Detail}></Route> */}
      <Outlet/>
    </div>
  )
}

export default Message
