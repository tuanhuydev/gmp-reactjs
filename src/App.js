import { useReducer } from "react";
import Home from "./pages/Home";
import { appReducer } from "./configs/reducers/metaReducer";
import { StoreContext, DispatchContext } from "./configs/store/context";
import { INITIAL_STORE } from "./commons/constants";

function App() {
  const [data, dispatch] = useReducer(appReducer, INITIAL_STORE);
  return (
    <StoreContext.Provider value={data}>
      <DispatchContext.Provider value={dispatch}>
        <Home />
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
}

export default App;
