import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './index.css'

export default class Item extends Component {

    // 对props进行类型和必要性进行限制
    static propTypes = {
        deleteByIdList:PropTypes.func.isRequired
    }

    state={mouse:false}

    handleMouse=(flag)=>{
        return ()=> {
        this.setState({
            mouse:flag
        })
        }
    }

    handleCheck = (id) => {
        return (event) => {
            console.log('item.id', id);
            this.props.showList(id, event.target.checked)
        }
    }
    // 删除todo
    deleteById = (id, event) => {
        return () => {
            if(window.confirm('确定删除吗')){
                this.props.deleteByIdList(id)
            }
        }

    }

    // deleteByIdTest(id, event){
    //     console.log('id======',id);
    //     console.log(event.target);

    // }
    deleteByIdTest=(id, event)=>{

        if(window.confirm('确定删除吗')){
            this.props.deleteByIdList(id)
        }
    }

 

    render() {
        const {id,name,done} = this.props;
        const {mouse} = this.state

        return (
            <li style={{backgroundColor:mouse?'#ddd':'white'}} onMouseLeave={this.handleMouse(false)} onMouseEnter={this.handleMouse(true)}>
                <label>
                    <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
                    <span>{name}</span>
                </label>
                <button className="btn btn-danger" style={{display:mouse?'block':'none'}} onClick={this.deleteById(id)}>删除</button>
                {/* <button className="btn btn-danger" style={{display:mouse?'block':'none'}} onClick={(event)=>(this.deleteByIdTest(id, event))}>删除2</button> */}
            </li>
        )
    }
}
