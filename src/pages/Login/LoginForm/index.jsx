import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login } from "@redux/actions/login";
import { reqGetVerifyCode } from '@api/acl/oauth'

import "./index.less";

const { TabPane } = Tabs;
// antd中form组件表单校验的第二种方式
// rule 就是校验规则对象, 一般不用
// value 就是表单项中的值
// 要求返回一个promise. 如果是成功的promise就校验通过,如果是失败的promise就校验不通过
const validator = (rule, value) => {
  console.log(value)
  return new Promise((resolve, reject) => {
    // 密码是必填项
    value = value && value.trim()
    if (!value) {
      // 表示没有输入密码
      return reject('请输入密码')
    }
    // 长度大于等于4
    if (value.length < 4) {
      return reject('密码不能小于4')
    }
    // 长度不能超过16
    if (value.length > 16) {
      return reject('密码不能超过16')
    }
    if (!/^[0-9a-zA-Z_]+$/.test(value)) {
      return reject('密码格式不正确')
    }

    return resolve()
  })
}


function LoginForm(props) {
  // 调用useForm得到form实例对象 和Form组件绑定
  const [form] = Form.useForm()

  // 倒计时
  let [downCount, setDownCount] = useState(5)
  let [isShowBtn, setIsShowBtn] = useState(true)

  const onFinish = ({ username, password }) => {
    props.login(username, password).then((token) => {
      // 登录成功
      // console.log("登陆成功~");
      // 持久存储token
      localStorage.setItem("user_token", token);
      props.history.replace("/");
    });
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  };

  // 点击获取验证码
  const handleGetCode = () => {
    // 调用validateFields方法，通过res可以拿到手机号
    form.validateFields(['phone']).then(res => {
      // 发送请求获取验证码
      reqGetVerifyCode(res.phone)
      console.log(res.phone);
      message.success('获取验证码成功')
      const timer = setInterval(() => {
        setDownCount(--downCount)
        setIsShowBtn(false)
        if (downCount <= 0) {
          clearInterval(timer)
          setIsShowBtn(true)
        }
      }, 1000)
    })
  }

  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >

        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入账户'
                },
                {
                  max: 16,
                  message: '长度不能超过16个字符'
                },
                {
                  min: 4,
                  message: '长度不能低于4个字符'
                },
                {
                  pattern: /^[0-9A-Za-z_]+$/,
                  message: '请输入正确的用户名'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ validator }]}>
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item name="phone" rules={[
              {
                required: true,
                message: '请输入手机号'
              },
              {
                pattern: /^1[\d]{10}$/,
                message: '请输入正确的手机号'
              }
            ]}>
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify">
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button className="verify-btn" onClick={handleGetCode} disabled={isShowBtn ? false : true}>
                  {isShowBtn ? '获取验证码' : `${downCount}秒后发送`}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
            </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                  <GithubOutlined className="login-icon" />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );

}


// @withRouter
// @connect(null, {
//   login,
// })
export default withRouter(connect(null, { login })(LoginForm));
