import "../styles/globals.css";
import { Inter } from "next/font/google";
import Layout from "../components/Layout/Layout";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Loading from "../components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout className={inter.className}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Layout>
    </SessionProvider>
  );
}

const Auth = ({ children }) => {
  const { data: session, status } = useSession();

  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) signIn(); // If no user, redirect to sign in
  }, [isUser, status]);

  if (isUser) {
    return children;
  }
  // If no user, but the data is loading, show a loading indicator
  // if no user, useEffect will redirect to Sign In
  return <Loading />; // insert loading component here
};

export default MyApp;
