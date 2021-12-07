import buildClient from "../helpers/build-client";

function Home() {
  // console.log({ currentUser });
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

Home.getInitialProps = async (context) => {
  const client = buildClient(context);
  const data = await client.get("/api/users/currentuser");
  console.log({ client });
  console.log({ data });
  return {};
};

export default Home;
