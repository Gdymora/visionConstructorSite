export const source = `    <!-- ====== Navbar Section Start -->
<header
  x-data="
    {
      navbarOpen: false,
    }
  "
  class="absolute left-0 top-0 z-50 w-full"
>
  <div class="container mx-auto">
    <div class="relative -mx-4 flex items-center justify-between">
      <div class="w-60 max-w-full px-4">
        <a href="javascript:void(0)" class="block w-full py-5">
          <img
            src="../../assets/images/logo/logo.svg"
            alt="logo"
            class="block w-full dark:hidden"
          />
          <img
            src="../../assets/images/logo/logo-white.svg"
            alt="logo"
            class="hidden w-full dark:block"
          />
        </a>
      </div>
      <div class="flex w-full items-center justify-between px-4">
        <div>
          <button
            @click="navbarOpen = !navbarOpen"
            :class="navbarOpen && 'navbarTogglerActive'"
            id="navbarToggler"
            class="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
          >
            <span
              class="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"
            ></span>
            <span
              class="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"
            ></span>
            <span
              class="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"
            ></span>
          </button>
          <nav
            x-transition
            :class="!navbarOpen && 'hidden'"
            id="navbarCollapse"
            class="absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow transition-all lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none xl:ml-11 dark:bg-dark-2"
          >
            <ul class="block lg:flex">
              <li>
                <a
                  href="javascript:void(0)"
                  class="flex py-2 text-base font-medium text-dark hover:text-primary lg:ml-10 lg:inline-flex dark:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="flex py-2 text-base font-medium text-dark hover:text-primary lg:ml-10 lg:inline-flex dark:text-white"
                >
                  Payment
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="flex py-2 text-base font-medium text-dark hover:text-primary lg:ml-10 lg:inline-flex dark:text-white"
                >
                  Features
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="hidden justify-end pr-16 sm:flex lg:pr-0">
          <a
            href="javascript:void(0)"
            class="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
          >
            Login
          </a>
          <a
            href="javascript:void(0)"
            class="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-blue-dark"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  </div>
</header>
<!-- ====== Navbar Section End -->

<!-- ====== Hero Section Start -->
<div
  class="relative bg-white pb-[110px] pt-[120px] lg:pt-[150px] dark:bg-dark"
>
  <div class="container mx-auto">
    <div class="-mx-4 flex flex-wrap items-center">
      <div class="w-full px-4 lg:w-5/12">
        <div class="hero-content">
          <h1
            class="mb-5 text-4xl font-bold !leading-[1.208] text-dark sm:text-[42px] lg:text-[40px] xl:text-5xl dark:text-white"
          >
            The Greatest <br />
            Journey Of Online <br />
            Payment.
          </h1>
          <p
            class="mb-8 max-w-[480px] text-base text-body-color dark:text-dark-6"
          >
            With TailGrids, business and students thrive together. Business
            can perfectly match their staffing to changing demand throughout
            the dayed.
          </p>
          <ul class="flex flex-wrap items-center">
            <li>
              <a
                href="javascript:void(0)"
                class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-dark lg:px-7"
              >
                Get Started
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-[#464646] hover:text-primary dark:text-white"
              >
                <span class="mr-2">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12.6152" r="12" fill="#3758F9" />
                    <rect
                      x="7.99893"
                      y="14.979"
                      width="8.18182"
                      height="1.63636"
                      fill="white"
                    />
                    <rect
                      x="11.2717"
                      y="7.61523"
                      width="1.63636"
                      height="4.09091"
                      fill="white"
                    />
                    <path
                      d="M12.0898 14.1606L14.9241 11.0925H9.25557L12.0898 14.1606Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Download App
              </a>
            </li>
          </ul>
          <div class="clients pt-16">
            <h6
              class="mb-6 flex items-center text-xs font-normal text-body-color dark:text-dark-6"
            >
              Some Of Our Clients
              <span class="ml-3 inline-block h-px w-8 bg-body-color"></span>
            </h6>
            <div class="flex items-center gap-4 xl:gap-[50px]">
              <a href="javascript:void(0)" class="block py-3">
                <img
                  src="../../assets/images/brands/oracle.svg"
                  alt="oracle"
                />
              </a>
              <a href="javascript:void(0)" class="block py-3">
                <img
                  src="../../assets/images/brands/intel.svg"
                  alt="intel"
                />
              </a>
              <a href="javascript:void(0)" class="block py-3">
                <img
                  src="../../assets/images/brands/logitech.svg"
                  alt="logitech"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden px-4 lg:block lg:w-1/12"></div>
      <div class="w-full px-4 lg:w-6/12">
        <div class="lg:ml-auto lg:text-right">
          <div class="relative z-10 inline-block pt-11 lg:pt-0">
            <img
              src="../images/hero/hero-image-01.png"
              alt="hero"
              class="max-w-full lg:ml-auto"
            />
            <span class="absolute -bottom-8 -left-8 z-[-1]">
              <svg
                width="93"
                height="93"
                viewBox="0 0 93 93"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- ====== Hero Section End -->`;