import React, { Component } from 'react'
import PubSub from 'pubsub-js';

export default class Search extends Component {


    search = async () => {
        // 获取用户输入
        const { keyWordELement: { value: keyWord } } = this
        // 发送请求前通知list更新状态
        PubSub.publish('qiuyang', { isFirst: false, isLoading: true })

        // 发送网络请求
        // fetch(`https://api.github.com/search/u1sers?q=${keyWord}`
        // ).then(response => {
        //         // 联系服务器成功了
        //         return response.json()}
        // ).then(response =>{console.log('数据获取成功,', response)}
        // ).catch(
        //     //(error)=>{console.log('请求出错:', error);}
        //     error=>{console.log('请求出错:', error);}
        // )

        try {
            const response = await fetch(`https://api.github.com/search/users?q=${keyWord}`)
            const data = await response.json()
            let dataT = {
                users: data.items,
                isLoading: false,
            }
            PubSub.publish('qiuyang', dataT)
        } catch (error) {
            console.log('请求出错:', error)
            const data = {
                isLoading: false,
                err: error
            }
            PubSub.publish('qiuyang', data)

        }


    }
    render() {
        console.log(this);
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索github用户</h3>
                <div>
                    <input ref={(current) => (this.keyWordELement = current)} type="text" placeholder="请输入关键字" />&nbsp;
                    <button onClick={this.search}>搜索</button>
                </div>
            </section>
        )
    }
}
