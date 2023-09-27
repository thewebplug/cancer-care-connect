
  export const chatExpandReducer = (state = {}, action) => {
    switch (action.type) {
      case 'CHAT_EXPAND_TRUE':
        return { expand: true, visible: true }
      case 'CHAT_EXPAND_FALSE':
        return { expand: false, visible: true}
      case 'CHAT_CLOSED':
        return { expand: false, visible: false}
      case 'CHAT_OPEN':
        return { expand: false, visible: true}
      case 'CHAT_INITIATED':
        return {payload: action.payload}
      default:
        return state
    }
  }