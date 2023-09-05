import React, { Component } from 'react'
import './App.css'
// 引入组件，组件名称是大写
import Footer from './components/Footer'
import Header from './components/Header'
import List from './components/List'

export default class App extends Component {

    // 设置 state 状态值，初始化状态
    state = {
        todos: [
            { id: 1, name: "吃饭", done: true },
            { id: 2, name: "睡觉", done: false },
            { id: 3, name: "打代码", done: true },
        ]
    }



    // 根据id,修改状态中是否被选中
    checkedT = (id, done) => {
        console.log('app.id:', id);
        const { todos } = this.state;
        // const updateTodos = todos.map(todo =>{
        //     if(todo.id === id){
        //         todo.done=done
        //     }
        //     return todo
        // })
        const updateTodos = todos.map(todo =>{
            if(todo.id === id) return {...todo, done:done}
            else return todo
        })
        
        console.log('updateTodos:', updateTodos);
        this.setState({
            todos:updateTodos
        })
        
    }
 
    // 给header传了一个函数
    addTodo = (data) => {
        const{todos} = this.state
        // const addTodo = [{id:todos.length + 1, name:data, done:false}]
        this.setState({
            todos:[...data, ...todos]
        })
    }

    // 删除一个todo
    deleteByIdTest=(id)=>{
        console.log('app.deltete', id);
        const {todos} = this.state
        // const newTodos = todos.filter((todo) => {
        //     if(todo.id !== id) return todo
        //     else return null
        // })
        // const newTodos = todos.filter(todo => todo.id !== id);
        const newTodos = todos.filter(todo=>{
            return todo.id !== id
        })
        console.log('newTodos:',newTodos);
        this.setState({
            todos:newTodos
        })

    }

    // 全选
    selectAll=(event)=>{
        // 更改state状态里面的值
        console.log('selectAll');
        console.log('event.target.checked',event.target.checked);
        const {todos} = this.state
        // const newTodos = todos.map(todo =>({
        //     ...todo,
        //     done: true

        // }));
        const newTodos = todos.map(todo =>{
            return {...todo, done:event.target.checked}
        })
        // const newTodos = todos.map(todo =>{
        //     todo.done = true
        //     return todo
        // })
        console.log('newTodos:', newTodos);
        this.setState({
            todos:newTodos
        })
    }

    // 清除已完成的任务
    clearDone=()=>{
        const{todos} = this.state
        const newTodos = todos.filter(todo =>{
            return todo.done === false
        })
        this.setState({
            todos:newTodos
        })
    }


    render() {
        const{todos} = this.state
        console.log('App.todos:', todos);
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    {/* 父组件给子组件传递参数时，给子组件一个函数，子组件在调用函数时，将函数值作为参数传递过去 */}
                    <Header addTodoTest = {this.addTodo} todos={todos} />
                    {/*注意：传递参数的属性名称不能是关键字，
                    给List组件的props传递了三个参数，todos ,  show , deleteById 
                    这里的this.checkedT是可以自定义的
                    比如delete*/}
                    <List todos={todos} showApp={this.checkedT} deleteByIdApp = {this.deleteByIdTest} />
                    {/**
                     * 给Footer组件的props传递了三个参数， allCheck  choseAll  Alldelete
                     */}
                    <Footer clearDoneApp={this.clearDone} deleteAllApp={this.deleteAll} selectAllApp={this.selectAll} todos={todos}/>
                </div>

            </div>
        )
    }
}
