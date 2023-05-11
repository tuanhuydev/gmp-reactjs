import React, { useReducer } from 'react';
import { appReducer } from '../../configs/reducers/metaReducer';
import { INITIAL_STORE } from '../../configs/constants';
import { DispatchContext, StoreContext } from '../../configs/store/context';

export default function MockProvider({ children }) {
  const [data, dispatch] = useReducer(appReducer, INITIAL_STORE);
  return (
    <StoreContext.Provider value={data}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StoreContext.Provider>
  );
}
