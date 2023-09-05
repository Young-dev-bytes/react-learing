import React, { Component } from 'react'
import { DatePicker } from 'antd'

export default class AntdDateClass extends Component {

    // 定义contextHolder为类的实例属性

    state = {
        date: new Date(),
        contextHolder:'123'

    }
    

    
    handleChange=(value)=>{
        console.log('value', value);
        this.setState({
            date:value.format('YYYY-MM-DD')
        })
    }
    

    render() {
        const{date, contextHolder} = this.state
        console.log(this)
        return (
            <div style={{ width: 400, margin: '100px auto' }}>
                <DatePicker onChange={this.handleChange} />
                <div style={{ marginTop: 16 }}>
                    Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
                </div>
                {contextHolder}
            </div>
        )
    }
}
