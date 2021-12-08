import axios from "axios";

export default function buildClient({ req }) {
  let client;
  if (typeof window === "undefined") {
    // Server-Side -> Kubernetes Cluster
    client = axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/",
      headers: req.headers,
    });
  } else {
    // Client-side | Browser-side Request -> Kubernetes Cluster
    client = axios.create({
      baseURL: "/",
    });
  }
  return client;
}
