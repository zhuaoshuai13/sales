import React, {useState} from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Image, Popconfirm, Modal } from 'antd';
import {withRouter, useHistory, Redirect} from 'react-router-dom';
import renderRoutes from '../utils/render-routes'
import routes from '../routes'
import { useSelector, useDispatch  } from 'react-redux';
import { logout } from '../actions/user';
import './style.less'
import matchRoutes from '../utils/match-routes';
const { Header, Content, Footer, Sider } = Layout;
const { confirm } = Modal;
const { SubMenu } = Menu;
// eslint-disable-next-line react/prop-types
function FrameLayout({route, location}) {
  console.log('刷新');
  // eslint-disable-next-line react/prop-types
  console.log(location.pathname);
  // eslint-disable-next-line react/prop-types
  const match = matchRoutes(route.children, location.pathname)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  // 侧边菜单状态
  const [collapsed, setCollapsed] = useState(false);

  // 侧标菜单收起
  const onCollapse = (collapsed) => setCollapsed(collapsed);
  // eslint-disable-next-line react/prop-types

  function showConfirm() {
    confirm({
      title: '是否确定退出?',
      // icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch(logout())
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 点击跳转页面
  // eslint-disable-next-line react/prop-types
  const handleNav = ({key}) => history.push(key)
  const handleMenuClick = ({key}) => {
    switch (key) {
    case '1':
      console.log('修改密码');
      break
    case '2':
      showConfirm()
    }
  }

  // const out = () => dispatch(logout())

  const perosonlogog = () => (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">修改密码</Menu.Item>
      <Menu.Item key="2">
       退出登录
      </Menu.Item>
    </Menu>
  );

  // 定义函数实现侧边导航渲染
  const renderMenu = () => {
    const menus = routes[user.type].children
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
        // eslint-disable-next-line react/prop-types
        defaultSelectedKeys={location.pathname}
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
        <Content style={{ margin: '16px 16px' }}>

          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {
              // eslint-disable-next-line react/prop-types
              renderRoutes(routes[user.type].children)
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(FrameLayout)
