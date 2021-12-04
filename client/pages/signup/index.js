import { useState } from "react";
import axios from "axios";
import useRequest from "../../components/hook/useRequest";

export default function singUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "POST",
    body: { email, password },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <div>
      <div className="container mt-5">
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
          <button className="btn btn-primary">Submit</button>
        </form>
        {errors}
      </div>
    </div>
  );
}
