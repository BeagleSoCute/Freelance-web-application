import { createContext, useMemo, useReducer, useEffect } from "react";
import appReducer from "contexts/app.reducer";
import { checkIsAuth } from "helpers/auth.helper";
import { getMyData } from "services/user.service";
export const AppContext = createContext({
  loading: false,
  isAuth: false,
  isEditPortfolio: false,
  isViewPortfolio: false,
  isAddPortfolio: false,
  user: {},
  portfolio: {},
  setLoading: () => {},
  setUser: () => {},
  clearPortfolio: () => {},
  selectPortfolio: () => {},
  viewPortfolio: () => {},
  addPortfolio: () => {}
});
export const { reducer, defaultValue, TYPES } = appReducer;
export const AppProvider = ({ children }) => {
  const [reducerStates, dispatch] = useReducer(reducer, defaultValue);
  const {
    loading,
    isAuth,
    user,
    portfolio,
    isEditPortfolio,
    isViewPortfolio,
    isAddPortfolio,
  } = reducerStates;
  useEffect(() => {
    dispatch({ type: TYPES.SET_LOADING, payload: true });
    const resCheckAuth = checkIsAuth();
    const init = async () => {
      const { success, userData } = await getMyData();
      if (success) {
        dispatch({ type: TYPES.SET_USER, payload: userData });
      }
    };
    if (resCheckAuth) {
      init();
    }
    dispatch({ type: TYPES.SET_LOADING, payload: false });
  }, []);

  const appContextValue = useMemo(() => {
    return {
      loading,
      isAuth,
      user,
      portfolio,
      isEditPortfolio,
      isViewPortfolio,
      isAddPortfolio,
      setLoading: (data) => {
        dispatch({ type: TYPES.SET_LOADING, payload: data });
      },
      setUser: (data) => {
        dispatch({ type: TYPES.SET_USER, payload: data });
      },
      setUserPortfolios: (data) => {
        dispatch({ type: TYPES.SET_PORTFOLIOS, payload: data });
      },
      selectPortfolio: (data) => {
        dispatch({ type: TYPES.SELECT_PORTFOLIO, payload: data });
      },
      viewPortfolio: (data) => {
        dispatch({ type: TYPES.VIEW_PORTFOLIO, payload: data });
      },
      addPortfolio: () => {
        dispatch({ type: TYPES.ADD_PORTFOLIO });
      },
      clearPortfolio: () => {
        dispatch({ type: TYPES.CLEAR_PORTFOLIO });
      },
    };
  }, [
    loading,
    isAuth,
    portfolio,
    user,
    isEditPortfolio,
    isAddPortfolio,
    isViewPortfolio,
    dispatch,
  ]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
