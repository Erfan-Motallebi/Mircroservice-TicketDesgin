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

          <div
            className=" d-flex justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ">
              {!currentUser ? (
                <div className="d-flex justify-content-center align-items-center">
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
                  </li>
                  <li>
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
                </div>
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
