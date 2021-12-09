import { LOGIN_SUCCESS, LOGOUT } from '../actions/constants'
import _ from 'loadsh'
const initialState = {
  username: null,
  token: null,
  type: null,
}
const userReducer = (state = initialState, { type, payload }) => {
  const copy = _.cloneDeep(state)
  console.log(type);
  switch (type) {
  case LOGIN_SUCCESS:
    copy.username = payload.username
    copy.token = payload.token
    copy.type = payload.type
    return copy
  case LOGOUT:
    copy.username = null
    copy.token = null
    copy.type = null
    return copy
  default:
    return state
  }
}

export default userReducer
