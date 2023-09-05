import React, { Component } from 'react'
import About from './pages/About'
import Home from './pages/Home'
import MyNavLink from './components/MyNavLink'
import { Route, Switch } from 'react-router-dom'


export default class App extends Component {

 

    render() {
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
                            <MyNavLink to="/qy/about">about</MyNavLink>
                            <MyNavLink to="/qy/home" >home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* 注册路由 */}
                                <Switch>
                                    <Route path="/qy/about" component={About} />
                                    <Route path="/qy/home" component={Home} />
                                </Switch>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


