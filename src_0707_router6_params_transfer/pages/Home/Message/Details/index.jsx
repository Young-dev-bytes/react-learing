import React from 'react'
import { useLocation } from 'react-router-dom';

function Details() {

  console.log("我是Detail组件");

  // const {id, title, content} = useParams()
  // const[search, setSearch] = useSearchParams()
  // const xx = useLocation()
  // const id = search.get('id')
  // const title = search.get('title')
  // const content = search.get('content')
  // console.log('@',xx);

  // state 传递参数
  const {id, title, content} = useLocation().state
  

  return (
    <ul>
      {/* <button onClick={()=> setSearch({id:'9', title:'fff', content:'pppppp'})}>点我更新</button> */}
      <li>序号：{id}</li>
      <li>标题：{title}</li>
      <li>内容：{content}</li>
    </ul>
  )
}

export default Details