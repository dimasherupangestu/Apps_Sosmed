import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Store } from "./store/store.ts";
const queryClinet = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClinet}>
      <ChakraProvider>
        <Provider store={Store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
