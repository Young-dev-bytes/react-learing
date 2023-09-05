import React, {Component} from "react"
import helloTest from './index.module.css'

export default class Hello extends Component {
    render(){
        return (
            <h2 className={helloTest.title}>hello, React!!!</h2>
        )
    }
}