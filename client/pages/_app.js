import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import buildClient from "../helpers/build-client";
import App from "next/app";
import Header from "../components/Header";

function MyApp({ Component, pageProps, currentUser }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <Component {...pageProps} currentUser={currentUser} />
    );
  }
  return (
    <div className="">
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}
MyApp.getInitialProps = async (appCtx) => {
  // console.log({ appCtx: Object.keys(appCtx) });
  // ! to other's getIinitalProps available acrross the entire app.

  // ! First Solution
  // let pageProps = {};
  // if (appCtx.Component.getInitialProps) {
  //   pageProps = await appCtx.Component.getInitialProps(appCtx.ctx);
  // }

  // ! Second Solution
  const { pageProps } = await App.getInitialProps(appCtx);

  const client = buildClient(appCtx.ctx);
  let currentUser = {};
  try {
    const { data } = await client.request({
      method: "GET",
      url: "/api/users/currentuser",
    });
    ({ currentUser } = data);
  } catch (error) {
    console.log({ Error: error.message });
    currentUser = null;
  }
  // ! resolves to an object
  return { pageProps, currentUser };
};

export default MyApp;
