import React from "react";
import Coursal from "../Components/Coursal";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link
                to="/products/Men"
                className="text-center"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1710145605252-913f6251027b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{
                    width: "100%",
                    height: "13rem",
                    objectFit: "cover",
                  }}
                  className="img-fluid"
                  alt="Image of Category"
                />
                <p className="text-light fs-5 fw-medium bg-danger">Men</p>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/products/Women"
                className="text-center"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1689371953618-f4d101a0c5a6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{
                    width: "100%",
                    height: "13rem",
                    objectFit: "cover",
                  }}
                  className="img-fluid"
                  alt="Image of Category"
                />
                <p className="text-light fs-5 fw-medium bg-danger">Women</p>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/products/Kids"
                className="text-center"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://images.unsplash.com/flagged/photo-1562088440-ee50e79b2f98?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{
                    width: "100%",
                    height: "13rem",
                    objectFit: "cover",
                  }}
                  className="img-fluid"
                  alt="Image of Category"
                />
                <p className="text-light fs-5 fw-medium bg-danger">Kids</p>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/products/All"
                className="text-center"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://images.hindustantimes.com/img/2022/08/25/550x309/pexels-antoni-shkraba-7081113_1661414759537_1661414794423_1661414794423.jpg"
                  style={{
                    width: "100%",
                    height: "13rem",
                    objectFit: "cover",
                  }}
                  className="img-fluid"
                  alt="Image of Category"
                />
                <p className="text-light fs-5 fw-medium bg-danger">All</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Coursal />

      <section className="pb-5 pt-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="img-fluid homePageCard"
                      // style={{height: "15rem" }}
                      alt="New Men Clothes"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <p
                        className="card-title text-danger fs-4 fw-medium"
                        style={{ textDecoration: "underline" }}
                      >
                        New Arrivals
                      </p>
                      <p className="card-text homePageCardText">
                        Upgrade your wardrobe with our fresh arrivals—featuring
                        on-trend styles, quality fabrics, and designs that make
                        a statement. Shop now to stay sharp and stylish this
                        season.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1727475931105-2f6ffa51ad6d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="img-fluid homePageCard"
                      // style={{ objectFit: "contain", height: "15rem" }}
                      alt="New Women Clothes"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <p
                        className="card-title text-danger fs-4 fw-medium"
                        style={{ textDecoration: "underline" }}
                      >
                        New Arrivals
                      </p>
                      <p className="card-text homePageCardText">
                        Elevate your style with our latest collection, blending
                        chic designs, premium fabrics, and must-have pieces for
                        every occasion. Discover your new favorite looks and
                        shine this season.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          <img
            src="https://marketplace.canva.com/EAFfT9NH-JU/1/0/1600w/canva-gray-minimalist-fashion-big-sale-banner-TvkdMwoxWP8.jpg"
            alt="banner"
            style={{ width: "100%", height: "25rem", objectFit: "cover" }}
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
