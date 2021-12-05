import axios from "axios";

export default function Home({ data }) {
  console.log({ data });
  return (
    <div>
      <h1>Landing page</h1>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const resp = await axios.get("/api/users/currentuser");

  return {
    props: {
      data: resp.data,
    },
  };
}
