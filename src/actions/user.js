import { login } from '../api/user'
import { LOGIN_SUCCESS, LOGOUT, USER_RESET } from './constants'

// 用户登录成功生成的 action
export const loginSuccessAction = (user) => {
  const {username, token} = user
  return ({
    type: LOGIN_SUCCESS,
    payload: {
      username,
      token,
    },
  })
}

