import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {



    handleCheckAll() {
        return (event) => {
            this.props.selectAllApp(event)

        }
    }


    render() {

        const {todos,clearDoneApp} = this.props
        const num = todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
        const sum = todos.length


        return (
            <div className="todo-footer">
                <label>
                    {/*注意不能使用defaultChecked,这个只能在初始化的时候执行一次，并且如果使用checkede就必须添加onChange*/}
                    <input checked={num === sum ? true : false} onChange={this.handleCheckAll()} type="checkbox" />
                </label>
                <span>
                    <span>已完成{num}</span> / 全部{sum}
                </span>
                <button className="btn btn-danger" onClick={clearDoneApp}>清除已完成任务</button>
            </div>
        );
    }
}
