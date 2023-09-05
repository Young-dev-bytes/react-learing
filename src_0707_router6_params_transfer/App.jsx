import React from 'react'
// import MyNavLink from './components/MyNavLink'
import {  NavLink, useRoutes } from 'react-router-dom'
import ops from './routes'



export default function App() {

    // 根据路由表生成对应的路由
    const elementT = useRoutes(ops)

    function computedClassName(isActiveT) {
        const { isActive } = isActiveT
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
                        <NavLink className={computedClassName} to="/about">About</NavLink>
                        <NavLink className={computedClassName} to="/home">Home</NavLink>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="panel">
                        <div className="panel-body">
                            {/* 注册路由 */}
                            {elementT}
                            {/* <Routes>
                                <Route path="/about" element={<About />} />
                                <Route path="/home" element={<Home />} />
                                <Route path='/' element={<Navigate to='/about' />} />
                            </Routes> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



