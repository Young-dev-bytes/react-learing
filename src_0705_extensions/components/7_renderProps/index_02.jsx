import React, { Component } from 'react'

export default class Parent extends Component {
    render() {
        return (
            <div>
                <h1>我是parent组件123</h1>
                {/* <A rende={()=>{return <span>span</span>}}></A> */}
                <A rende={(p)=>{return <B p={p} />}}>12312</A>
            </div>
        )
    }
}

class A extends Component {

    state = {
        name:'chuck'
    }

    render() {
        console.log('thisA-', this)
        // console.log( this.props.rende())
        // const mm = this.props.rende()
       
        return (
            <div>
                <h1>我是A组件</h1>
                {this.props.rende(this.state.name)}
            </div>
        )
    }
}


class B extends Component {
    render() {
        console.log('Bthis->', this)
        return (
            <div>
                <h1>我是B组件</h1>
            </div>
        )
    }
}

