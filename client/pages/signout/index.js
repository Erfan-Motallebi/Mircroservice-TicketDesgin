import buildClient from "../../helpers/build-client";

export default function Signout({ data }) {
  console.log({ data });
  return <div></div>;
}

Signout.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.request({
    url: "/api/users/signout",
    method: "POST",
  });

  return { data };
};
