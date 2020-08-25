
import React, { Component } from 'react';
import { Card, Input, Form, Button, Switch, message } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import MyUpload from '@comps/Upload'
import { addLesson } from '@api/edu/lesson'



//表单布局属性
const layout = {
    // antd把一个宽度分为24份
    // 表单文字描述部分
    labelCol: {
        span: 3
    },
    // 表单项部分
    wrapperCol: {
        span: 6
    }
}

class AddLesson extends Component {
    onFinish = async values => {
        // console.log(values);
        // 发送请求，更新课时列表
        const data = {
            // 章节id可以在点击跳转到此页时，通过路由传参传过来
            chapterId: this.props.location.state._id,
            title: values.title,
            free: values.free,
            video: values.video
        }
        // console.log(data);
        await addLesson(data)
        message.success('课时添加成功')
        this.props.history.push('/edu/chapter/list')
    }

    render() {
        return (
            <Card
                title={
                    <>
                        <Link to='edu/subject/list'>
                            <ArrowLeftOutlined />
                        </Link>
                        <span className='title'>新增课时</span>
                    </>
                }
            >
                <Form
                    // 给表单项设置初始值
                    initialValues={{
                        free: true,
                    }}
                    {...layout}
                    name='subject'
                    onFinish={this.onFinish}
                // onFinishFailed={onFinishFailed}

                >
                    <Form.Item
                        label='课时名称'
                        name='title'
                        rules={[
                            {
                                required: true,
                                message: '请输入课时名称!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        valuePropName='checked'
                        label='是否免费'
                        name='free'
                        rules={[
                            {
                                required: true,
                                message: '请选择是否免费'
                            }
                        ]}
                    >
                        {/* 
                            解决方式: 告诉Form.Item控制switch的checked 
                            Form.Item组件身上的属性valuePropName='checked' 
                        */}
                        <Switch
                            checkedChildren='开启'
                            unCheckedChildren='关闭'
                            defaultChecked
                        />
                    </Form.Item>
                    <Form.Item
                        label='上传视频'
                        name='video'
                        rules={[
                            {
                                required: true,
                                message: '请上传视频!'
                            }
                        ]}
                    >
                        <MyUpload></MyUpload>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default AddLesson;
