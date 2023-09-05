import React from 'react'
import About from './pages/About'
import Home from './pages/Home'
// import MyNavLink from './components/MyNavLink'
import { Route, Routes, NavLink } from 'react-router-dom'


export default function App() {

    function computedClassName(isActiveT){
        console.log('isActiveT--',isActiveT);
        const {isActive} = isActiveT
        return isActive ? 'list-group-item qianye' : 'list-group-item'
    }
    
  return (
    <div>
        <div className="row">
            <div className="col-xs-offset-2 col-xs-8">
                <div className="page-header"><h2>React Router Demo</h2></div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-2 col-xs-offset-2">
                <div className="list-group">
                    {/* <MyNavLink to="/about">about</MyNavLink> */}
                    {/* <MyNavLink to="/home" >home</MyNavLink> */}
                    <NavLink className={computedClassName}  to="/about">About</NavLink>
                    <NavLink className={computedClassName} to="/home">Home</NavLink>
                </div>
            </div>
            <div className="col-xs-6">
                <div className="panel">
                    <div className="panel-body">
                        {/* 注册路由 */}
                        <Routes>
                            <Route path="/about" element={<About/>} />
                            <Route path="/home" element={<Home/>} />
                            {/* <Redirect to="/about"/> */}
                            {/* <Route path='/' element={<Navigate to='/about'/>}/> */}
                        </Routes>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}



