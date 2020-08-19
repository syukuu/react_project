
import React, { Component } from 'react';
import { Card, Input, Form, Select, Button, Divider, message } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqGetSubject, reqAddSubject } from '@api/edu/subject'



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

class AddSubject extends Component {
    page = 1
    state = {
        total: 0,
        items: []
    }
    async componentDidMount() {
        // 返回Promise --> async
        const res = await reqGetSubject(this.page++, 10)
        this.setState(res)
    }

    //点击下拉菜单底部按钮
    handleGetSubject = async () => {
        const res = await reqGetSubject(this.page++, 10)
        console.log(res);
        // 此时请求的下一页数据会覆盖上一页，但需求是要数据拼接
        // 解构两个数组，放入新数组
        const newItems = [...this.state.items, ...res.items]
        this.setState({
            items: newItems
        })
    }

    // 表单校验通过
    onFinish = async values => {
        console.log(values);
        await reqAddSubject(values.subjectname, values.parentid)
        message.success('添加成功')
        this.props.history.push('/edu/subject/list')
    }
    render() {
        return (
            <Card
                title={
                    <>
                        <Link to='edu/subject/list'>
                            <ArrowLeftOutlined />
                        </Link>
                        <span className='title'>新增课程</span>
                    </>
                }
            >
                <Form
                    {...layout}
                    name='subject'
                    onFinish={this.onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label='课程分类名称'
                        name='subjectname'
                        rules={[
                            {
                                required: true,
                                message: '请输入课程分类!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='父级分类id'
                        name='parentid'
                        rules={[
                            {
                                required: true,
                                message: '请选择分类id'
                            }
                        ]}
                    >
                        {/* 下拉菜单底部按钮 
                        
                        
                        */}
                        <Select dropdownRender={menu => {
                            // menu是渲染的option
                            return (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }}></Divider>
                                    {this.state.total <= this.state.items.length ? '没有更多数据' : <Button type='link' onClick={this.handleGetSubject}>点击加载更多</Button>}
                                </div>
                            )
                        }}>
                            <Select.Option value={0} key={0}>
                                {'一级菜单'}
                            </Select.Option>

                            {this.state.items.map(item => (
                                <Select.Option value={item._id} key={item._id}>
                                    {item.title}
                                </Select.Option>))}

                        </Select>

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

export default AddSubject;
