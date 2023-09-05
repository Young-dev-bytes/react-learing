import React from 'react'
import { useLocation } from 'react-router-dom';

function Details() {

  console.log("我是Detail组件");

  // state 传递参数
  const {id, title, content} = useLocation().state
  

  return (
    <ul>
      <li>序号：{id}</li>
      <li>标题：{title}</li>
      <li>内容：{content}</li>
    </ul>
  )
}

export default Details