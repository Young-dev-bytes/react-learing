// import CountUI from '../../components/Count'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/actions/count'


class CountUI extends Component {

    state = { carName: '奔驰' }

    // 加法
    increment = () => {
        const { value } = this.selectNumber
        this.props.jia(value * 1)
    }

    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        this.props.jian(value * 1)
    }

    // 奇数加法
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        const { jishujia } = this.props;
        const preState = this.props.count
        if (preState % 2 !== 0) {
            jishujia(value * 1)
        }
    }

    // 异步加法
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.yibujia(value * 1, 1000)
    }

    render() {
        console.log('oppp',this)
        return (
            <div>
                <h1>我是count组件,{this.props.personObj}</h1>

                <h2>当前求和为：{this.props.count}</h2>
                <select ref={(currentNode) => this.selectNumber = currentNode}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.incrementAsync}>异步加</button>
            </div>
        )
    }
}



export default connect(
    state =>  {return ({  count:state.he, personObj:state.personArray.length });},
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jishujia: createIncrementAction,
        yibujia: createIncrementAsyncAction
    })
    (CountUI)







