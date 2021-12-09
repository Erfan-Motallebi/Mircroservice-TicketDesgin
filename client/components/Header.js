export default function Header({ currentUser }) {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary pt-3">
        <div className="container-fluid">
          <a className="navbar-brand text-danger" href="#">
            <h5>Ticket App</h5>
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <a
                  className="nav-link active text-primary"
                  aria-current="page"
                  href="#"
                >
                  <h5>Sign In/Out</h5>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active text-primary"
                  aria-current="page"
                  href="#"
                >
                  <h5>Sign Out</h5>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
