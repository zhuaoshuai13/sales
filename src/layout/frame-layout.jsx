import React, {useState} from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Image  } from 'antd';
import {withRouter, useHistory, Redirect} from 'react-router-dom';
import renderRoutes from '../utils/render-routes'
import routes from '../routes'
import { useSelector, useDispatch  } from 'react-redux';
import './style.less'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// eslint-disable-next-line react/prop-types
function FrameLayout({route}) {

  const user = useSelector((state) => {
    console.log(state);
    return state.user
  })
  const history = useHistory()
  // 侧边菜单状态
  const [collapsed, setCollapsed] = useState(false);

  // 侧标菜单收起
  const onCollapse = (collapsed) => setCollapsed(collapsed);

  // 点击跳转页面
  // eslint-disable-next-line react/prop-types
  const handleNav = ({key}) => history.push(key)
  const handleMenuClick = ({key}) => {
    switch (key) {
    case '1':
      console.log('修改密码');
      break
    case '2':
      console.log('登出');
    }
  }
  const perosonlogog = () => (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">修改密码</Menu.Item>
      <Menu.Item key="2">退出登录</Menu.Item>
    </Menu>
  );

  // 定义函数实现侧边导航渲染
  const renderMenu = () => {
    const menus = routes[1].children
    const renderMenuItem = (menus) => menus.map((menu) => {
      if (menu.children) {
        // 有子菜单
        return (
          <SubMenu
            key={menu.path}
            icon={menu.meta.icon ? <menu.meta.icon /> : null}
            title={menu.meta.title}>
            {renderMenuItem(menu.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={menu.path} icon={menu.meta.icon ? <menu.meta.icon /> : null}>
          {menu.meta.title}
        </Menu.Item>
      )
    })
    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={'/dashboard'}
        mode="inline"
        onClick={handleNav}>
        {renderMenuItem(menus)}
      </Menu>
    )
  }
  return !user.token ? <Redirect to="/login" /> : (
    <Layout style={{ minHeight: '100vh' }} className='frame-layout'>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        {
          renderMenu()
        }
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          <Dropdown
            overlay={perosonlogog}
          >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <Avatar src="https://joeschmoe.io/api/v1/random" />{user.username}
            </a>
          </Dropdown>

        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {
              // eslint-disable-next-line react/prop-types
              renderRoutes(route.children)
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(FrameLayout)
