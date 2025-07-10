import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/libs/tiny-slider/tiny-slider.css";
import "../../../assets/libs/@iconscout/unicons/css/line.css";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const [isSubmenuUserOpen, setSubmenuUserOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isSticky = window.scrollY >= 50;
      setIsSticky(isSticky);
    };

    // Add the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!isSubmenuOpen);
  };

  const toggleSubmenuUser = () => {
    setSubmenuUserOpen(!isSubmenuUserOpen);
  };

  return (
    <header id="topnav" className={`defaultscroll sticky ${isSticky ? "nav-sticky" : ""}`}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link className="logo" to="/">
          {/*   <img src="./assets/home_images/logo-dark.svg" style={{ height: "24px" }} className="logo-light-mode" alt="" />
          <img src="./assets/home_images/logo-light.svg" style={{ height: "24px" }} className="logo-dark-mode" alt="" /> */}
          <img src="./assets/home_images/logo.png" style={{ height: "44px" }} className="logo-light-mode" alt="" />
        </Link>
        <div className="menu-extras">
          <div className="menu-item">
            <button id="isToggle" onClick={toggleMenu} className={`navbar-toggle ${isMenuOpen ? "open" : ""}`}>
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
        <div id="navigation" style={{ display: isMenuOpen ? "block" : "none" }}>
          <ul className="navigation-menu nav-light">
            <li>
              <a href="/home" className="sub-menu-item">
                Home
              </a>
            </li>
            <li className="has-submenu parent-parent-menu-item">
              <a href="#">CMS Services</a>
              <span className="menu-arrow"></span>
              <ul className="submenu megamenu bg-light shadow-md">
                <div className="d-flex">
                  <li>
                    <ul>
                      <li style={{ listStyleType: "none" }}>
                        <a href="drupal.html" className="sub-menu-item p-3">
                          <div>
                            <span className="d-none d-lg-block text-lg-center">
                              <img
                                src="./assets/home_images/header/development.png"
                                className="img-fluid rounded shadow-md"
                                alt="Drupal Development"
                                style={{ minWidth: "120px", width: "90%" }}
                              />
                            </span>
                            <span className="mt-lg-2 d-block text-lg-center" style={{ fontWeight: "bold", textDecoration: "underline" }}>
                              Drupal Development
                            </span>
                          </div>
                        </a>
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <a href="drupal-upgrade.html" className="sub-menu-item p-3">
                          <div>
                            <span className="d-none d-lg-block text-lg-center">
                              <img
                                src="./assets/home_images/header/upgrade.png"
                                className="img-fluid rounded shadow-md"
                                alt="Drupal upgrade"
                                style={{ minWidth: "120px", width: "90%" }}
                              />
                            </span>
                            <span className="mt-lg-2 d-block text-lg-center" style={{ fontWeight: "bold", textDecoration: "underline" }}>
                              Drupal Upgrade
                            </span>
                          </div>
                        </a>
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <a href="drupal-cases.html" className="sub-menu-item p-3">
                          <div>
                            <span className="d-none d-lg-block text-lg-center">
                              <img
                                src="./assets/home_images/header/cms-cases-menu.png"
                                className="img-fluid rounded shadow-md"
                                alt="Drupal cases"
                                style={{ minWidth: "120px", width: "90%" }}
                              />
                            </span>
                            <span className="mt-lg-2 d-block text-lg-center" style={{ fontWeight: "bolder", textDecoration: "underline" }}>
                              Drupal Cases
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="feature flex-1 p-2 bg-white rounded" style={{ marginRight: "12px" }}>
                    <label className="text-muted" style={{ marginLeft: "8px" }}>
                      Features
                    </label>
                    <table className="table table-borderless" style={{ fontSize: "14px" }}>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex">
                              <i className="iconfont me-2 flex-1 text-primary" style={{ fontSize: "16px" }}>
                                &#xe6f7;
                              </i>
                              <div>
                                <span style={{ fontSize: "14px", fontWeight: "bold" }}>Multiple Languages & Multiple Sites</span>
                                <span className="mt-lg-2 d-block text-wrap text-muted">
                                  Drupal is the best CMS for glocalized websites, as it enables seamless translation for both the interface and content, and
                                  accommodates multiple sites in one codebase.
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <i className="iconfont me-2 flex-1 text-primary" style={{ fontSize: "16px" }}>
                                &#xe6f8;
                              </i>
                              <div>
                                <span style={{ fontSize: "14px", fontWeight: "bold" }}>Flexible Content Type & Category Management</span>
                                <span className="mt-lg-2 d-block text-wrap text-muted">
                                  Drupal's entity architecture enables the creation of diverse content types, including but not limited to news, books, and
                                  courses, without coding.{" "}
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex">
                              <i className="iconfont me-2 flex-1 text-primary" style={{ fontSize: "16px" }}>
                                &#xe6fa;
                              </i>
                              <div>
                                <span style={{ fontSize: "14px", fontWeight: "bold" }}>Content Moderation & Configurable Workflow</span>
                                <span className="mt-lg-2 d-block text-wrap text-muted">
                                  Drupal facilitates content publishing workflows for various roles, enabling you to review modifications in each revision and
                                  revert them to their prior state.
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <i className="iconfont me-2 flex-1 text-primary" style={{ fontSize: "16px" }}>
                                &#xe70a;
                              </i>
                              <div>
                                <span style={{ fontSize: "14px", fontWeight: "bold" }}>Visual Page Builder & Form Builder</span>
                                <span className="mt-lg-2 d-block text-wrap text-muted">
                                  Base on GrapesJS, we integrated the most powerful page builder into Drupal, Moreover integrated a pretty simple form builder
                                  for your surveys, enroll and questionaries.
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex">
                              <i className="iconfont me-2 flex-1 text-primary" style={{ fontSize: "16px" }}>
                                &#xe6fb;
                              </i>
                              <div>
                                <span style={{ fontSize: "14px", fontWeight: "bold" }}>Visuable Media Library Management</span>
                                <span className="mt-lg-2 d-block text-wrap text-muted">
                                  Drupal has the capability to handle all media assets. Furthermore, we have developed an visualized media library to augment
                                  its functionality.{" "}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <i className="iconfont me-2 flex-1 text-primary" style={{ fontSize: "16px" }}>
                                &#xe6fc;
                              </i>
                              <div>
                                <span style={{ fontSize: "14px", fontWeight: "bold" }}>SEO & Structure Data Management</span>
                                <span className="mt-lg-2 d-block text-wrap text-muted">
                                  Drupal has many some great modules to improve the SEO performance, from meta tags to XMLSitemap, Moreover Drupal has powerful
                                  modules on structed data and Opengraph.
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex">
                              <i className="iconfont me-2 flex-1 text-primary" style={{ fontSize: "16px" }}>
                                &#xe6f9;
                              </i>
                              <div>
                                <span style={{ fontWeight: "bold" }}>Customer Data Process & Personalization</span>
                                <span className="mt-lg-2 d-block text-wrap text-muted">
                                  Drupal has the capability to integrate with many analysis platforms, and we've integrated Google Analytics and Matomo to
                                  process and personalize customer data.
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <i className="iconfont me-2 flex-1 text-primary" style={{ fontSize: "16px" }}>
                                &#xe70b;
                              </i>
                              <div>
                                <span style={{ fontSize: "14px", fontWeight: "bold" }}>Powerful Fulltext Search with Solr and Elastic Search</span>
                                <span className="mt-lg-2 d-block text-wrap text-muted">
                                  Drupal offers a search API that can leverage the Solr or ElasticSearch engines to facilitate comprehensive full-text search
                                  capabilities.
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                </div>
              </ul>
            </li>

            <li className="has-submenu parent-parent-menu-item">
              <a href="#">Products</a>
              <span className="menu-arrow"></span>
              <ul className="submenu megamenu bg-light shadow-md">
                <div className="row">
                  <div className="col-md-3 mt-2">
                    <ul className="nav nav-pills nav-justified flex-column p-3 mb-0 sticky-bar" id="pills-tab" role="tablist">
                      <label className="feature text-muted" style={{ marginLeft: "20px" }}>
                        Applications
                      </label>
                      <li className="nav-item mt-2">
                        <a
                          className={`nav-link rounded ${activeTab === "dashboard" ? "active" : ""}`}
                          id="dashboard"
                          data-bs-toggle="pill"
                          href="#web"
                          role="tab"
                          aria-controls="web"
                          aria-selected="false"
                          onClick={() => handleTabClick("dashboard")}
                        >
                          <div className="text-start d-flex align-items-center py-1">
                            <h5 className="mb-0" style={{ fontSize: "12px" }}>
                              <i className="iconfont me-2" style={{ fontSize: "12px" }}>
                                &#xe6ed;
                              </i>{" "}
                              Web Page Builder
                            </h5>
                          </div>
                        </a>
                      </li>

                      <li className="nav-item mt-2">
                        <a
                          className={`nav-link rounded ${activeTab === "timeline" ? "active" : ""}`}
                          id="timeline"
                          data-bs-toggle="pill"
                          href="#h5"
                          role="tab"
                          aria-controls="h5"
                          aria-selected="false"
                          onClick={() => handleTabClick("timeline")}
                        >
                          <div className="text-start d-flex align-items-center py-1">
                            <h5 className="mb-0" style={{ fontSize: "12px" }}>
                              <i className="iconfont me-2" style={{ fontSize: "12px" }}>
                                &#xe6ec;
                              </i>{" "}
                              H5 Page Builder
                            </h5>
                          </div>
                        </a>
                      </li>

                      <li className="nav-item mt-2">
                        <a
                          className={`nav-link rounded ${activeTab === "fileintegrate" ? "active" : ""}`}
                          id="fileintegrate"
                          data-bs-toggle="pill"
                          href="#panorama"
                          role="tab"
                          aria-controls="panorama"
                          aria-selected="false"
                          onClick={() => handleTabClick("fileintegrate")}
                        >
                          <div className="text-start d-flex align-items-center py-1">
                            <h5 className="mb-0" style={{ fontSize: "12px" }}>
                              <i className="iconfont me-2" style={{ fontSize: "12px" }}>
                                &#xe6fe;
                              </i>
                              720VR Builder
                            </h5>
                          </div>
                        </a>
                      </li>

                      <li className="nav-item mt-2">
                        <a
                          className={`nav-link rounded ${activeTab === "fileintegrate_1" ? "active" : ""}`}
                          id="fileintegrate"
                          data-bs-toggle="pill"
                          href="#form"
                          role="tab"
                          aria-controls="form"
                          aria-selected="false"
                          onClick={() => handleTabClick("fileintegrate_1")}
                        >
                          <div className="text-start d-flex align-items-center py-1">
                            <h5 className="mb-0" style={{ fontSize: "12px" }}>
                              <i className="iconfont me-2" style={{ fontSize: "12px" }}>
                                &#xe6ee;
                              </i>
                              Form Builder
                            </h5>
                          </div>
                        </a>
                      </li>

                      <li className="nav-item mt-2">
                        <a
                          className={`nav-link rounded ${activeTab === "fileintegrate_2" ? "active" : ""}`}
                          id="fileintegrate"
                          data-bs-toggle="pill"
                          href="#exhibit"
                          role="tab"
                          aria-controls="exhibit"
                          aria-selected="false"
                          onClick={() => handleTabClick("fileintegrate_2")}
                        >
                          <div className="text-start d-flex align-items-center py-1">
                            <h5 className="mb-0" style={{ fontSize: "12px" }}>
                              <i className="iconfont me-2" style={{ fontSize: "12px" }}>
                                &#xe6ef;
                              </i>
                              2.5D Exhibit Builder
                            </h5>
                          </div>
                        </a>
                      </li>

                      <li className="nav-item mt-2">
                        <a
                          className={`nav-link rounded ${activeTab === "fileintegrate_3" ? "active" : ""}`}
                          id="fileintegrate"
                          data-bs-toggle="pill"
                          href="#BBS"
                          role="tab"
                          aria-controls="BBS"
                          aria-selected="false"
                          onClick={() => handleTabClick("fileintegrate_3")}
                        >
                          <div className="text-start d-flex align-items-center py-1">
                            <h5 className="mb-0" style={{ fontSize: "12px" }}>
                              <i className="iconfont me-2" style={{ fontSize: "12px" }}>
                                &#xe708;
                              </i>
                              Forum & BBS System
                            </h5>
                          </div>
                        </a>
                      </li>

                      <li className="nav-item mt-2">
                        <a
                          className={`nav-link rounded ${activeTab === "fileintegrate_4" ? "active" : ""}`}
                          id="fileintegrate"
                          data-bs-toggle="pill"
                          href="#management"
                          role="tab"
                          aria-controls="management"
                          aria-selected="false"
                          onClick={() => handleTabClick("fileintegrate_4")}
                        >
                          <div className="text-start d-flex align-items-center py-1">
                            <h5 className="mb-0" style={{ fontSize: "12px" }}>
                              <i className="iconfont me-2" style={{ fontSize: "12px" }}>
                                &#xe709;
                              </i>
                              Image Management System
                            </h5>
                          </div>
                        </a>
                      </li>

                      <li className="nav-item mt-2">
                        <a
                          className={`nav-link rounded ${activeTab === "fileintegrate_5" ? "active" : ""}`}
                          id="fileintegrate"
                          data-bs-toggle="pill"
                          href="#learning"
                          role="tab"
                          aria-controls="learning"
                          aria-selected="false"
                          onClick={() => handleTabClick("fileintegrate_5")}
                        >
                          <div className="text-start d-flex align-items-center py-1">
                            <h5 className="mb-0" style={{ fontSize: "12px" }}>
                              <i className="iconfont me-2" style={{ fontSize: "12px" }}>
                                &#xe6f0;
                              </i>
                              Learning Management System
                            </h5>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="feature col-md-9 col-12 mt-1 px-4">
                    <div className="tab-content ms-lg-5 bg-white" id="pills-tabContent">
                      <div
                        className={`tab-pane fade p-5 rounded shadow ${activeTab === "dashboard" ? "active show" : ""}`}
                        id="web"
                        role="tabpanel"
                        aria-labelledby="web"
                      >
                        <div className="d-flex">
                          <h5>Visual Page Builder</h5>
                          <a href="builder.html" className="text-end flex-1">
                            View More<i className="uil uil-angle-right-b"></i>
                          </a>
                        </div>
                        <p className="text-wrap">
                          With the combination of the best page builder, GrapesJS and Drupal CMS, we provide a simple way to build and deploy your website
                          effectlessly.
                        </p>
                        <img src="./assets/home_images/indexClassicAppTwo/web.png" className="img-fluid rounded d-block mt-4 shadow" alt="" />
                      </div>

                      <div
                        className={`tab-pane fade p-5 rounded shadow ${activeTab === "timeline" ? "active show" : ""}`}
                        id="h5"
                        role="tabpanel"
                        aria-labelledby="h5"
                      >
                        <div className="d-flex">
                          <h5>Visual H5 Page Builder</h5>
                          <a href="h5.html" className="text-end flex-1">
                            View More<i className="uil uil-angle-right-b"></i>
                          </a>
                        </div>
                        <p className="text-wrap">Base on H5 builder, you can build your own h5 pages and preview them quickly.</p>
                        <img src="./assets/home_images/indexClassicAppTwo/h5Page.jpg" className="img-fluid rounded d-block mt-4 shadow" alt="" />
                      </div>

                      <div
                        className={`tab-pane fade p-5 rounded shadow ${activeTab === "fileintegrate" ? "active show" : ""}`}
                        id="exhibit"
                        role="tabpanel"
                        aria-labelledby="exhibit"
                      >
                        <div className="d-flex">
                          <h5>2.5D Exhibit Builder</h5>
                          <a href="exhibit.html" className="text-end flex-1">
                            View More<i className="uil uil-angle-right-b"></i>
                          </a>
                        </div>
                        <p className="text-wrap">
                          Based on Phaser 2D, we have developed a 2.5D online exhibit builder that enables users to effortlessly create online exhibits.
                        </p>
                        <img src="./assets/home_images/indexClassicAppTwo/2.5DExhibitHuilder.jpg" className="img-fluid rounded d-block mt-4 shadow" alt="" />
                      </div>

                      <div
                        className={`tab-pane fade p-5 rounded shadow ${activeTab === "fileintegrate_1" ? "active show" : ""}`}
                        id="form"
                        role="tabpanel"
                        aria-labelledby="form"
                      >
                        <div className="d-flex">
                          <h5>Form Builder</h5>
                          <a href="form.html" className="text-end flex-1">
                            View More<i className="uil uil-angle-right-b"></i>
                          </a>
                        </div>
                        <p className="text-wrap">
                          We have created an efficient form builder that utilizes the Drupal webform module to manage both the structure and data of forms.{" "}
                        </p>
                        <img src="./assets/home_images/indexClassicAppTwo/page.png" className="img-fluid rounded d-block mt-4 shadow" alt="" />
                      </div>

                      <div
                        className={`tab-pane fade p-5 rounded shadow ${activeTab === "fileintegrate_2" ? "active show" : ""}`}
                        id="panorama"
                        role="tabpanel"
                        aria-labelledby="panorama"
                      >
                        <div className="d-flex">
                          <h5>Panorama 720VR Builder</h5>
                          <a href="vr.html" className="text-end flex-1">
                            View More<i className="uil uil-angle-right-b"></i>
                          </a>
                        </div>
                        <p className="text-wrap">
                          You can effortlessly construct a 720-degree panoramic virtual reality experience that incorporates audio and video elements, hotspots,
                          3D visuals, and multiple scenes to provide user guidance.{" "}
                        </p>
                        <img src="./assets/home_images/indexClassicAppTwo/720.jpeg" className="img-fluid rounded d-block mt-4 shadow" alt="" />
                      </div>

                      <div
                        className={`tab-pane fade p-5 rounded shadow ${activeTab === "fileintegrate_3" ? "active show" : ""}`}
                        id="management"
                        role="tabpanel"
                        aria-labelledby="management"
                      >
                        <div className="d-flex">
                          <h5>Image Library System</h5>
                          <a href="image.html" className="text-end flex-1">
                            View More<i className="uil uil-angle-right-b"></i>
                          </a>
                        </div>
                        <p className="text-wrap">
                          Based on Drupal's image management capabilities, we built an online image management system, which includes images & galleries, image
                          hotspots and the metadata for them.
                        </p>
                        <img src="./assets/home_images/indexClassicAppTwo/management.png" className="img-fluid rounded d-block mt-4 shadow" alt="" />
                      </div>

                      <div
                        className={`tab-pane fade p-5 rounded shadow ${activeTab === "fileintegrate_4" ? "active show" : ""}`}
                        id="BBS"
                        role="tabpanel"
                        aria-labelledby="BBS"
                      >
                        <div className="d-flex">
                          <h5>Forum & BBS System</h5>
                          <a href="bbs.html" className="text-end flex-1">
                            View More<i className="uil uil-angle-right-b"></i>
                          </a>
                        </div>
                        <p className="text-wrap">
                          Based on Drupal content management capabilities, we built an online forum system, which includes topics, replies, favorite and user
                          information.{" "}
                        </p>
                        <img src="./assets/home_images/indexClassicAppTwo/forum.png" className="img-fluid rounded d-block mt-4 shadow" alt="" />
                      </div>

                      <div
                        className={`tab-pane fade p-5 rounded shadow ${activeTab === "fileintegrate_5" ? "active show" : ""}`}
                        id="learning"
                        role="tabpanel"
                        aria-labelledby="learning"
                      >
                        <div className="d-flex">
                          <h5>Learning and Video Management System (LMS)</h5>
                          <a href="lms.html" className="text-end flex-1">
                            View More<i className="uil uil-angle-right-b"></i>
                          </a>
                        </div>
                        <p className="text-wrap">
                          We built an online learning system base on Drupal's content management capabilities, which includes videos, documents, and forms for
                          learning, test and exam.
                        </p>
                        <img src="./assets/home_images/indexClassicAppTwo/lms.png" className="img-fluid rounded d-block mt-4 shadow" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <a href="about.html" className="sub-menu-item">
                About
              </a>
            </li>
          </ul>
        </div>
        <ul className="buy-button list-inline mb-0">
          <li className="list-inline-item sidebar-icon mb-0 feature">
            <a href="contact.html" data-toggle="modal" data-target="#productview">
              <div className="text-request me-2" style={{ fontWeight: "bold" }}>
                Request a demo
              </div>
            </a>
          </li>
          <li className="list-inline-item sidebar-icon position-relative">
            <div id="langSwitcher" onClick={toggleSubmenu} className="btn btn-icon font-emoji">
              🇺🇸
            </div>
            {isSubmenuOpen && (
              <ul id="langSwitcherContainer" className="position-absolute list-unstyled bg-white rounded px-3 py-2">
                <li>
                  <a href="/" data-lang="ua-uk" className="font-emoji">
                    🇺🇦 UA
                  </a>
                </li>
                <li>
                  <a href="/" data-lang="en" className="font-emoji">
                    🇺🇸 English
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="list-inline-item sidebar-icon position-relative">
            <div onClick={toggleSubmenuUser} className="btn btn-icon btn-soft-primary">
              <i className="mdi mdi-account-outline mdi-18px"></i>
            </div>
            {isSubmenuUserOpen && (
              <ul id="langSwitcherContainer" className="position-absolute list-unstyled bg-white rounded px-3 py-2">
                <li>
                  <Link to="/login" className="font-emoji">
                    Login
                  </Link>
                </li>

                <li>
                  <Link to="/register" className="font-emoji">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
