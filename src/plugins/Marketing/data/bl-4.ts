export const source = `    <!-- ====== FAQ Section Start -->
<section
  x-data="
    {
      openFaq1: false, 
      openFaq2: false, 
      openFaq3: false, 
      openFaq4: false, 
      openFaq5: false, 
      openFaq6: false
    }
  "
  class="relative z-20 overflow-hidden bg-white pb-12 pt-20 lg:pb-[90px] lg:pt-[120px] dark:bg-dark"
>
  <div class="container mx-auto">
    <div class="-mx-4 flex flex-wrap">
      <div class="w-full px-4">
        <div class="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
          <span class="mb-2 block text-lg font-semibold text-primary">
            FAQ
          </span>
          <h2
            class="mb-4 text-3xl font-bold text-dark sm:text-[40px]/[48px] dark:text-white"
          >
            Any Questions? Look Here
          </h2>
          <p class="text-base text-body-color dark:text-dark-6">
            There are many variations of passages of Lorem Ipsum available
            but the majority have suffered alteration in some form.
          </p>
        </div>
      </div>
    </div>

    <div class="-mx-4 flex flex-wrap">
      <div class="w-full px-4 lg:w-1/2">
        <div
          class="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] sm:p-8 lg:px-6 xl:px-8 dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)]"
        >
          <button
            class="faq-btn flex w-full text-left"
            @click="openFaq1 = !openFaq1"
          >
            <div
              class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5"
            >
              <svg
                :class="openFaq1 && 'rotate-180'"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="w-full">
              <h4
                class="mt-1 text-lg font-semibold text-dark dark:text-white"
              >
                How long we deliver your first blog post?
              </h4>
            </div>
          </button>
          <div x-show="openFaq1" class="faq-content pl-[62px]">
            <p
              class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
            >
              It takes 2-3 weeks to get your first blog post ready. That
              includes the in-depth research & creation of your monthly
              content marketing strategy that we do before writing your
              first blog post, Ipsum available .
            </p>
          </div>
        </div>
        <div
          class="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] sm:p-8 lg:px-6 xl:px-8 dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)]"
        >
          <button
            class="faq-btn flex w-full text-left"
            @click="openFaq2 = !openFaq2"
          >
            <div
              class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5"
            >
              <svg
                :class="openFaq2 && 'rotate-180'"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="w-full">
              <h4
                class="mt-1 text-lg font-semibold text-dark dark:text-white"
              >
                How long we deliver your first blog post?
              </h4>
            </div>
          </button>
          <div x-show="openFaq2" class="faq-content pl-[62px]">
            <p
              class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
            >
              It takes 2-3 weeks to get your first blog post ready. That
              includes the in-depth research & creation of your monthly
              content marketing strategy that we do before writing your
              first blog post, Ipsum available .
            </p>
          </div>
        </div>
        <div
          class="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] sm:p-8 lg:px-6 xl:px-8 dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)]"
        >
          <button
            class="faq-btn flex w-full text-left"
            @click="openFaq3 = !openFaq3"
          >
            <div
              class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5"
            >
              <svg
                :class="openFaq3 && 'rotate-180'"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="w-full">
              <h4
                class="mt-1 text-lg font-semibold text-dark dark:text-white"
              >
                How long we deliver your first blog post?
              </h4>
            </div>
          </button>
          <div x-show="openFaq3" class="faq-content pl-[62px]">
            <p
              class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
            >
              It takes 2-3 weeks to get your first blog post ready. That
              includes the in-depth research & creation of your monthly
              content marketing strategy that we do before writing your
              first blog post, Ipsum available .
            </p>
          </div>
        </div>
      </div>
      <div class="w-full px-4 lg:w-1/2">
        <div
          class="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] sm:p-8 lg:px-6 xl:px-8 dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)]"
        >
          <button
            class="faq-btn flex w-full text-left"
            @click="openFaq4 = !openFaq4"
          >
            <div
              class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5"
            >
              <svg
                :class="openFaq4 && 'rotate-180'"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="w-full">
              <h4
                class="mt-1 text-lg font-semibold text-dark dark:text-white"
              >
                How long we deliver your first blog post?
              </h4>
            </div>
          </button>
          <div x-show="openFaq4" class="faq-content pl-[62px]">
            <p
              class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
            >
              It takes 2-3 weeks to get your first blog post ready. That
              includes the in-depth research & creation of your monthly
              content marketing strategy that we do before writing your
              first blog post, Ipsum available .
            </p>
          </div>
        </div>
        <div
          class="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] sm:p-8 lg:px-6 xl:px-8 dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)]"
        >
          <button
            class="faq-btn flex w-full text-left"
            @click="openFaq5 = !openFaq5"
          >
            <div
              class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5"
            >
              <svg
                :class="openFaq5 && 'rotate-180'"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="w-full">
              <h4
                class="mt-1 text-lg font-semibold text-dark dark:text-white"
              >
                How long we deliver your first blog post?
              </h4>
            </div>
          </button>
          <div x-show="openFaq5" class="faq-content pl-[62px]">
            <p
              class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
            >
              It takes 2-3 weeks to get your first blog post ready. That
              includes the in-depth research & creation of your monthly
              content marketing strategy that we do before writing your
              first blog post, Ipsum available .
            </p>
          </div>
        </div>
        <div
          class="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] sm:p-8 lg:px-6 xl:px-8 dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)]"
        >
          <button
            class="faq-btn flex w-full text-left"
            @click="openFaq6 = !openFaq6"
          >
            <div
              class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5"
            >
              <svg
                :class="openFaq6 && 'rotate-180'"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="w-full">
              <h4
                class="mt-1 text-lg font-semibold text-dark dark:text-white"
              >
                How long we deliver your first blog post?
              </h4>
            </div>
          </button>
          <div x-show="openFaq6" class="faq-content pl-[62px]">
            <p
              class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
            >
              It takes 2-3 weeks to get your first blog post ready. That
              includes the in-depth research & creation of your monthly
              content marketing strategy that we do before writing your
              first blog post, Ipsum available .
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="absolute bottom-0 right-0 z-[-1]">
    <svg
      width="1440"
      height="886"
      viewBox="0 0 1440 886"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="1308.65"
          y1="1142.58"
          x2="602.827"
          y2="-418.681"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3056D3" stop-opacity="0.36" />
          <stop offset="1" stop-color="#F5F2FD" stop-opacity="0" />
          <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</section>
<!-- ====== FAQ Section End -->`;