import { type JSX } from "react";
import RouterProvider from "./Router/RouterProvider";
import { store } from "./store";
import { Provider } from "react-redux";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RouterProvider />
    </Provider>
  );
}

export default App;
