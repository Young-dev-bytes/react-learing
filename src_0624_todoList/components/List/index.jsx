import React, { Component } from 'react'
import PropType from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {

    //对接收的参数做限制,限制不能为空以及参数的类型
    static propTypes = {
        todos:PropType.array.isRequired,
        showApp:PropType.func.isRequired,
        deleteByIdApp:PropType.func.isRequired,
    }

    render() {
        const {todos, showApp, deleteByIdApp} = this.props;
        return (
            <ul className='todo-main'>
                {
                    todos.map(todo => {
                        //return <Item key={todo.id} id={todo.id} name={todo.name} done={todo.done}/>
                        return <Item key={todo.id} {...todo} showList={showApp} deleteByIdList = {deleteByIdApp} />
                    })
                }
            </ul>
        );
    }
}
