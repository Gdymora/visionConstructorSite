export const source = `
<script defer src="../../assets/js/alpine.min.js"></script> 
<body>
  <!-- ====== Navbar Section Start -->
  <header
    x-data="
      {
        navbarOpen: false
      }
    "
    class="flex w-full items-center bg-white dark:bg-dark"
  >
    <div class="container mx-auto">
      <div class="relative -mx-4 flex items-center justify-between">
        <div class="w-60 max-w-full px-4">
          <a href="javascript:void(0)" class="block w-full py-5">
            <img
              src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
              alt="logo"
              class="dark:hidden"
            />
            <img
              src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
              alt="logo"
              class="hidden dark:block"
            />
          </a>
        </div>
        <div class="flex w-full items-center justify-between px-4">
          <div>
            <button
              @click="navbarOpen = !navbarOpen"
              :class="navbarOpen && 'navbarTogglerActive' "
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
              :class="!navbarOpen && 'hidden' "
              id="navbarCollapse"
              class="absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none dark:bg-dark-2 lg:dark:bg-transparent"
            >
              <ul class="block lg:flex">
                <li>
                  <a
                    href="javascript:void(0)"
                    class="flex py-2 text-base font-medium text-body-color hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6 dark:hover:text-white"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="flex py-2 text-base font-medium text-body-color hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6 dark:hover:text-white"
                  >
                    Payment
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="flex py-2 text-base font-medium text-body-color hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6 dark:hover:text-white"
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
              class="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- ====== Navbar Section End --> `;
