import buildClient from "../helpers/build-client";

function Home({ data: { currentUser } }) {
  return (
    <div>
      <h1>{currentUser ? "You are signed in" : "You are  NOT signed in"}</h1>
    </div>
  );
}
export default Home;

// export async function getServerSideProps(ctx) {
//   // const resp = await axios.get("/api/users/currentuser");
//   return {
//      props: {
//           data: resp.data
//          }
//       };
// }

Home.getInitialProps = async (context) => {
  console.log("Page Context");
  const client = buildClient(context);
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
  return { data: resp };
};
