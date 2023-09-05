import React, { Component } from 'react'
import PropTypes from 'prop-types'
import  './index.css'

export default class Header extends Component {

    static propTypes = {
        addTodoTest: PropTypes.func.isRequired
    }
    
    handKeyUp=(event)=>{
        const {todos} = this.props
        const {target, keyCode } = event
        if(keyCode !== 13) return
        // 判断是否为空
        if(target.value.trim() === ''){
            alert('输入框的值不能为空')
            return
        }
        console.log(target.value, keyCode);
        // child component how to transfer to father component
        const addTodo = [{id:todos.length+1, name:event.target.value, done:false}]
        console.log('addTodo:', addTodo);
        this.props.addTodoTest(addTodo)
        // 将输入框的值为空
        target.value = ''
    }


   
    
    render() {
        console.log('header.this:',this);
        return (
            <div className ="todo-header">
                <input onKeyUp={this.handKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
            </div>
        )
    }
}
