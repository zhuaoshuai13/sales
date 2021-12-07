import { LOGIN_SUCCESS } from '../actions/constants'
import _ from 'loadsh'
const initialState = {
  username: null,
  token: null,
}
const userReducer = (state = initialState, { type, payload }) => {
  const copy = _.cloneDeep(state)
  console.log(type);
  switch (type) {
  case LOGIN_SUCCESS:
    copy.username = payload.username
    copy.token = payload.token
    console.log(copy);
    return copy
  default:
    return state
  }
}

export default userReducer
