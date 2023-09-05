// 引入count UI组件
import CountUI from '../../components/Count'
// 引入store
// import store from '../../redux/store'
// 引入connect 用于连接UI组件和redux
import { connect } from 'react-redux'
import { 
    createIncrementAction, 
    createDecrementAction, 
    createIncrementAsyncAction } from '../../redux/count_action'



// const mapDispatchToProps=(action)=>(
//     {
//         jia:number=>{action(createIncrementAction(number))},
//         jian:number=>{action(createDecrementAction(number))},
//         jishujia:number=>{action(createIncrementAction(number))},
//         yibujia:(number,time)=>{action(createIncrementAsyncAction(number,time))}
//     }
// )

// 连接UI组件
// 使用connect创建并且暴露一个Count的容器组件

/*
export default connect(
    (state)=>({count:state}), 
    (action)=>({
            jia:number=>{action(createIncrementAction(number))},
            jian:number=>{action(createDecrementAction(number))},
            jishujia:number=>{action(createIncrementAction(number))},
            yibujia:(number,time)=>{action(createIncrementAsyncAction(number,time))}
        }))
    (CountUI)
*/
export default connect(
    state => ({ count: state }),
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jishujia: createIncrementAction,
        yibujia: createIncrementAsyncAction
    })
    (CountUI)







