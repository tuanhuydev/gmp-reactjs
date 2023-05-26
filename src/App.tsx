import React, { useReducer } from 'react';
import { appReducer } from './configs/reducers/metaReducer';
import { StoreContext, DispatchContext } from './configs/store/context';
import { INITIAL_STORE } from './commons/constants/global';
import AppRouter from './pages';

function App() {
  const [data, dispatch] = useReducer(appReducer, INITIAL_STORE);
  return (
    <StoreContext.Provider value={data}>
      <DispatchContext.Provider value={dispatch}>
        <AppRouter />
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
}

export default App;
