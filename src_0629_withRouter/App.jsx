import React, { Component } from 'react'
import About from './pages/About'
import Home from './pages/Home'
import MyNavLink from './components/MyNavLink'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'


export default class App extends Component {

 

    render() {
        return (
            <div>
               <Header/>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <MyNavLink to="/about">about</MyNavLink>
                            <MyNavLink to="/home" >home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* 注册路由 */}
                                <Switch>
                                    <Route path="/about" component={About} />
                                    <Route path="/home" component={Home} />
                                    {/* <Redirect to="/about"/> */}
                                </Switch>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


