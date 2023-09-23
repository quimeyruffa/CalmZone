import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Control from "./src/Control";

export default function App() {
  return (
    <Provider store={store}>
      <Control />
    </Provider>
  );
}
