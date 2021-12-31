import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch  } from 'react-redux';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../api/user';
import { loginSuccessAction } from '../../reducers/user';
import { Redirect } from 'react-router-dom'
import loginsSvg from '../../assets/imgs/login.svg'
// import fish from '../../assets/js/fish.js'
import './style.less'

function Login() {
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  const onFinish = (values) => {
    login(values).then((data) => {
      if (data.isSuccess) {
        dispatch(loginSuccessAction(data))
      } else {
        message.error(`${data.message}`, 0.5);
      }
    })
  }


  return token ? <Redirect to="/dashboard" /> : (
    <>
      <h1>欢迎使用小天才店铺管理系统</h1>
<<<<<<< HEAD
      <h2>我们已经陪伴你234天</h2>
=======
>>>>>>> ff1d939a3ac57ac0ab0d805b62d4b04f87e41e3a
      <div className="box">
        <b>欢迎登录</b>
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
        <div id="j-fish-skip"></div>
      </div>
      <div>
        <img id="img" src={loginsSvg} alt="" />
      </div>

    </>
  );
}
export default Login
