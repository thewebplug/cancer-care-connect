export const chatAppReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_CHAT_VISIBLE':
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

// new one
export const showDisplayReducer = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_DISPLAY':
      return action.payload
    default:
      return state
  }
}

export const chatToggleReducer = (state = false, action) => {
  switch (action.type) {
    case 'CHAT_TOGGLE':
      return action.payload
    default:
      return state
  }
}
export const currentFriendReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_FRIEND':
      console.log('action.payload', action.payload);

      return {messageId: action.payload.id, 
        // messageUsername: action.payload.username,
        messageLastName: action.payload.lastName, 
        messageFirstName: action.payload.firstName,
        // messageStoreName: action.payload.storeName,
        // messageUserName: action.payload.userName,
        // messageProfilePic: action.payload.profilePic,
        // productName: action.payload.productName,
        // productImage: action.payload.productImage,
        // productDetail: action.payload.productDetail,
        // productWeight: action.payload.productWeight,
        // productMetrics: action.payload.productMetrics,
        // productPrice: action.payload.productPrice,
        // productSlug: action.payload.productSlug,
        // productId: action.payload.productId,
        // bidMessage: action.payload.bidMessage,
        // amount: action.payload.amount,
        // quantity: action.payload.quantity,
        // totalPrice: action.payload.totalPrice,
        // lastPrice: action.payload.lastPrice,
        // negotiable: action.payload.negotiable,

        navFrom: action.payload.navFrom,
      }

    case 'CLEAR_BID_MESSAGE':
      return {
        
      }

      case 'CLEAR_CURRENT_FRIEND':
        return {}
    default:
      return state
  }
}
export const newFriendReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_FRIEND':
      return action.payload
    default:
      return state
  }
}

export const desktopChatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DESKTOP_CHAT':
      return {desktop: true}
    default:
      return state
  }
}
