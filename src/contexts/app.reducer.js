const TYPES = {
  SET_LOADING: "SET_LOADING",
  SET_AUTH: "SET_AUTH",
  SET_USER: "SET_USER",
  SET_USER_LISTS: "SET_USER_LISTS",
  SET_NOTIFICATION: "SET_NOTIFICATION",
  SET_USER_PORTFOLIOS: "SET_PORTFOLIOS",
  SELECT_PORTFOLIO: "SELECT_PORTFOLIO",
  CLEAR_PORTFOLIO: "CLEAR_PORTFOLIO",
};

const defaultValue = {
  loading: false,
  isAuth: false,
  isEditPortfolio: false,
  user: {},
  portfolio: {},
  users: [],
};

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case TYPES.SET_LOADING:
      return { ...state, loading: payload };
    case TYPES.SET_AUTH:
      return { ...state, isAuth: payload };
    case TYPES.SET_USER:
      return { ...state, user: payload };
    case TYPES.SET_USER_LISTS:
      return { ...state, users: payload };
    case TYPES.SET_NOTIFICATION:
      return { ...state, notificationData: payload };
    case TYPES.SET_USER_PORTFOLIOS:
      return { ...state, user: { ...defaultValue.user, portfolios: payload } };
    case TYPES.SELECT_PORTFOLIO:
      return { ...state, portfolio: payload, isEditPortfolio: true };
    case TYPES.CLEAR_PORTFOLIO:
      return { ...state, portfolio: undefined, isEditPortfolio: false };
    default:
      break;
  }
};

const appReducer = {
  TYPES,
  defaultValue,
  reducer,
};

export default appReducer;
