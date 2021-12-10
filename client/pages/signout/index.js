import { useEffect } from "react";
import { useRouter } from "next/router";
import useRequest from "../../hooks/use-request";

export default function Signout() {
  const Router = useRouter();
  const { doRequest, errors } = useRequest({
    method: "POST",
    url: "/api/users/signout",
    body: "",
    onSuccess: () => {
      Router.push("/");
    },
  });

  useEffect(() => {
    const fetchSignOut = async () => {
      await doRequest();
    };
    fetchSignOut();
  }, []);

  return <div></div>;
}
