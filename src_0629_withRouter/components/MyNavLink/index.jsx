import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
    render() {
        // console.log(this);
        // const{title} = this.props
        // console.log({...this.props});
        return (
            <div>
                <NavLink activeClassName="qianye" className="list-group-item" {...this.props} children = {this.props.children}/>
            </div>
        )
    }
}
