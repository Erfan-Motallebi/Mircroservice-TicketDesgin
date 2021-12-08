import { useState } from "react";
import useRequest from "../../hooks/use-request";
import { useRouter } from "next/router";

export default function SignUp() {
  const Router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "POST",
    body: { email, password },
    onSuccess: ({ response }) => {
      console.log({ response });
      Router.push("/");
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   await doRequest();
    //   Router.push("/");
    // } catch (error) {
    //   console.error(error);
    // }
    await doRequest();
  };

  return (
    <div>
      <div className="container mt-5">
        <section className="mx-auto p-5 text-info">
          <h1>Sign Up</h1>
        </section>
        <form onSubmit={submitHandler}>
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="staticEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          <button className="btn btn-primary">Sign Up</button>
        </form>
        {errors}
      </div>
    </div>
  );
}

SignUp.getLayout = (page) => {
  return (
    <div>
      <h1>Sign Up Header</h1>
      {page}
    </div>
  );
};
