export const source = `
<script defer src="../../assets/js/alpine.min.js"></script>

<div>
  <!-- ====== Modal Section Start -->
  <section x-data="{modalOpen: false}">
    <div class="container mx-auto py-20">
      <button
        @click="modalOpen = true"
        class="rounded-full bg-primary px-6 py-3 text-base font-medium text-white"
      >
        Open Modal
      </button>
    </div>

    <div
      x-show="modalOpen"
      x-transition
      class="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5"
    >
      <div
        @click.outside="modalOpen = false"
        class="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center md:px-[70px] md:py-[60px] dark:bg-dark-2"
      >
        <h3
          class="pb-[18px] text-xl font-semibold text-dark sm:text-2xl dark:text-white"
        >
          Your Message Sent Successfully
        </h3>
        <span
          class="mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary"
        ></span>
        <p
          class="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since
        </p>
        <div class="-mx-3 flex flex-wrap">
          <div class="w-1/2 px-3">
            <button
              @click="modalOpen = false"
              class="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
            >
              Cancel
            </button>
          </div>
          <div class="w-1/2 px-3">
            <button
              class="block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-blue-dark"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ====== Modal Section End -->
</div>`;
