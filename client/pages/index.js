import buildClient from "../helpers/build-client";

function Home({ data: { currentUser } }) {
  console.log({ currentUser });
  return (
    <div>
      <h1>Landing page</h1>
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
  const client = buildClient(context);
  const { data } = await client.request({
    method: "GET",
    url: "/api/users/currentuser",
  });
  return { data };
};
