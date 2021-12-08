import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.less'
import { login } from '../../api/user';
import { loginSuccessAction } from '../../actions/user';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// let script = document.createElement('script');
// script.className = 'test'
// script.type = 'text/javascript'
// script.async = true;
// script.src = '//cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js';
// document.head.appendChild(script);

function Login(props) {
  useEffect(() => {console.log('login页面销毁');})
  const onFinish = (values) => {
    login(values).then((data) => {
      if (data.isSuccess) {
        console.log(data);
        // eslint-disable-next-line react/prop-types
        props.logins(data)
      } else {
        message.error(`${data.message}`, 0.5);
      }
    })
  }
  // eslint-disable-next-line react/prop-types
  return props.token ? <Redirect to="/dashboard" /> : (
    <div className="box">
      <b>用户登录</b>
      <i>服装店铺管理系统</i>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入您的用户名！',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入您的密码！',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <a href="">注册</a>
        </Form.Item>
      </Form>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    token: state.user.token,
  }
}

const mapDispatchToProps = {
  logins: loginSuccessAction,
}
const hoc = connect(mapStateToProps, mapDispatchToProps)
export default hoc(Login)
