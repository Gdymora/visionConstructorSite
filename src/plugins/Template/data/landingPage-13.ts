export const source =`
<script defer src="../../assets/js/alpine.min.js"></script>

<div>
  <!-- ====== Portfolio Section Start -->
  <section
    x-data="
      {
        showCards: 'all',
        activeClasses: 'bg-primary text-white',
        inactiveClasses: 'text-body-color dark:text-dark-6 hover:bg-primary hover:text-white',
      }
    "
    class="pb-12 pt-20 lg:pb-[90px] lg:pt-[120px] dark:bg-dark"
  >
    <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center">
            <span class="mb-2 block text-lg font-semibold text-primary">
              Our Portfolio
            </span>
            <h2
              class="mb-3 text-3xl font-bold leading-[1.208] text-dark sm:text-4xl md:text-[40px]"
            >
              Our Recent Projects
            </h2>
            <p class="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available
              but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap justify-center">
        <div class="w-full px-4">
          <ul class="mb-12 flex flex-wrap justify-center space-x-1">
            <li class="mb-1">
              <button
                @click="showCards = 'all' "
                :class="showCards == 'all' ? activeClasses : inactiveClasses "
                class="inline-block rounded-lg px-5 py-2 text-center text-base font-semibold transition md:py-3 lg:px-8"
              >
                All Projects
              </button>
            </li>
            <li class="mb-1">
              <button
                @click="showCards = 'branding' "
                :class="showCards == 'branding' ? activeClasses : inactiveClasses "
                class="inline-block rounded-lg px-5 py-2 text-center text-base font-semibold transition md:py-3 lg:px-8"
              >
                Branding
              </button>
            </li>
            <li class="mb-1">
              <button
                @click="showCards = 'design' "
                :class="showCards == 'design' ? activeClasses : inactiveClasses "
                class="inline-block rounded-lg px-5 py-2 text-center text-base font-semibold transition md:py-3 lg:px-8"
              >
                Design
              </button>
            </li>
            <li class="mb-1">
              <button
                @click="showCards = 'marketing' "
                :class="showCards == 'marketing' ? activeClasses : inactiveClasses "
                class="inline-block rounded-lg px-5 py-2 text-center text-base font-semibold transition md:py-3 lg:px-8"
              >
                Marketing
              </button>
            </li>
            <li class="mb-1">
              <button
                @click="showCards = 'development' "
                :class="showCards == 'development' ? activeClasses : inactiveClasses "
                class="inline-block rounded-lg px-5 py-2 text-center text-base font-semibold transition md:py-3 lg:px-8"
              >
                Development
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        <div
          :class="showCards == 'all' || showCards == 'branding' ? 'block' : 'hidden' "
          class="w-full px-4 md:w-1/2 xl:w-1/3"
        >
          <div class="relative mb-12">
            <div class="overflow-hidden rounded-[10px]">
              <img
                src="../images/portfolio/portfolio-01/image-01.jpg"
                alt="portfolio"
                class="w-full"
              />
            </div>
            <div
              class="relative z-10 mx-7 -mt-20 rounded-lg bg-white px-3 py-[34px] text-center shadow-portfolio dark:bg-dark-2 dark:shadow-box-dark"
            >
              <span class="mb-2 block text-sm font-medium text-primary">
                Branding
              </span>
              <h3 class="mb-5 text-xl font-bold text-dark dark:text-white">
                Branding Design
              </h3>
              <a
                href="javascript:void(0)"
                class="inline-block rounded-md border border-stroke px-7 py-[10px] text-sm font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
        <div
          :class="showCards == 'all' || showCards == 'marketing' ? 'block' : 'hidden' "
          class="w-full px-4 md:w-1/2 xl:w-1/3"
        >
          <div class="relative mb-12">
            <div class="overflow-hidden rounded-[10px]">
              <img
                src="../images/portfolio/portfolio-01/image-02.jpg"
                alt="portfolio"
                class="w-full"
              />
            </div>
            <div
              class="relative z-10 mx-7 -mt-20 rounded-lg bg-white px-3 py-[34px] text-center shadow-portfolio dark:bg-dark-2 dark:shadow-box-dark"
            >
              <span class="mb-2 block text-sm font-medium text-primary">
                Marketing
              </span>
              <h3 class="mb-5 text-xl font-bold text-dark dark:text-white">
                Best Marketing tips
              </h3>
              <a
                href="javascript:void(0)"
                class="inline-block rounded-md border border-stroke px-7 py-[10px] text-sm font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
        <div
          :class="showCards == 'all' || showCards == 'development' ? 'block' : 'hidden' "
          class="w-full px-4 md:w-1/2 xl:w-1/3"
        >
          <div class="relative mb-12">
            <div class="overflow-hidden rounded-[10px]">
              <img
                src="../images/portfolio/portfolio-01/image-03.jpg"
                alt="portfolio"
                class="w-full"
              />
            </div>
            <div
              class="relative z-10 mx-7 -mt-20 rounded-lg bg-white px-3 py-[34px] text-center shadow-portfolio dark:bg-dark-2 dark:shadow-box-dark"
            >
              <span class="mb-2 block text-sm font-medium text-primary">
                Development
              </span>
              <h3 class="mb-5 text-xl font-bold text-dark dark:text-white">
                Web Design Trend
              </h3>
              <a
                href="javascript:void(0)"
                class="inline-block rounded-md border border-stroke px-7 py-[10px] text-sm font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
        <div
          :class="showCards == 'all' || showCards == 'design' ? 'block' : 'hidden' "
          class="w-full px-4 md:w-1/2 xl:w-1/3"
        >
          <div class="relative mb-12">
            <div class="overflow-hidden rounded-[10px]">
              <img
                src="../images/portfolio/portfolio-01/image-04.jpg"
                alt="portfolio"
                class="w-full"
              />
            </div>
            <div
              class="relative z-10 mx-7 -mt-20 rounded-lg bg-white px-3 py-[34px] text-center shadow-portfolio dark:bg-dark-2 dark:shadow-box-dark"
            >
              <span class="mb-2 block text-sm font-medium text-primary">
                Design
              </span>
              <h3 class="mb-5 text-xl font-bold text-dark dark:text-white">
                Business Card Design
              </h3>
              <a
                href="javascript:void(0)"
                class="inline-block rounded-md border border-stroke px-7 py-[10px] text-sm font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
        <div
          :class="showCards == 'all' || showCards == 'marketing' ? 'block' : 'hidden' "
          class="w-full px-4 md:w-1/2 xl:w-1/3"
        >
          <div class="relative mb-12">
            <div class="overflow-hidden rounded-[10px]">
              <img
                src="../images/portfolio/portfolio-01/image-05.jpg"
                alt="portfolio"
                class="w-full"
              />
            </div>
            <div
              class="relative z-10 mx-7 -mt-20 rounded-lg bg-white px-3 py-[34px] text-center shadow-portfolio dark:bg-dark-2 dark:shadow-box-dark"
            >
              <span class="mb-2 block text-sm font-medium text-primary">
                Marketing
              </span>
              <h3 class="mb-5 text-xl font-bold text-dark dark:text-white">
                Digital marketing
              </h3>
              <a
                href="javascript:void(0)"
                class="inline-block rounded-md border border-stroke px-7 py-[10px] text-sm font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
        <div
          :class="showCards == 'all' || showCards == 'branding' ? 'block' : 'hidden' "
          class="w-full px-4 md:w-1/2 xl:w-1/3"
        >
          <div class="relative mb-12">
            <div class="overflow-hidden rounded-[10px]">
              <img
                src="../images/portfolio/portfolio-01/image-06.jpg"
                alt="portfolio"
                class="w-full"
              />
            </div>
            <div
              class="relative z-10 mx-7 -mt-20 rounded-lg bg-white px-3 py-[34px] text-center shadow-portfolio dark:bg-dark-2 dark:shadow-box-dark"
            >
              <span class="mb-2 block text-sm font-medium text-primary">
                Branding
              </span>
              <h3 class="mb-5 text-xl font-bold text-dark dark:text-white">
                Creative Agency
              </h3>
              <a
                href="javascript:void(0)"
                class="inline-block rounded-md border border-stroke px-7 py-[10px] text-sm font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ====== Portfolio Section End -->
</div>`;