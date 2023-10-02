import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store/index";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import AdminLayout from "./admin/layout";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = router.pathname.includes("/admin")
    ? (page) => <AdminLayout children={page} />
    : (page) => <Layout children={page} />;
  return (
    <ChakraProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
}
