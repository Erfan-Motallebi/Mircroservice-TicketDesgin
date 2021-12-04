import axios from "axios";
import { useState } from "react";

export default function useRequest({ url, method, body }) {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      const resp = await axios.request({
        method,
        url,
        body,
      });
      setResponse(resp);
    } catch (err) {
      setErrors(
        <section className="alert alert-danger my-2 p-4 ">
          <div>
            <ul className="list-group list-group-vertical-lg">
              {err.response.data.errors.map((err, index) => {
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
}
