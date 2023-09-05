import React from 'react'
import ReactDOM from 'react-dom';




class Demo extends React.Component {

    myRef = React.createRef()

    state = {
        count: 0
    }

    add = () => {

        this.setState((value) =>
            ({ count: value.count + 1 })
        )
    }

    unmount=()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    componentWillUnmount(){
        clearInterval(this.interTime)
    }

    show=()=>{
        alert(this.myRef.current.value)
    }
    render() {
        return (
            <>
                <h2>当前求和为：{this.state.count} -- </h2>
                <button onClick={this.add}>点我+1</button>&nbsp;&nbsp;&nbsp;
                {/* <button onClick={changeName}>changeName</button> */}
                <button onClick={this.unmount}>卸载组件</button>&nbsp;&nbsp;&nbsp;
                <input type='text' ref={this.myRef}/>&nbsp;&nbsp;&nbsp;
                <button onClick={this.show}>show</button>&nbsp;&nbsp;&nbsp;
            
            </>
        )
    }
}





export default Demo