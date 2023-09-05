import React from 'react'
import ReactDOM from 'react-dom';

function Demo() {

    const[count, setCount] = React.useState(0)
    // const[name, setName] = React.useState('jack')
    React.useEffect(()=>{
        console.log('@@@@');
        const timer = setInterval(()=>{
            setCount((count)=>{
                console.log('count--', count);
                return count+1
            })
        }, 2000)

        return ()=>{
            console.log('########');
            clearInterval(timer)
        }
    },[])


    function add() {
        setCount(count=>count+1)
    }

    function changeName() {
        // setName(()=>{
        //     return 'Chuck'
        // })
    }

    const unMount = ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    return (
        <div>
            <h2>当前求和为：{count} --</h2>
            <button onClick={add}>点我+1</button>&nbsp;&nbsp;&nbsp;
            <button onClick={changeName}>changeName</button>
            <button onClick={unMount}>卸载组件</button>
        </div>
    )
}


// class Demo extends React.Component {

//     state = {
//         count: 0
//     }

//     add = () => {

//         this.setState((value) =>
//             ({ count: value.count + 1 })
//         )
//     }
//     componentDidMount() {
//         this.interTime = setInterval(() => {
//             this.setState((value) =>
//                 ({ count: value.count + 1 })
//             )
//         }, 1000)
//     }
//     unmount=()=>{
//         ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//     }

//     componentWillUnmount(){
//         clearInterval(this.interTime)
//     }

//     render() {
//         return (
//             <div>
//                 <h2>当前求和为：{this.state.count} -- </h2>
//                 <button onClick={this.add}>点我+1</button>&nbsp;&nbsp;&nbsp;
//                 {/* <button onClick={changeName}>changeName</button> */}
//                 <button onClick={this.unmount}>卸载组件</button>
//             </div>
//         )
//     }
// }





export default Demo