import React, { Component } from 'react'
import { 
    createIncrementAction, 
    createDecrementAction, 
    createIncrementAsyncAction } from '../../redux/count_action'



export default class Count extends Component {

    state = { carName: '奔驰' }

    // 加法
    increment = () => {
        const { value } = this.selectNumber
        this.props.dispatch(createIncrementAction(value*1))
        // this.props.store.dispatch(createIncrementAction(value*1))
    }

    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        this.props.dispatch(createDecrementAction(value*1))
        // this.props.store.dispatch(createDecrementAction(value*1))
    }

    // 奇数加法
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        const { store, dispatch } = this.props;
        const preState = store.getState()
        if (preState % 2 !== 0) {
            dispatch(createIncrementAction(value * 1))
            // store.dispatch(createIncrementAction(value * 1))
        }
    }

    // 异步加法
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.dispatch(createIncrementAsyncAction(value*1, 1000))
    }

    render() {
        console.log(this)
        return (
            <div>
                <h1>当前求和为：{this.props.count}</h1>
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
