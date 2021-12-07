import axios from "axios";

function Home({ data }) {
  console.log({ data });
  return (
    <div>
      <h1>Landing page</h1>
    </div>
  );
}

// export async function getServerSideProps(ctx) {
//   // const resp = await axios.get("/api/users/currentuser");
//   console.log("GetServerSide Runs");
//   return {};
// }

Home.getInitialProps = async ({ req }) => {
  let data;
  // ? Checking whether we're inside a browser or server in order to make our base URL
  if (typeof window !== "undefined") {
    // Inside the browser - Base URL => ''
    const resp = await axios.get("/api/users/currentuser");
    data = resp.data;
  } else {
    const resp = await axios.request({
      method: "GET",
      url: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      headers: req.headers,
    });
    data = resp.data;
  }
  return { data };
};

export default Home;
