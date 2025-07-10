import { useState } from "react";

const Sections = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const items = [
    { id: 1, group: "basic", img: "./assets/home_images/builder/widgets/banner-02.jpg", title: "Banner Widget" },

    { id: 1, group: "basic", img: "./assets/home_images/builder/widgets/banner-02.jpg", title: "Banner Widget" },
    { id: 2, group: "slide", img: "./assets/home_images/builder/widgets/slide-01.jpg", title: "Slide Widget" },
    { id: 3, group: "slide", img: "./assets/home_images/builder/widgets/slide-02.jpg", title: "Slide Widget" },
    { id: 4, group: "image", img: "./assets/home_images/builder/widgets/gallery-01.jpg", title: "Gallery Widget" },
    { id: 5, group: "image", img: "./assets/home_images/builder/widgets/gallery-02.jpg", title: "Gallery Widget" },
    { id: 6, group: "slide", img: "./assets/home_images/builder/widgets/content-03.jpg", title: "Content Widget" },
    { id: 7, group: "image", img: "./assets/home_images/builder/widgets/content-03.jpg", title: "Content Widget" },
    { id: 8, group: "dynamic", img: "./assets/home_images/builder/widgets/list-01.jpg", title: "Dynamic Content" },
    { id: 9, group: "dynamic", img: "./assets/home_images/builder/widgets/list-02.jpg", title: "Dynamic Content" },
    { id: 10, group: "dynamic", img: "./assets/home_images/builder/widgets/list-03.jpg", title: "Dynamic Content" },
    { id: 11, group: "dynamic", img: "./assets/home_images/builder/widgets/list-04.jpg", title: "Dynamic Content" },
    { id: 12, group: "dynamic", img: "./assets/home_images/builder/widgets/calender.jpg", title: "Calendar Widget" },
    { id: 13, group: "dynamic", img: "./assets/home_images/builder/widgets/video-course.jpg", title: "Video & Course" },
  ];

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
  };

  return (
    <>
      <section className="bg-half-170 d-table w-100 overflow-hidden" id="home" style={{ backgroundColor: "rgb(72, 92, 97)" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-5">
              <div className="title-heading mt-4">
                <h1 className="heading mb-3" style={{ color: "white" }}>
                  A Visualized CMS
                </h1>
                <h5 className="mb-3" style={{ color: "white" }}>
                  An enterprise open source CMS solution within Drupal
                </h5>
                <p className="para-desc text-muted" style={{ color: "rgba(255,255,255,.7)" }}>
                  Incorporating visualization, components, applets, and headless capabilities into Drupal enhances its potency and user experiences.
                  <br /> Please contact us for a demostration.
                </p>
                <div className="row mt-5">
                  <div className="col-1">
                    <img
                      src="/assets/images/indexClassicAppTwo/TailwindCSS.png"
                      className="img-circle mx-auto d-block"
                      alt=""
                      title="TailwindCSS"
                      style={{ cursor: "pointer", maxWidth: "40px" }}
                    />
                  </div>
                  <div className="col-1" style={{ marginLeft: "25px" }}>
                    <img
                      src="/assets/images/indexClassicAppTwo/gulp.png"
                      className="img-circle mx-auto d-block"
                      alt=""
                      title="Gulp"
                      style={{ cursor: "pointer", maxWidth: "40px" }}
                    />
                  </div>
                  <div className="col-1" style={{ marginLeft: "25px" }}>
                    <img
                      src="/assets/images/indexClassicAppTwo/yam.png"
                      className="img-circle mx-auto d-block"
                      alt=""
                      title="yam"
                      style={{ cursor: "pointer", maxWidth: "40px" }}
                    />
                  </div>
                  <div className="col-1" style={{ marginLeft: "25px" }}>
                    <img
                      src="/assets/images/indexClassicAppTwo/sass.png"
                      className="img-circle mx-auto d-block"
                      alt=""
                      title="Sass"
                      style={{ cursor: "pointer", maxWidth: "40px" }}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-1">
                    <img
                      src="/assets/images/indexClassicAppTwo/html.png"
                      className="img-circle mx-auto d-block"
                      alt=""
                      title="HTML"
                      style={{ cursor: "pointer", maxWidth: "40px" }}
                    />
                  </div>
                  <div className="col-1" style={{ marginLeft: "25px" }}>
                    <img
                      src="/assets/images/indexClassicAppTwo/css.png"
                      className="img-circle mx-auto d-block"
                      alt=""
                      title="CSS"
                      style={{ cursor: "pointer", maxWidth: "40px" }}
                    />
                  </div>
                  <div className="col-1" style={{ marginLeft: "25px" }}>
                    <img
                      src="/assets/images/indexClassicAppTwo/js.png"
                      className="img-circle mx-auto d-block"
                      alt=""
                      title="JS"
                      style={{ cursor: "pointer", maxWidth: "40px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-7 mt-5 pt-5 mt-sm-2 pt-sm-0">
              <div className="classNameic-app-image position-relative">
                <div className="position-relative">
                  <img src="../assets/home_images/indexClassicAppTwo/noisiv.webp" className="img-fluid mx-auto" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="features-absolute">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card border-0 text-center features feature-primary feature-clean course-feature p-4 overflow-hidden shadow h-100">
                      <div className="icons text-center mx-auto">
                        <i className="iconfont d-block rounded h3 mb-0">&#xe6d0;</i>
                      </div>
                      <div className="card-body p-0 mt-4">
                        <a href="javascript:void(0)" className="title h5 text-dark">
                          GrapesJS Intergration
                        </a>
                        <p className="text-muted mt-2">
                          GrapesJS is an exceptional visual builder, which we have integrated into Drupal CMS to enhance site development and streamline the
                          process of building landing pages.{" "}
                        </p>
                        <i className="iconfont full-img">&#xe6d0;</i>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mt-4 pt-2 mt-sm-0 pt-sm-0">
                    <div className="card border-0 text-center features feature-primary feature-clean course-feature p-4 overflow-hidden shadow h-100">
                      <div className="icons text-center mx-auto">
                        <i className="iconfont d-block rounded h3 mb-0">&#xe6cf;</i>
                      </div>
                      <div className="card-body p-0 mt-4">
                        <a href="javascript:void(0)" className="title h5 text-dark">
                          Out-of-box Modules
                        </a>
                        <p className="text-muted mt-2">
                          We have developed numerous pre-packaged Drupal modules to augment both the Drupal API and UI, thereby enabling us to promptly fulfill
                          new demands.{" "}
                        </p>
                        <i className="iconfont full-img">&#xe6cf;</i>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mt-4 pt-2 mt-sm-0 pt-sm-0">
                    <div className="card border-0 text-center features feature-primary feature-clean course-feature p-4 overflow-hidden shadow h-100">
                      <div className="icons text-center mx-auto">
                        <i className="iconfont d-block rounded h3 mb-0">&#xe6d1;</i>
                      </div>
                      <div className="card-body p-0 mt-4">
                        <a href="javascript:void(0)" className="title h5 text-dark">
                          {" "}
                          Open Source Solution
                        </a>
                        <p className="text-muted mt-2">
                          Drupal is an open-source and highly customizable platform, that adheres to Drupal standards, enabling us to build powerful and
                          flexible applications and solutions.
                        </p>
                        <i className="iconfont full-img">&#xe6d1;</i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-5 mt-md-5 pt-3 pt-md-3">
            <div className="col-9 text-center">
              <div className="section-title mb-4 pb-2">
                <span className="badge bg-success rounded-pill mb-2">Development Services</span>
                <h4 className="title mb-4">What development we offer?</h4>
                <p className="text-muted mx-auto mb-0">
                  We offer a comprehensive Drupal development and management, which can be project basis or time basis service.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-4 pt-2">
              <div className="row">
                <div className="col-md-3">
                  <div className="bg-white shadow text-center px-3 h-100">
                    <img src="/assets/images/indexClassicAppTwo/web.svg" className="img-fluid mt-4" style={{ maxWidth: "60px" }} />
                    <p className="fw-bold" style={{ color: "#2a2a49" }}>
                      Drupal Development
                    </p>
                    <p style={{ color: "#94a3b8" }}>Drupal website, headless application, cms or module development.</p>
                  </div>
                </div>
                <div className="col-md-3 mt-4 pt-2 mt-sm-0 pt-sm-0">
                  <div className="bg-white shadow text-center px-3 h-100">
                    <img src="/assets/images/indexClassicAppTwo/drupal9.svg" className="img-fluid mt-4" style={{ maxWidth: "60px" }} />
                    <p className="fw-bold" style={{ color: "#2a2a49" }}>
                      Drupal Migration & Upgrade
                    </p>
                    <p style={{ color: "#94a3b8" }}>Drupal 7/8 to 9/10,upgrade, and other system migration to Drupal.</p>
                  </div>
                </div>
                <div className="col-md-3 mt-4 pt-2 mt-sm-0 pt-sm-0">
                  <div className="bg-white shadow text-center px-3 h-100">
                    <img src="/assets/images/indexClassicAppTwo/security.svg" className="img-fluid mt-4" style={{ maxWidth: "60px" }} />
                    <p className="fw-bold" style={{ color: "#2a2a49" }}>
                      Drupal Maintenance
                    </p>
                    <p style={{ color: "#94a3b8" }}>Drupal maintenance and host management, backup and performance optimization.</p>
                  </div>
                </div>
                <div className="col-md-3 mt-4 pt-2 mt-sm-0 pt-sm-0">
                  <div className=" bg-white shadow text-center px-3 h-100">
                    <img src="/assets/images/indexClassicAppTwo/solution.svg" className="img-fluid mt-4" style={{ maxWidth: "60px" }} />
                    <p className="fw-bold" style={{ color: "#2a2a49" }}>
                      Drupal Consulting Service{" "}
                    </p>
                    <p style={{ color: "#94a3b8" }}>Drupal artchitecture, training, SEO and other consulting services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--end section--> */}
      <section
        className="bg-home d-flex align-items-center background-effect bg-soft-primary section"
        style={{ background: "url('../assets/home_images/saas/home-shape.png') center center", height: "auto" }}
        id="home"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center mt-5 mt-md-5 pt-5 pt-md-5 mb-5">
              <div className="title-heading">
                <h1 className="fw-bold text-dark mb-4">
                  Open Source Web Builder Solution
                  <p className="text-center" style={{ display: "none" }}>
                    <span
                      className="typewrite text-primary"
                      data-period="2000"
                      data-type="[ 'Web Site', 'Online Course', 'Landing Page', 'Campaign Page', 'Data Visualization', 'Admin Dashboard', 'Email Content', 'H5 Page', 'Native Application' ]"
                    >
                      <span className="wrap">Web Portal</span>
                    </span>
                  </p>
                </h1>
                <p className="mx-auto text-muted">
                  Leveraging the power of Drupal CMS and grapesJS builder, we provide an exceptional visualization solution.
                  <br />
                  Our platform allows you to easily manage content and create stunning web pages, h5 pages and more.
                </p>
                <div className="mt-4 pt-2 mb-5">
                  <a href="https://calendly.com/vizcms/meeting" target="_blank" className="btn btn-primary">
                    Start Free Trial <i className="uil uil-angle-right-b"></i>
                  </a>
                </div>
                <div className="video-builder-introduction">
                  <img
                    src="./assets/home_images/builder/header.png"
                    alt=""
                    className="img-fluid mt-4 video-image-background"
                    data-target="video-for-builder-quick"
                    style={{ maxWidth: "80%" }}
                  />

                  <video className="img-fluid rounded" muted autoPlay loop id="video-for-builder-quick" style={{ display: "none" }}>
                    <source src="./assets/home_images/builder/web-builder.mp4" type="video/mp4" />
                    <img src="./assets/home_images/builder/header.png" alt="" className="img-fluid mt-4" style={{ maxWidth: "80%" }} />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-1" data-name="main-features">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-light h-150">
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Quick to Build, Easy to Mainten
                </p>
                <p style={{ color: "#94a3b8;" }}>Easy to build a new page, easy to mainten the webpages via page builder.</p>
                <img className="img-fluid d-block d" src="./assets/home_images/builder/builder-features1.png" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-light h-150">
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Component-oriented Development
                </p>
                <p style={{ color: "#94a3b8" }}>Loose coupling, component-oriented, simplify and reusability.</p>
                <img className="img-fluid d-block" src="./assets/home_images/builder/builder-features2.png" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-light h-150">
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Reusable Templates
                </p>
                <p style={{ color: "#94a3b8" }}>Quickly start to build a new landing page from existing templates.</p>
                <img className="img-fluid d-block" src="./assets/home_images/builder/builder-features3.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title pb-2">
                <h4 className="title mb-4">Features</h4>
                <p className="text-muted mx-auto mb-0">
                  GrapesJS is not another page/HTML builder, which allows you to easily create a drag & drop enabled builder of "anythings", such as
                  newsletters, mobile app, native desktop app, PDF and etc.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-white h-100">
                <i className="iconfont d-block rounded mb-0 text-primary" style={{ fontSize: "60px" }}>
                  &#xe6eb;
                </i>
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Visualization
                </p>
                <p style={{ color: "#94a3b8", fontSize: "small", textAlign: "left" }}>
                  Powerful visualization, wysiwyg, drag-drop, rich-editor, inline-editing, slideshow, vidoes and audios, etc.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-white h-100">
                <i className="iconfont d-block rounded mb-0 text-primary" style={{ fontSize: "60px" }}>
                  &#xe6e2;
                </i>

                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Assets management
                </p>
                <p style={{ color: "#94a3b8", fontSize: "small", textAlign: "left" }}>
                  We integrated GrapesJS's assets manager with Drupal media libray, so that we can use assets in builder and save them in CMS.{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-white h-100">
                <i className="iconfont d-block rounded mb-0 text-primary py-3" style={{ fontSize: "38px" }}>
                  &#xe6ec;
                </i>
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Responsive
                </p>
                <p style={{ color: "#94a3b8", fontSize: "small", textAlign: "left" }}>
                  GrapesJS supports mobile and responsive layouts inside, which let you create responsive page easily.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-white h-100">
                <i className="iconfont d-block rounded mb-0 text-primary py-3" style={{ fontSize: "38px" }}>
                  &#xe6fc;
                </i>
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Component Oriented
                </p>
                <p style={{ color: "#94a3b8", fontSize: "small", textAlign: "left" }}>
                  Components are designed for reusability, and for new features, just develop new components.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-white h-100">
                <i className="iconfont d-block rounded mb-0 text-primary" style={{ fontSize: "60px" }}>
                  &#xe6e5;
                </i>
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Customizable Builder Theme
                </p>
                <p style={{ color: "#94a3b8", fontSize: "small", textAlign: "left" }}>GrapesJS builder can be customized to suit your requirements.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-white h-100">
                <i className="iconfont d-block rounded mb-0 text-primary py-3" style={{ fontSize: "38px" }}>
                  &#xe706;
                </i>
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Documentation
                </p>
                <p style={{ color: "#94a3b8", fontSize: "small", textAlign: "left" }}>
                  GrapesJS is an open source project in github, which has 1.8k watchers and more contribed <a href="https://grapesjs.com/docs/">documents</a>.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-white h-100">
                <i className="iconfont d-block rounded mb-0 text-primary py-3" style={{ fontSize: "38px" }}>
                  &#xe6d7;
                </i>
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  Open Platform
                </p>
                <p style={{ color: "#94a3b8", fontSize: "small", textAlign: "left" }}>
                  GrapesJS is an open platform for your customizations, which can be used to webpage, newsletter, apps, and more.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2 text-center">
              <div className="features feature-primary key-feature align-items-center p-3 rounded shadow bg-white h-100">
                <i className="iconfont d-block rounded mb-0 text-primary py-3" style={{ fontSize: "38px" }}>
                  &#xe707;
                </i>
                <p className="fw-bold" style={{ color: "#2a2a49" }}>
                  CMS Integrated
                </p>
                <p style={{ color: "#94a3b8", fontSize: "small", textAlign: "left" }}>
                  We have integrated GrapesJS with Drupal, so that we can provide a robust solution for CMS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <img src="./assets/home_images/builder/programming.png" className="img-fluid" alt="" />
            </div>

            <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ms-lg-5">
                <h4 className="title mb-4">Component Oriented Programming</h4>
                <p className="text-muted">
                  Components are designed for reusability and decoupling, making development and maintenance a breeze. When it comes to adding new features,
                  what you need is just developing new components.
                </p>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <span className="text-primary h5 me-2">
                          <i className="uil uil-check-circle align-middle"></i>
                        </span>
                        Loose Coupling
                      </td>
                      <td>
                        <span className="text-primary h5 me-2">
                          <i className="uil uil-check-circle align-middle"></i>
                        </span>
                        Reusability
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-primary h5 me-2">
                          <i className="uil uil-check-circle align-middle"></i>
                        </span>
                        Easy Developement
                      </td>
                      <td>
                        <span className="text-primary h5 me-2">
                          <i className="uil uil-check-circle align-middle"></i>
                        </span>
                        Easy Maintenance
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-primary h5 me-2">
                          <i className="uil uil-check-circle align-middle"></i>
                        </span>
                        Component Library
                      </td>
                      <td>
                        <span className="text-primary h5 me-2">
                          <i className="uil uil-check-circle align-middle"></i>
                        </span>
                        Page Templates
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light" data-name="component-library">
        <div className="container mt-10">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="section-title sticky-bar position-sticky">
                <span className="badge rounded-pill bg-soft-primary">Components</span>
                <h4 className="title mt-3 mb-4">Component libray</h4>
                <p className="text-muted para-desc mb-0">
                  A wide selection of out-of-the-box components to enhance your website building. Additionally, we can provide customized components that are
                  tailored to fit your project perfectly.
                </p>
                <div className="mt-4 d-none d-md-block">
                  <a href="javascript:void(0)" className="btn btn-soft-primary">
                    See More <i data-feather="arrow-right" className="fea icon-sm"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="row">
                <div className="col-12 filters-group-wrap">
                  <div className="filters-group">
                    <ul className="container-filter list-inline mb-0 filter-options">
                      <li
                        className={`list-inline-item categories-name border text-dark rounded ${activeFilter === "all" ? "active" : ""}`}
                        onClick={() => handleFilterChange("all")}
                      >
                        All
                      </li>
                      <li
                        className={`list-inline-item categories-name border text-dark rounded ${activeFilter === "basic" ? "active" : ""}`}
                        onClick={() => handleFilterChange("basic")}
                      >
                        Basic
                      </li>
                      <li
                        className={`list-inline-item categories-name border text-dark rounded ${activeFilter === "slide" ? "active" : ""}`}
                        onClick={() => handleFilterChange("slide")}
                      >
                        Slides
                      </li>
                      <li
                        className={`list-inline-item categories-name border text-dark rounded ${activeFilter === "image" ? "active" : ""}`}
                        onClick={() => handleFilterChange("image")}
                      >
                        Image & Text
                      </li>
                      <li
                        className={`list-inline-item categories-name border text-dark rounded ${activeFilter === "dynamic" ? "active" : ""}`}
                        onClick={() => handleFilterChange("dynamic")}
                      >
                        Dynamic Content
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="grid" className="row">
                {items
                  .filter((item) => activeFilter === "all" || item.group === activeFilter)
                  .map((item) => (
                    <div key={item.id} className="col-lg-4 col-12 mt-3 pt-2 mb-1 picture-item">
                      <div className="card border-0 work-container work-primary work-classic shadow overflow-hidden">
                        <div className="card-body p-0">
                          <img src={item.img} className="img-fluid work-image" alt={item.title} />
                          <div className="content p-4">
                            <h5 className="mb-0">{item.title}</h5>
                            <h6 className="text-muted tag mb-0">{item.group}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-10" data-name="video-show">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="video-solution-cta position-relative" style={{ zIndex: "1" }}>
                <div className="position-relative">
                  <img src="./assets/home_images/builder/video-background.png" className="img-fluid rounded-md shadow-lg" alt="" />
                  <div className="play-icon">
                    <a href="./assets/home_images/builder/builder-tour.mp4" data-type="youtube" data-id="d08Qiw5oGhw" className="play-btn lightbox border-0">
                      <i className="mdi mdi-play text-primary rounded-circle shadow-lg"></i>
                    </a>
                  </div>
                </div>
                <div className="content mt-md-4 pt-md-2">
                  <div className="row justify-content-center">
                    <div className="col-lg-10 text-center">
                      <div className="row align-items-center">
                        <div className="col-md-6 mt-4 pt-2">
                          <div className="section-title text-md-start">
                            <h6 className="text-white-50">Quick to start</h6>
                            <h4 className="title text-white title-dark mb-0">Watch our tour video</h4>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 mt-4 pt-md-2">
                          <div className="section-title text-md-start">
                            <p className="text-white-50 para-desc">Start working with our vizcms to generate awareness, drive traffic, connect.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-posts-placeholder bg-primary bg-gradient"></div>
        </div>
      </section>

      <section className="container mt-100 mt-60 mb-5 pb-5" data-name="tech-diagram">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="section-title mb-4 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
              <h4 className="title mb-4">Technical Diagram</h4>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-12 mt-4 pt-3 text-center">
            <ul
              className="nav nav-pills nav-justified flex-column flex-sm-row rounded bg-light wow animate__animated animate__fadeInUp"
              data-wow-delay=".3s"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link rounded active"
                  id="community-tab"
                  data-bs-toggle="pill"
                  href="#pills-community"
                  role="tab"
                  aria-controls="pills-community"
                  aria-selected="false"
                >
                  <div className="text-center py-2">
                    <h6 className="mb-0">Architecture</h6>
                  </div>
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link rounded"
                  id="selfservice-tab"
                  data-bs-toggle="pill"
                  href="#pills-self"
                  role="tab"
                  aria-controls="pills-self"
                  aria-selected="false"
                >
                  <div className="text-center py-2">
                    <h6 className="mb-0">Component-oriented</h6>
                  </div>
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link rounded"
                  id="teamwork-tab"
                  data-bs-toggle="pill"
                  href="#pills-teamwork"
                  role="tab"
                  aria-controls="pills-teamwork"
                  aria-selected="false"
                >
                  <div className="text-center py-2">
                    <h6 className="mb-0">SDK & API</h6>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mt-4 pt-2">
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-community" role="tabpanel" aria-labelledby="community-tab">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                      <img src="./assets/home_images/builder/builder-arch.png" className="img-fluid mx-auto d-block shadow rounded" alt="" />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <div className="section-title ms-md-4 wow animate__animated animate__fadeInUp" data-wow-delay=".7s">
                      <h4 className="title mb-4">Architecture & Data Flow</h4>
                      <p className="text-muted">
                        With our foundation built on Drupal CMS, we offer a comprehensive content management system that allows you to generate
                        component-composed webpages. Moreover, our system seamlessly outputs APIs, enabling effortless integration with other systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="pills-self" role="tabpanel" aria-labelledby="selfservice-tab">
                <div className="row align-items-center">
                  <div className="col-md-6 order-2 order-md-1 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <div className="section-title me-md-4 wow animate__animated animate__fadeInUp" data-wow-delay=".7s">
                      <h4 className="title mb-4">Component-oriented Programming</h4>
                      <p className="text-muted">
                        By utilizing the Drupal API and GrapesJS components, all you need to do is build new components to align with your desired features,
                        such as maps, search functionality, lists, and more. Furthermore, for commonly used components, they can be easily reused in the future.
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6 order-1 order-md-2">
                    <div className="wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                      <img src="./assets/home_images/builder/builder-component.png" className="img-fluid mx-auto d-block shadow rounded" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="pills-teamwork" role="tabpanel" aria-labelledby="teamwork-tab">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                      <img src="./assets/home_images/builder/builder-sdk.png" className="img-fluid mx-auto d-block shadow rounded" alt="" />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <div className="section-title ms-md-4 wow animate__animated animate__fadeInUp" data-wow-delay=".7s">
                      <h4 className="title mb-4">SDK & API</h4>
                      <p className="text-muted">
                        Simplify the process of defining and implementing features for a new component by your own code that is not tied to any specific project
                        or Drupal environment. The component will be discovered dyanmically and can be migrateed from dev to uat and prod easily.
                        <br />
                        For the web component, that is developed using standard Twig code, making it easily accessible for front-end engineers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6 order-2 order-md-1 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title me-lg-5">
                <h4 className="title mb-4">Building Anything, Output Any Code</h4>
                <p className="text-muted">
                  GrapesJS is a multi-purpose, Web Builder Framework, which means it allows you to easily create a drag & drop enabled builder of "things". By
                  "things" we mean anything with HTML-like structure, which entails much more than web pages. We use HTML-like structure basically everywhere:
                  Newsletters (MJML), Native Mobile Applications (React Native), Native Desktop Applications (Vuido), PDFs (React PDF ), etc.
                </p>
              </div>
            </div>

            <div className="col-lg-5 col-md-6 order-1 order-md-2">
              <img src="./assets/home_images/builder/grapes-compiler.en.png" className="img-fluid d-block" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6 order-1 order-md-1">
              <img src="./assets/home_images/builder/API.png" className="img-fluid d-block" alt="" />
            </div>
            <div className="col-lg-7 col-md-6 order-2 order-md-2 mt-4 mt-sm-0 pt-2 pt-sm-0 px-3">
              <div className="section-title me-lg-5">
                <h4 className="title mb-4">Powerful API, Connecting Everything</h4>
                <p className="text-muted">
                  GrapesJS is designed for open architecture, which means it is easy to customize and easy to adapt your requirements.
                </p>
                <p className="text-muted">We have integrated it with Drupal CMS, so that it is a best solution for your visualized CMS.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container pb-lg-4 mb-md-5 mb-4">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title">
                <h4 className="title mb-4">Prefer To Meet Sooner?</h4>
                <p className="text-muted para-desc mx-auto mb-0">
                  Want to learn more on how we can help your business grow with GrapesJS ? The fastest way to get your questions answered is to schedule a call
                  directly with one of our consultants.
                </p>
                <div className="mt-4">
                  <a href="https://calendly.com/vizcms/meeting" target="_blank" className="btn btn-primary mt-2 me-2">
                    Let's schedule a call
                  </a>
                  <a href="https://grapesjs.com/demo.html" className="btn btn-outline-primary mt-2">
                    HTML Demo
                  </a>
                  <a href="https://grapesjs.com/demo-newsletter-editor.html" className="btn btn-outline-primary mt-2">
                    Newsletter Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title mb-4 pb-2">
                <h4 className="title mb-4">Contact us</h4>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card border-0 text-center features feature-primary feature-clean">
                <div className="icons text-center mx-auto">
                  <i className="iconfont d-block rounded mb-0">&#xe6d2;</i>
                </div>
                <div className="content mt-4">
                  <h5 className="fw-bold fs-20">Tel/Wechat</h5>
                  <p className="text-muted">Please consult our technical director for expert guidance.</p>
                  <a href="tel:+86 18610256090" className="read-more">
                    +86 18610256090
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="card border-0 text-center features feature-primary feature-clean">
                <div className="icons text-center mx-auto">
                  <i className="iconfont d-block rounded mb-0">&#xe6d4;</i>
                </div>
                <div className="content mt-4">
                  <h5 className="fw-bold fs-20">Email</h5>
                  <p className="text-muted">Please email us to send your any development inquires.</p>
                  <a href="#" className="read-more">
                    robbin.joe@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="card border-0 text-center features feature-primary feature-clean">
                <div className="icons text-center mx-auto">
                  <i className="iconfont d-block rounded mb-0">&#xe6d3;</i>
                </div>
                <div className="content mt-4">
                  <h5 className="fw-bold fs-20">Location</h5>
                  <p className="text-muted">No. Seven Creative Park, Yuangang Avenue #10, Guangzhou</p>
                  <a href="https://j.map.baidu.com/5e/7_6h" data-type="iframe" className="video-play-icon text-primary lightbox">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="fea icon-sm icons text-success feather feather-map-pin"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Baidu Map
                  </a>
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/7%E5%8F%B7%E5%B0%8F%E9%95%87/@36.797973,117.8519577,17z/data=!3m1!4b1!4m6!3m5!1s0x35ea615d8ab2bb55:0x1fd2ebc99108e08!8m2!3d36.797973!4d117.854538!16s%2Fg%2F11b6vnfhz8?entry=tts&amp;shorturl=1"
                    className="video-play-icon text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="fea icon-sm icons text-success feather feather-map-pin"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Google Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sections;
