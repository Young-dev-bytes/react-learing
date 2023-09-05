import React, { Component } from 'react'
import store from '../../redux/store'
import { 
    createIncrementAction, 
    createDecrementAction, 
    createIncrementAsyncAction } from '../../redux/count_action'

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
        store.dispatch(createIncrementAction(value*1))

    }

    // 减法
    decrement = () => {
        const { value } = this.selectNumber
        store.dispatch(createDecrementAction(value*1))

    }

    // 奇数加法
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        const preState = store.getState()
        if (preState % 2 !== 0) {
            store.dispatch(createIncrementAction(value*1))
        }
    }
    // 异步加法
    incrementAsync = () => {
        const { value } = this.selectNumber
        // console.log('value->',value);
        // const a = createIncrementAsyncAction(value*1, 1000)
        // console.log('a,', a);
        // a();
        // console.log('b->', b);
        // 这里只是中间间告诉store，执行一下这个函数就行，不用给reducer
        store.dispatch(createIncrementAsyncAction(value*1))
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
