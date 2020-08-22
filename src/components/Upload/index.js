import React, { Component } from 'react'
import { Button, Upload, AutoComplete } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'
import { reqGetUploadToken } from '@api/edu/lesson'

export default class MyUpload extends Component {
    constructor() {
        super()
        // 3、从本地获取token
        const jsonStr = localStorage.getItem('UPLOADTOKEN')
        if (jsonStr) {
            //① 本地有
            this.tokenObj = JSON.parse(jsonStr)
            return
        }
        // ② 本地没有
        this.tokenObj = {}
    }

    handleBefore = (file, fileList) => {
        const FILE_MAX_SIZE = 5 * 1024 * 1024
        return new Promise(async (resolve, reject) => {
            // 1、判断上传文件大小
            if (file.size > FILE_MAX_SIZE) {
                console.log(22222)
                reject()
                return
            }

            // 4、判断token是否在有效期内
            if (this.tokenObj.expires && this.tokenObj.expires > Date.now()) {

                // 在有效期内，直接成功，不需要发送请求重新获取token
                return resolve()
            }
            // 2、把token存到当前组件对象和本地缓存
            const res = await reqGetUploadToken()
            // 存储token的截止时间
            res.expires = Date.now() + res.expires * 1000 - 2 * 60 * 1000
            // 把token存到组件对象
            this.tokenObj = res
            // 把token存到本地缓存
            const jsonStr = JSON.stringify(res)
            localStorage.setItem('UPLOADTOKEN', jsonStr)
            resolve()
        })

    }
    handleCustom = ({ file, onProgress, onError, onSuccess }) => {
        // console.log('上传');
        const observer = {
            next(res) {
                console.log('正在上传');
                // 展示上传的进度{precent: 值}
                onProgress({ percent: res.total.percent })
            },
            error(err) {
                console.log('上传错误', err);
                onError()
            },
            complete: res => {
                // ...
                console.log('上传完成', res)
                onSuccess(res)
                // 在这里调用Form.Item传过来的onChange
                // 通过props获取onChange, 控制上传视频表单项的值
                this.props.onChange('http://qfejj27qg.hn-bkt.clouddn.com/' + res.key)
            }
        }

        // 收集参数
        // 文件名 --- 防止冲突，12位唯一值
        const key = nanoid(12)
        // 上传的token
        const token = this.tokenObj.uploadToken
        // 后台允许上传的文件类型
        const putExtra = {
            mimeType: 'video/*'
        }
        // 视频上传区域
        const config = {
            region: qiniu.region.z2
        }

        const observable = qiniu.upload(file, key, token, putExtra, config)
        // 开始上传
        this.subscription = observable.subscribe(observer) // 监听


    }

    // 组件卸载时取消上传
    componentWillUnmount() {
        this.subscription && this.subscription.unsubscribe()
    }
    // 删除上传的视频
    handleRemove = () => {
        this.props.onChange('')
    }
    render() {
        return (

            <Upload
                beforeUpload={this.handleBefore}
                customRequest={this.handleCustom}
                onRemove={this.handleRemove}
            >
                <Button>
                    <UploadOutlined />上传视频
                </Button>
            </Upload>

        )
    }
}
