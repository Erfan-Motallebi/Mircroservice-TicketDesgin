import Link from "next/link";

export default function Header({ currentUser }) {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary pt-3">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand text-info" href="#">
              <button className="btn btn-info ">
                <span className="h4">Ticket App</span>
              </button>
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav d-flex justify-content-center">
              {!currentUser ? (
                <li className="nav-item ">
                  <Link href="/signin">
                    <a
                      className="nav-link text-primary"
                      aria-current="page"
                      href="#"
                    >
                      <button className="btn btn-success m-1">
                        <span className="h5 text-info">Sign In</span>
                      </button>
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a
                      className="nav-link text-primary"
                      aria-current="page"
                      href="#"
                    >
                      <button className="btn btn-success">
                        <span className="h5 text-info">Sign Up</span>
                      </button>
                    </a>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link href="/signout">
                    <a
                      className="nav-link active text-primary"
                      aria-current="page"
                      href="#"
                    >
                      <button className="btn btn-danger">
                        <span className="h5 text-primary">Sign Out</span>
                      </button>
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
