export const source = `  <!-- ====== Clipboard Start -->
<section class="bg-white py-20 dark:bg-dark" x-data="clipboardComponent()">
  <div class="container">
    <div class="mx-auto w-full max-w-[500px]">
      <div class="relative">
        <textarea
          rows="6"
          x-model="inputValue"
          x-ref="inputRef"
          class="w-full rounded-lg border border-stroke bg-gray-1 p-5 leading-relaxed text-body-color outline-none duration-200 selection:bg-transparent focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6"
        ></textarea>
        <button
          @click="copyToClipboard"
          class="absolute right-5 top-5 inline-flex h-8 items-center justify-center gap-1 rounded-md border border-stroke bg-white px-2.5 py-1.5 text-sm font-medium text-dark duration-200 hover:bg-dark hover:text-white dark:border-dark-3"
        >
          <span>
            <template x-if="copySuccess">
              <svg
                width="16"
                height="16"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0394 6.0293L8.03936 15.0293L3.68359 10.6736"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </template>
            <template x-if="!copySuccess">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6875 4.125L14.4062 0.875C14.1875 0.65625 13.875 0.53125 13.5625 0.53125H7.875C6.96875 0.53125 6.21875 1.28125 6.21875 2.1875V13.5937C6.21875 14.5 6.96875 15.25 7.875 15.25H16.375C17.2812 15.25 18.0312 14.5 18.0312 13.5937V4.96875C18.0312 4.65625 17.9062 4.34375 17.6875 4.125ZM14.4687 2.9375L15.6562 4.125H14.4687V2.9375ZM16.375 13.8437H7.875C7.75 13.8437 7.625 13.7187 7.625 13.5937V2.1875C7.625 2.0625 7.75 1.9375 7.875 1.9375H13.0625V4.8125C13.0625 5.1875 13.375 5.53125 13.7812 5.53125H16.625V13.625C16.625 13.75 16.5 13.8437 16.375 13.8437Z"
                  fill="currentColor"
                />
                <path
                  d="M13.7812 7.03125H9.65625C9.28125 7.03125 8.9375 7.34375 8.9375 7.75C8.9375 8.15625 9.25 8.46875 9.65625 8.46875H13.7812C14.1562 8.46875 14.5 8.15625 14.5 7.75C14.5 7.34375 14.1562 7.03125 13.7812 7.03125Z"
                  fill="currentColor"
                />
                <path
                  d="M13.7812 9.65625H9.65625C9.28125 9.65625 8.9375 9.96875 8.9375 10.375C8.9375 10.75 9.25 11.0937 9.65625 11.0937H13.7812C14.1562 11.0937 14.5 10.7813 14.5 10.375C14.4687 9.96875 14.1562 9.65625 13.7812 9.65625Z"
                  fill="currentColor"
                />
                <path
                  d="M13.0625 16.25C12.6875 16.25 12.3437 16.5625 12.3437 16.9687V17.8125C12.3437 17.9375 12.2187 18.0625 12.0937 18.0625H3.625C3.5 18.0625 3.375 17.9375 3.375 17.8125V6.375C3.375 6.25 3.5 6.125 3.625 6.125H4.6875C5.0625 6.125 5.40625 5.8125 5.40625 5.40625C5.40625 5 5.09375 4.6875 4.6875 4.6875H3.625C2.71875 4.6875 1.96875 5.4375 1.96875 6.34375V17.8125C1.96875 18.7188 2.71875 19.4687 3.625 19.4687H12.125C13.0312 19.4687 13.7812 18.7188 13.7812 17.8125V16.9687C13.7812 16.5625 13.4687 16.25 13.0625 16.25Z"
                  fill="currentColor"
                />
              </svg>
            </template>
          </span>
          <span x-text="copySuccess ? 'Copied!' : 'Copy'"></span>
        </button>
      </div>
    </div>
  </div>
</section>

<script>
  function clipboardComponent() {
    return {
      inputValue:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eius atque sint totam minus voluptatum quibusdam pariatur ut perferendis commodi eos vero ipsum, nostrum doloribus quae. Dolores incidunt earum ad.",
      copySuccess: false,
      copyToClipboard() {
        this.$refs.inputRef.select();
        document.execCommand("copy");
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
      },
    };
  }
</script>
<!-- ====== Clipboard End -->`;