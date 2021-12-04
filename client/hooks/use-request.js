import { useState } from "react";
import axios from "axios";

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const resp = await axios.request({
        method,
        url,
        data: body,
      });
      console.log(resp);
      return resp.data;
    } catch (err) {
      setErrors(
        <section className="alert alert-danger my-2 p-4 ">
          <div>
            <ul className="list-group list-group-vertical-lg">
              {err.response.data &&
                err.response.data.errors.map((err, index) => {
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
      );
    }
  };

  return {
    doRequest,
    errors,
  };
};
