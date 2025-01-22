import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { WishlistContext } from "../Contexts/WishlistContext";
import { CartContext } from "../Contexts/CartContext";

function Header() {
  const { wishlist } = useContext(WishlistContext);
  const { cartList } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    navigate("/products/All", { state: { query: searchQuery } });
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md bg-body-tertiary">
          <div className="container">
            <Link to="/" className="navbar-brand col-md-4 fs-5 fw-medium">
              TrendHive
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
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link p-0" aria-current="page" to="/userPage">
                    <i className="bi bi-person-fill-check text-danger fs-2"></i>
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  {/************** link for wishlist Page **************/}
                  <Link className="nav-link" to="/wishlistPage">
                    <i
                      className="bi bi-heart position-relative"
                      style={{ fontSize: "1.6rem" }}
                    >
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {wishlist ? wishlist.length : 0}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </i>
                  </Link>
                </li>

                <li className="nav-item ms-2">
                  <Link className="nav-link" to="/cartPage">
                    <i
                      className="bi bi-cart3 position-relative"
                      style={{ fontSize: "1.6rem" }}
                    >
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {cartList ? cartList.length : 0}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </i>
                  </Link>
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
