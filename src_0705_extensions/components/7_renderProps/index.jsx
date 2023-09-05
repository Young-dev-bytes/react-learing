import React, { Component } from 'react'

export default class Parent extends Component {
    render() {
        return (
            <div>
                <h1>我是parent组件</h1>
                <A>
                   <B/>
                </A>
            </div>
        )
    }
}

class A extends Component {
    render() {
        console.log('thisA-', this)
        return (
            <div>
                <h1>我是A组件</h1>
                {/* <span>{this.props.children}</span> */}
                {this.props.children}
            </div>
        )
    }
}


class B extends Component {
    render() {
        return (
            <div>
                <h1>我是B组件</h1>
            </div>
        )
    }
}

