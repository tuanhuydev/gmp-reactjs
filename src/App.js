import { useReducer } from "react";
import Home from "./pages/Home";
import { INITIAL_STORE } from "./configs/constants";
import { appReducer } from "./configs/reducers/metaReducer";
import { StoreContext, DispatchContext } from "./configs/store/context";

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
