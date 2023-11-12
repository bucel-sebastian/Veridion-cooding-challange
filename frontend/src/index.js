import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./redux/StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./redux/store";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();
