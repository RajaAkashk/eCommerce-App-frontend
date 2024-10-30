import { NavLink,Link } from 'react-router-dom';

function Header() {
    return (
      <>
        <header>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
              <Link to="/" className="navbar-brand col-md-4 fs-5 fw-medium" href="#">
                MyShopSite
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
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* Search */}
                <div className="col-md-5">
                  <div className="input-group border rounded">
                    <span className="input-group-text bg-white border-0">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      style={{ outline: "none", boxShadow: "none" }}
                      className="form-control border-0"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </div>
                </div>
  
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#">
                      <button className="btn btn-danger fw-medium text-light">
                        Login
                      </button>
                    </a>
                  </li>
                  <li className="nav-item ms-2">
                    <a className="nav-link" href="#">
                      <i
                        className="bi bi-heart position-relative"
                        style={{ fontSize: "1.6rem" }}
                      >
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                          style={{ fontSize: "0.8rem" }}
                        >
                          0
                          <span className="visually-hidden">unread messages</span>
                        </span>
                      </i>
                    </a>
                  </li>
  
                  <li className="nav-item ms-2">
                    <a className="nav-link" href="#">
                      <i
                        className="bi bi-cart3 position-relative"
                        style={{ fontSize: "1.6rem" }}
                      >
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                          style={{ fontSize: "0.8rem" }}
                        >
                          0
                          <span className="visually-hidden">unread messages</span>
                        </span>
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  }
  
  export default Header;
  