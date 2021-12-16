import Login from '../views/login';
import Dashboard from '../views/dashboard'
import Inventory from '../views/admins/inventories/inventory'
import Purchase from '../views/admins/inventories/purchase'
import FrameLayout from '../layout/frame-layout';
import Inventorys from '../views/admins/inventories'
import Sale from '../views/admins/sale'
import Self from '../views/employees/self';
import Market from '../views/sales/market';
import Detail from '../views/admins/detail';
import Activities from '../views/marketing/activities'
import Minus from '../views/marketing/activities/minus';
import {
  HomeOutlined,
  ZoomInOutlined,
  RiseOutlined,
  FileSearchOutlined,
  FunctionOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';


const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: FrameLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          icon: HomeOutlined,
        },
      }, {
        path: '/admin',
        component: Inventorys,
        meta: {
          title: '库存管理',
          icon: FileSearchOutlined,
        },
        children: [
          {
            path: '/admin/inventory',
            component: Inventory,
            meta: {
              title: '库存查看',
            },
          },
          {
            path: '/admin/purchase',
            component: Purchase,
            meta: {
              title: '进货添加',
            },
          },
        ],
      },  {
        path: '/activities',
        component: Activities,
        meta: {
          title: '营销管理',
          icon: FunctionOutlined,
        },
        children: [
          {
            path: '/activities/minuse',
            component: Minus,
            meta: {
              title: '满减活动',
            },
          },
        ],
      }, {
        path: '/sale',
        component: Sale,
        meta: {
          title: '销售查看',
          icon: SecurityScanOutlined,
        },
      },
      {
        path: '/detail',
        component: Detail,
        meta: {
          title: '商品详情',
          icon: RiseOutlined,
        },
      },
    ],
  },
  {
    path: '/',
    component: FrameLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          icon: HomeOutlined,
        },
      }, {
        path: '/self',
        component: Self,
        meta: {
          title: '个人中心',
        },
      },
    ],
  },
  {
    path: '/',
    component: FrameLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          icon: HomeOutlined,
        },
      }, {
        path: '/market',
        component: Market,
        meta: {
          title: '在线销售',
        },
      },
    ],
  },
]
export default routes
