import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import axios from 'axios';

export default class Search extends Component {


    search = () => {
        // 获取用户输入
        const { keyWordELement: { value: keyWord } } = this
        // 发送请求前通知list更新状态
        PubSub.publish('qiuyang', { isFirst: false, isLoading: true })

        // 发送网络请求
        axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
            response => {
                // 请求成功后通知list更新状态
                let data = {
                    users: response.data.items,
                    isLoading: false,
                }
                // 发布消息，通知list更新状态
                PubSub.publish('qiuyang', data)
                console.log('成功了', response.data);
            },
            error => {
                // 请求失败后通知list更新状态
                const data = {
                    isLoading: false,
                    err: error
                }
                // 发布消息，通知list更新状态
                PubSub.publish('qiuyang', data)
                console.log('失败了', error);
            }
        )


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
