import Feature from "../Components/Feature";
import Team from "../Components/Team";
import Appointment from "../Components/Appointment";
import Testimonial from "../Components/Testimonial";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    $(document).ready(function () {
      $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: { items: 1 },
          // 600: { items: 2 },
          // 1000: { items: 3 },
        },
      });
    });
  }, []);
  return (
    <>
      {/* Header Start Carousel */}
      <div className="container-fluid header bg-primary p-0 mb-5">
        <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
          <div className="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
            <h1 className="display-4 text-white mb-5">
              Good Health Is The Root Of All Heppiness
            </h1>
            <div className="row g-4">
              <div className="col-sm-4">
                <div className="border-start border-light ps-4">
                  <h2 className="text-white mb-1" data-toggle="counter-up">
                    123
                  </h2>
                  <p className="text-light mb-0">Expert Doctors</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="border-start border-light ps-4">
                  <h2 className="text-white mb-1" data-toggle="counter-up">
                    1234
                  </h2>
                  <p className="text-light mb-0">Medical Stuff</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="border-start border-light ps-4">
                  <h2 className="text-white mb-1" data-toggle="counter-up">
                    12345
                  </h2>
                  <p className="text-light mb-0">Total Patients</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <div className="owl-carousel header-carousel">
              <div className="owl-carousel-item position-relative">
                <img
                  className="img-fluid"
                  src="../src/assets/img/carousel-1.jpg"
                  alt="carousel-1"
                />
                <div className="owl-carousel-text">
                  <h1 className="display-1 text-white mb-0">Cardiology</h1>
                </div>
              </div>
              <div className="owl-carousel-item position-relative">
                <img
                  className="img-fluid"
                  src="../src/assets/img/carousel-2.jpg"
                  alt=""
                />
                <div className="owl-carousel-text">
                  <h1 className="display-1 text-white mb-0">Neurology</h1>
                </div>
              </div>
              <div className="owl-carousel-item position-relative">
                <img
                  className="img-fluid"
                  src="../src/assets/img/carousel-3.jpg"
                  alt=""
                />
                <div className="owl-carousel-text">
                  <h1 className="display-1 text-white mb-0">Pulmonary</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}

      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="d-flex flex-column">
                <img
                  className="img-fluid rounded w-75 align-self-end"
                  src="../src/assets/img/about-1.jpg"
                  alt=""
                />
                <img
                  className="img-fluid rounded w-50 bg-white pt-3 pe-3"
                  src="../src/assets/img/about-2.jpg"
                  alt=""
                  style={{ marginTop: "-25%" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <p className="d-inline-block border rounded-pill py-1 px-4">
                About Us
              </p>
              <h1 className="mb-4">
                Why You Should Trust Us? Get Know About Us!
              </h1>
              <p>
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <p className="mb-4">
                Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No
                stet est diam rebum amet diam ipsum. Clita clita labore, dolor
                duo nonumy clita sit at, sed sit sanctus dolor eos.
              </p>
              <p>
                <i className="far fa-check-circle text-primary me-3" />
                Quality health care
              </p>
              <p>
                <i className="far fa-check-circle text-primary me-3" />
                Only Qualified Doctors
              </p>
              <p>
                <i className="far fa-check-circle text-primary me-3" />
                Medical Research Professionals
              </p>
              <a
                className="btn btn-primary rounded-pill py-3 px-5 mt-3"
                href=""
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 600 }}
          >
            <p className="d-inline-block border rounded-pill py-1 px-4">
              Services
            </p>
            <h1>Health Care Solutions</h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-heartbeat text-primary fs-4" />
                </div>
                <h4 className="mb-3">Cardiology</h4>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="">
                  <i className="fa fa-plus text-primary me-3" />
                  Read More
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-x-ray text-primary fs-4" />
                </div>
                <h4 className="mb-3">Pulmonary</h4>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="">
                  <i className="fa fa-plus text-primary me-3" />
                  Read More
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-brain text-primary fs-4" />
                </div>
                <h4 className="mb-3">Neurology</h4>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="">
                  <i className="fa fa-plus text-primary me-3" />
                  Read More
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-wheelchair text-primary fs-4" />
                </div>
                <h4 className="mb-3">Orthopedics</h4>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="">
                  <i className="fa fa-plus text-primary me-3" />
                  Read More
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-tooth text-primary fs-4" />
                </div>
                <h4 className="mb-3">Dental Surgery</h4>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="">
                  <i className="fa fa-plus text-primary me-3" />
                  Read More
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-vials text-primary fs-4" />
                </div>
                <h4 className="mb-3">Laboratory</h4>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="">
                  <i className="fa fa-plus text-primary me-3" />
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}

      <Feature />

      <Team />

      <Appointment />

      <Testimonial />
    </>
  );
};

export default Home;
