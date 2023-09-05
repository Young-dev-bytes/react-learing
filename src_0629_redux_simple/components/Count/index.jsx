import React, { Component } from 'react'
import store from '../../redux/store'

export default class Count extends Component {

    state = { carName: '奔驰' }




    // componentDidMount(){
    //     const callBack =()=>{
    //         console.log('ssss');
    //     }
    //     store.subscribe(callBack);
    // }
    // componentDidMount() {
    //     store.subscribe(() => {
    //         console.log('调用了...');
    //         // this.render()
    //         this.setState({})
    //     });
    // }

    // 加法
    increment = () => {
        const { value } = this.selectNumber
        const preState = store.getState()
        const sum = preState + value * 1
        console.log(sum);
        store.dispatch({ type: 'increment', data: value * 1 })

    }

    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        store.dispatch({ type: 'decrement', data: value * 1 })

    }
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        const preState = store.getState()
        if (preState % 2 !== 0) {
            store.dispatch({ type: 'incrementIfOdd', data: value * 1 })
        }
    }
    incrementAsync = () => {
        const { value } = this.selectNumber
        setTimeout(() => {
            store.dispatch({ type: 'incrementAsync', data: value * 1 })
        }, 1000)
    }
    render() {
        // console.log('count.this:', this);
        console.log('store:', store);
        return (
            <div>
                <h1>当前求和为：{store.getState()}</h1>
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
