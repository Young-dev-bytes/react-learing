import React, { Component, lazy, Suspense} from 'react'
import { NavLink, Route } from 'react-router-dom'


// 没问题
// const Home = lazy(() => {return import('./Home')})
// const About = lazy(() => { return import('./About') })

// 这样写报错
const Home = lazy(() => { return import('./Home') })
const About = lazy(() => { return import('./About') })

// 没问题
// const Home = lazy(() =>  import('./Home'))
// const About = lazy(() =>   import('./About') )



export default class Demo extends Component {

  state = {
    count: 0
  }

  add = () => {
    // const { count } = this.state
    // this.setState({
    //   count: count + 1
    // })
    // console.log('12行输出：', this.state.count)

    // 函数式的setState
    this.setState((state, props) => {
      console.log('state:', state);
      console.log('props:', props);
      return { count: state.count + 1 };
    }, () => { console.log(this.state.count); }

    )

  }


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
              <NavLink className="list-group-item" to="/about">About</NavLink>
              <NavLink className="list-group-item" to="/home">Home</NavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Suspense fallback={<h1>loading...</h1>}>
                  <Route path="/about" component={About} />
                  <Route path="/home" component={Home} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
