import React from 'react'
import { NavLink } from 'react-router-dom'


export default function MyNavLink() {

    function computedClassName(isActive){
        return isActive ? 'list-group-item qianye' : 'list-group-item' 
    }
  
    return (
        <div>
            <NavLink className= {computedClassName()} />
        </div>
    )
}

