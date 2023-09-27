export const chatAppReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_CHAT_VISIBLE':
      return action.payload
    default:
      return state
  }
}

export const chatToggleReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_CHAT_TOGGLE':
      return action.payload
    default:
      return state
  }
}
export const toggleReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_TOGGLE':
      return action.payload
    default:
      return state
  }
}

export const chatUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CHAT_USER':
      return action.payload
    default:
      return state
  }
}
export const connectedUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CONNECTED_USERS':
      return action.payload
    default:
      return state
  }
}
