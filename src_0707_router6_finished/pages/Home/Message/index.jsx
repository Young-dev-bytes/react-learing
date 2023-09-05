import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'


export default function Message() {

  // 初始化state
  const[messages] = useState([
    { id: '1', title: '消息1', content: '锄禾日当午' },
    { id: '2', title: '消息2', content: '汗滴禾下土' },
    { id: '3', title: '消息3', content: '谁知盘中餐' },
    { id: '4', title: '消息4', content: '粒粒皆辛苦' },
  ])

  // 这是hook的一种
  const navigate = useNavigate()

  // 展示详情，通过navigate跳转并携带参数
  function showDetail(item){
    console.log('showDetail',item);
    navigate('detail',{
      replace:true,
      state:{
        id:item.id,
        title:item.title,
        content:item.content
      }
    })
  }

  return (
    <div>
      <ul>
        {
          messages.map(item => {
            return (
               <li key={item.id}>
                <Link to='detail' state={{
                  id:item.id,
                  title:item.title,
                  content:item.content
                }}>{item.title}</Link>&nbsp;&nbsp;&nbsp; 
                <button onClick={()=>{showDetail(item)}}>点我查看详情</button>
              </li>
            )
          })
        }
      </ul>
      <hr />
      <Outlet/>
    </div>
  )
}
