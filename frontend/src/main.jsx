import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(login({ accessToken: token }));
    }
  }, [dispatch]);

  return <App />;
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
