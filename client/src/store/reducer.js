const reducer = (state = {userId: "", auth: false}, action) => {
  if (action.type === 'USER_LOGIN') {
    return {
      userId: action.userId,
      auth: true
    }
  }
  return state
}

export default reducer
