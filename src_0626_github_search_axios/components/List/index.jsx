import React, { Component } from 'react'
import './index.css'

export default class List extends Component {



  render() {

    const{users, isFirst, isLoading, err} = this.props;
    return (
      <div className='row'>
        
        {
          isFirst ? <h2>欢迎使用，请输入关键字，随后点击搜索</h2> : 
          isLoading ? <h2>loading...</h2> :
          err ? <h2 style={{color:'red'}}>{err.message}</h2> :
          users.map(userObj => {
            return (
              <div key={userObj.id} className="card">
                <a href={userObj.html_url}>
                  <img style={{ width: "100px" }} alt="用户头像"  src={userObj.avatar_url}/>
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
