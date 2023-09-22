import jwt_decode from "jwt-decode";
const authState = {
  loading: true,
  authenticate: false,
  error: "",
  status: "",
  userInfo: {},
  token: null,
  notification: false,
  interests: null,
  activated: false,
};

const tokenDecode = (token) => {
    const tokenDecoded = jwt_decode(token);
  
    const expTime = new Date(tokenDecoded.exp * 1000);
    if (new Date() > expTime) {
      return null;
    }
    return tokenDecoded;
  };

const getToken = localStorage.getItem("token");

if (getToken) {
  const getInfo = tokenDecode(getToken);
  if (getInfo) {
    authState.token = getToken;
    authState.userInfo = getInfo;
    authState.authenticate = true;
    authState.loading = false;
  }
}



export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

  switch (type) {
    case "USER_LOGIN_SUCCESS":
      const userInfo = tokenDecode(payload.token);
      return {
        ...state,
        userInfo: { ...userInfo, ...payload.userInfo },
        token: payload.token,
        status: payload.status,
        error: "",
        authenticate: true,
        loading: false,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        authenticate: false,
        userInfo: "",
        token: "",
        message: "Logout Successful",
      };
    default:
      return state;
  }
};
