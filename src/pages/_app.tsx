import {
  type NextComponentType,
  type NextPageContext,
  type AppType,
} from "next/dist/shared/lib/utils";
import { ApolloProvider } from "@apollo/client";

import "../styles/globals.css";
import "@glideapps/glide-data-grid/dist/index.css";
import useClientConfig from "../apollo-client";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

const BaseApp: React.FC<{
  Component: NextComponentType<NextPageContext, object, object>;
  pageProps: object;
}> = ({ Component, pageProps }) => {
  const client = useClientConfig();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BaseApp Component={Component} pageProps={pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
