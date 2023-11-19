const TYPES = {
  SET_LOADING: "SET_LOADING",
  SET_AUTH: "SET_AUTH",
  SET_USER: "SET_USER",
  SET_USER_LISTS: "SET_USER_LISTS",
  SET_NOTIFICATION: "SET_NOTIFICATION",
  SET_USER_PORTFOLIOS: "SET_PORTFOLIOS",
  SELECT_PORTFOLIO: "SELECT_PORTFOLIO",
  CLEAR_PORTFOLIO: "CLEAR_PORTFOLIO",
  VIEW_PORTFOLIO: "VIEW_PORTFOLIO",
  ADD_PORTFOLIO: "ADD_PORTFOLIO",
  SET_PROJECT_DETAIL: "SET_PROJECT_DETAIL",
};

const defaultValue = {
  loading: false,
  isAuth: false,
  isEditPortfolio: false,
  isViewPortfolio: false,
  isAddPortfolio: false,
  projectDetail: {},
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
    case TYPES.VIEW_PORTFOLIO:
      return { ...state, portfolio: payload, isViewPortfolio: true };
    case TYPES.ADD_PORTFOLIO:
      return { ...state, isAddPortfolio: true };
    case TYPES.CLEAR_PORTFOLIO:
      return {
        ...state,
        portfolio: undefined,
        isViewPortfolio: false,
        isEditPortfolio: false,
        isAddPortfolio: false,
      };
    case TYPES.SET_PROJECT_DETAIL:
      console.log('payload is', payload)
      return {
        ...state,
        projectDetail: payload,
      };
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
