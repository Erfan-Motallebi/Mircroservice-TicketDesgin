import axios from "axios";

export default async function buildClient({ req }) {
  console.log("api");
  if (typeof window === "undefined") {
    // Server-Side -> Kubernetes Cluster
    const client = axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
    return client;
  } else {
    // Client-side | Browser-side Request -> Kubernetes Cluster
    const client = axios.create({
      baseURL: "/",
    });
    return client;
  }
}
