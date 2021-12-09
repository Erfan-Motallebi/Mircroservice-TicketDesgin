import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../helpers/build-client";
import App from "next/app";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <div>
      <h1>Headers</h1>
      <Component {...pageProps} />
    </div>
  );
}
MyApp.getInitialProps = async (appCtx) => {
  // console.log({ appCtx: Object.keys(appCtx) });
  // ! to other's getIinitalProps available acrross the entire app.
  const appProps = await App.getInitialProps(appCtx);

  const client = buildClient(appCtx.ctx);
  let resp;
  try {
    const { data } = await client.request({
      method: "GET",
      url: "/api/users/currentuser",
    });
    resp = data;
  } catch (error) {
    console.log({ Error: error.message });
    resp = { currentUser: null };
  }

  // ! resolves to an object
  return { ...appProps };
};

export default MyApp;
