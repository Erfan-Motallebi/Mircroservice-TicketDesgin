import { useState } from "react";
import axios from "axios";

export default function singUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.request({
        method: "POST",
        url: "/api/users/signup",
        body: {
          email,
          password,
        },
      });
    } catch (err) {
      setErrors(err.response.data.errors);
    }
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
        {errors.length > 0 && (
          <section className="alert alert-danger my-2 p-4 ">
            <div>
              <ul className="list-group list-group-vertical-lg">
                {errors.map((err, index) => {
                  return (
                    <li
                      className="list-group-item list-group-item-warning mb-2 p-2 "
                      key={index}
                    >
                      {err.message}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
