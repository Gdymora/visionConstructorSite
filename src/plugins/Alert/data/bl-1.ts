export const source = ` <!-- ====== Alerts Section Start -->
<section class="bg-white py-20 lg:py-[120px] dark:bg-dark">
  <div class="container mx-auto">
    <div class="-mx-4 flex flex-wrap justify-center">
      <div class="w-full space-y-11 px-4 lg:w-10/12">
        <!-- ==== warning alerts ==== -->
        <div
          class="flex w-full rounded-lg border-l-[6px] border-transparent bg-white px-7 py-8 shadow-1 md:p-9 dark:bg-dark-2"
        >
          <div
            class="mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md bg-yellow/30 text-yellow-dark"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0156 11.6156L10.9969 1.93125C10.5188 1.28437 9.78752 0.91875 9.00002 0.91875C8.18439 0.91875 7.45314 1.28437 7.00314 1.93125L0.984395 11.6156C0.421895 12.375 0.33752 13.3594 0.759395 14.2031C1.18127 15.0469 2.02502 15.5813 2.98127 15.5813H15.0188C15.975 15.5813 16.8188 15.0469 17.2406 14.2031C17.6625 13.3875 17.5781 12.375 17.0156 11.6156ZM16.1156 13.6406C15.8906 14.0625 15.4969 14.3156 15.0188 14.3156H2.98127C2.50315 14.3156 2.10939 14.0625 1.88439 13.6406C1.68752 13.2188 1.71564 12.7406 1.99689 12.375L8.01564 2.69062C8.24064 2.38125 8.60627 2.18437 9.00002 2.18437C9.39377 2.18437 9.75939 2.35312 9.9844 2.69062L16.0031 12.375C16.2844 12.7406 16.3125 13.2188 16.1156 13.6406Z"
                fill="currentColor"
              />
              <path
                d="M8.9999 6.15002C8.6624 6.15002 8.35303 6.43127 8.35303 6.79689V9.86252C8.35303 10.2 8.63428 10.5094 8.9999 10.5094C9.36553 10.5094 9.64678 10.2281 9.64678 9.86252V6.76877C9.64678 6.43127 9.3374 6.15002 8.9999 6.15002Z"
                fill="currentColor"
              />
              <path
                d="M8.9999 11.25C8.6624 11.25 8.35303 11.5313 8.35303 11.8969V12.0375C8.35303 12.375 8.63428 12.6844 8.9999 12.6844C9.36553 12.6844 9.64678 12.4031 9.64678 12.0375V11.8688C9.64678 11.5313 9.3374 11.25 8.9999 11.25Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="w-full">
            <h5 class="mb-3 text-lg font-semibold text-[#9D5425]">
              Attention needed
            </h5>
            <p class="text-base leading-relaxed text-[#D0915C]">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when
            </p>
          </div>
        </div>

        <div
          class="flex w-full rounded-lg border-l-[6px] border-yellow bg-yellow-light-4 px-7 py-8 md:p-9"
        >
          <div
            class="mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md bg-yellow"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0156 11.6156L10.9969 1.93125C10.5188 1.28437 9.78752 0.91875 9.00002 0.91875C8.18439 0.91875 7.45314 1.28437 7.00314 1.93125L0.984395 11.6156C0.421895 12.375 0.33752 13.3594 0.759395 14.2031C1.18127 15.0469 2.02502 15.5813 2.98127 15.5813H15.0188C15.975 15.5813 16.8188 15.0469 17.2406 14.2031C17.6625 13.3875 17.5781 12.375 17.0156 11.6156ZM16.1156 13.6406C15.8906 14.0625 15.4969 14.3156 15.0188 14.3156H2.98127C2.50315 14.3156 2.10939 14.0625 1.88439 13.6406C1.68752 13.2188 1.71564 12.7406 1.99689 12.375L8.01564 2.69062C8.24064 2.38125 8.60627 2.18437 9.00002 2.18437C9.39377 2.18437 9.75939 2.35312 9.9844 2.69062L16.0031 12.375C16.2844 12.7406 16.3125 13.2188 16.1156 13.6406Z"
                fill="white"
              />
              <path
                d="M8.9999 6.15002C8.6624 6.15002 8.35303 6.43127 8.35303 6.79689V9.86252C8.35303 10.2 8.63428 10.5094 8.9999 10.5094C9.36553 10.5094 9.64678 10.2281 9.64678 9.86252V6.76877C9.64678 6.43127 9.3374 6.15002 8.9999 6.15002Z"
                fill="white"
              />
              <path
                d="M8.9999 11.25C8.6624 11.25 8.35303 11.5313 8.35303 11.8969V12.0375C8.35303 12.375 8.63428 12.6844 8.9999 12.6844C9.36553 12.6844 9.64678 12.4031 9.64678 12.0375V11.8688C9.64678 11.5313 9.3374 11.25 8.9999 11.25Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="w-full">
            <h5 class="mb-3 text-lg font-semibold text-[#9D5425]">
              Attention needed
            </h5>
            <p class="text-base leading-relaxed text-[#D0915C]">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when
            </p>
          </div>
        </div>

        <div
          class="flex max-w-[655px] items-center rounded-md border-l-[6px] border-l-yellow bg-white p-5 pl-6 dark:bg-dark-2"
        >
          <div
            class="mr-5 flex h-[36px] w-full max-w-[36px] items-center justify-center rounded-full bg-yellow"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0156 11.6156L10.9969 1.93125C10.5188 1.28437 9.78752 0.918747 9.00002 0.918747C8.18439 0.918747 7.45314 1.28437 7.00314 1.93125L0.984395 11.6156C0.421895 12.375 0.33752 13.3594 0.759395 14.2031C1.18127 15.0469 2.02502 15.5812 2.98127 15.5812H15.0188C15.975 15.5812 16.8188 15.0469 17.2406 14.2031C17.6625 13.3875 17.5781 12.375 17.0156 11.6156ZM16.1156 13.6406C15.8906 14.0625 15.4969 14.3156 15.0188 14.3156H2.98127C2.50315 14.3156 2.10939 14.0625 1.88439 13.6406C1.68752 13.2187 1.71564 12.7406 1.99689 12.375L8.01564 2.69062C8.24064 2.38125 8.60627 2.18437 9.00002 2.18437C9.39377 2.18437 9.75939 2.35312 9.9844 2.69062L16.0031 12.375C16.2844 12.7406 16.3125 13.2187 16.1156 13.6406Z"
                fill="white"
              />
              <path
                d="M8.9999 6.15001C8.6624 6.15001 8.35303 6.43126 8.35303 6.79688V9.86251C8.35303 10.2 8.63428 10.5094 8.9999 10.5094C9.36553 10.5094 9.64678 10.2281 9.64678 9.86251V6.76876C9.64678 6.43126 9.3374 6.15001 8.9999 6.15001Z"
                fill="white"
              />
              <path
                d="M8.9999 11.25C8.6624 11.25 8.35303 11.5313 8.35303 11.8969V12.0375C8.35303 12.375 8.63428 12.6844 8.9999 12.6844C9.36553 12.6844 9.64678 12.4031 9.64678 12.0375V11.8688C9.64678 11.5313 9.3374 11.25 8.9999 11.25Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="flex w-full items-center justify-between">
            <div>
              <h3
                class="mb-1 text-lg font-medium text-black dark:text-white"
              >
                Opps! something went wrong
              </h3>
              <p class="text-sm text-body-color dark:text-dark-6">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </div>
            <div>
              <button
                class="text-dark-3 duration-300 hover:text-dark dark:text-dark-4 dark:hover:text-dark-6"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 10L18.625 2.375C18.9062 2.09375 18.9062 1.65625 18.625 1.375C18.3438 1.09375 17.9062 1.09375 17.625 1.375L10 9L2.375 1.375C2.09375 1.09375 1.65625 1.09375 1.375 1.375C1.09375 1.65625 1.09375 2.09375 1.375 2.375L9 10L1.375 17.625C1.09375 17.9062 1.09375 18.3438 1.375 18.625C1.5 18.75 1.6875 18.8438 1.875 18.8438C2.0625 18.8438 2.25 18.7812 2.375 18.625L10 11L17.625 18.625C17.75 18.75 17.9375 18.8438 18.125 18.8438C18.3125 18.8438 18.5 18.7812 18.625 18.625C18.9062 18.3438 18.9062 17.9062 18.625 17.625L11 10Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- ==== success alerts ==== -->

        <div
          class="flex w-full rounded-lg border-l-[6px] border-green bg-white px-7 py-8 shadow-1 md:p-9 dark:bg-dark-2"
        >
          <div
            class="mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md bg-green/10"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_961_15629)">
                <path
                  d="M8.99998 0.506256C4.3031 0.506256 0.506226 4.30313 0.506226 9.00001C0.506226 13.6969 4.3031 17.5219 8.99998 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9.00001C17.5219 4.30313 13.6969 0.506256 8.99998 0.506256ZM8.99998 16.2563C5.00623 16.2563 1.77185 12.9938 1.77185 9.00001C1.77185 5.00626 5.00623 1.77188 8.99998 1.77188C12.9937 1.77188 16.2562 5.03438 16.2562 9.02813C16.2562 12.9938 12.9937 16.2563 8.99998 16.2563Z"
                  fill="#22AD5C"
                />
                <path
                  d="M11.4187 6.38438L8.07183 9.64688L6.55308 8.15626C6.29996 7.90313 5.90621 7.93126 5.65308 8.15626C5.39996 8.40938 5.42808 8.80313 5.65308 9.05626L7.45308 10.8C7.62183 10.9688 7.84683 11.0531 8.07183 11.0531C8.29683 11.0531 8.52183 10.9688 8.69058 10.8L12.3187 7.31251C12.5718 7.05938 12.5718 6.66563 12.3187 6.41251C12.0656 6.15938 11.6718 6.15938 11.4187 6.38438Z"
                  fill="#22AD5C"
                />
              </g>
              <defs>
                <clipPath id="clip0_961_15629">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="w-full">
            <h5
              class="mb-3 text-lg font-semibold text-dark dark:text-white"
            >
              Message Sent Successfully
            </h5>
            <p
              class="mb-6 text-base leading-relaxed text-body-color dark:text-dark-6"
            >
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when
            </p>
            <div class="flex">
              <a
                href="javascript:void(0)"
                class="mr-6 inline-block text-sm font-medium text-green hover:text-green-dark"
              >
                View Status
              </a>
              <button
                class="text-sm font-medium text-dark hover:text-body-color dark:text-dark-6"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>

        <div
          class="flex w-full rounded-lg border-l-[6px] border-green bg-green-light-6 px-7 py-8 md:p-9"
        >
          <div
            class="mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md bg-green"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_961_15637)">
                <path
                  d="M8.99998 0.506248C4.3031 0.506248 0.506226 4.30312 0.506226 9C0.506226 13.6969 4.3031 17.5219 8.99998 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9C17.5219 4.30312 13.6969 0.506248 8.99998 0.506248ZM8.99998 16.2562C5.00623 16.2562 1.77185 12.9937 1.77185 9C1.77185 5.00625 5.00623 1.77187 8.99998 1.77187C12.9937 1.77187 16.2562 5.03437 16.2562 9.02812C16.2562 12.9937 12.9937 16.2562 8.99998 16.2562Z"
                  fill="white"
                />
                <path
                  d="M11.4187 6.38437L8.07183 9.64687L6.55308 8.15625C6.29996 7.90312 5.90621 7.93125 5.65308 8.15625C5.39996 8.40937 5.42808 8.80312 5.65308 9.05625L7.45308 10.8C7.62183 10.9687 7.84683 11.0531 8.07183 11.0531C8.29683 11.0531 8.52183 10.9687 8.69058 10.8L12.3187 7.3125C12.5718 7.05937 12.5718 6.66562 12.3187 6.4125C12.0656 6.15937 11.6718 6.15937 11.4187 6.38437Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_961_15637">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="w-full">
            <h5 class="mb-3 text-lg font-semibold text-[#004434]">
              Message Sent Successfully
            </h5>
            <p class="text-base leading-relaxed text-body-color">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
          </div>
        </div>

        <div class="inline-flex rounded-lg bg-green-light-6 px-[18px] py-4">
          <p class="flex items-center text-sm font-medium text-[#004434]">
            <span
              class="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-green"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_961_15641)">
                  <path
                    d="M6.00002 0.337494C2.86877 0.337494 0.337524 2.86874 0.337524 5.99999C0.337524 9.13124 2.86877 11.6812 6.00002 11.6812C9.13128 11.6812 11.6813 9.13124 11.6813 5.99999C11.6813 2.86874 9.13128 0.337494 6.00002 0.337494ZM6.00002 10.8375C3.33752 10.8375 1.18127 8.66249 1.18127 5.99999C1.18127 3.33749 3.33752 1.18124 6.00002 1.18124C8.66252 1.18124 10.8375 3.35624 10.8375 6.01874C10.8375 8.66249 8.66252 10.8375 6.00002 10.8375Z"
                    fill="white"
                  />
                  <path
                    d="M7.61255 4.25624L5.3813 6.43124L4.3688 5.43749C4.20005 5.26874 3.93755 5.28749 3.7688 5.43749C3.60005 5.60624 3.6188 5.86874 3.7688 6.03749L4.9688 7.19999C5.0813 7.31249 5.2313 7.36874 5.3813 7.36874C5.5313 7.36874 5.6813 7.31249 5.7938 7.19999L8.21255 4.87499C8.3813 4.70624 8.3813 4.44374 8.21255 4.27499C8.0438 4.10624 7.7813 4.10624 7.61255 4.25624Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_961_15641">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            Your item has been added successfully
          </p>
        </div>

        <!-- ==== danger alerts ==== -->

        <div
          class="flex w-full rounded-lg border-l-[6px] border-transparent bg-white px-7 py-8 shadow-1 md:p-9 dark:bg-dark-2"
        >
          <div
            class="mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-lg bg-red-light-5 text-red-dark dark:bg-red-dark dark:text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_961_15645)">
                <path
                  d="M9 0.506256C4.30313 0.506256 0.50625 4.30313 0.50625 9.00001C0.50625 13.6969 4.30313 17.5219 9 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9.00001C17.5219 4.30313 13.6969 0.506256 9 0.506256ZM9 16.2563C5.00625 16.2563 1.77188 12.9938 1.77188 9.00001C1.77188 5.00626 5.00625 1.77188 9 1.77188C12.9938 1.77188 16.2563 5.03438 16.2563 9.02813C16.2563 12.9938 12.9938 16.2563 9 16.2563Z"
                  fill="currentColor"
                />
                <path
                  d="M11.5875 6.38438C11.3344 6.13125 10.9406 6.13125 10.6875 6.38438L9 8.1L7.28438 6.38438C7.03125 6.13125 6.6375 6.13125 6.38438 6.38438C6.13125 6.6375 6.13125 7.03125 6.38438 7.28438L8.1 9L6.38438 10.7156C6.13125 10.9688 6.13125 11.3625 6.38438 11.6156C6.49688 11.7281 6.66563 11.8125 6.83438 11.8125C7.00313 11.8125 7.17188 11.7563 7.28438 11.6156L9 9.9L10.7156 11.6156C10.8281 11.7281 10.9969 11.8125 11.1656 11.8125C11.3344 11.8125 11.5031 11.7563 11.6156 11.6156C11.8688 11.3625 11.8688 10.9688 11.6156 10.7156L9.9 9L11.6156 7.28438C11.8406 7.03125 11.8406 6.6375 11.5875 6.38438Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_961_15645">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="w-full">
            <h5 class="mb-3 text-base font-semibold text-[#BC1C21]">
              There were 2 errors with your submission
            </h5>
            <ul class="list-inside list-disc">
              <li class="text-base leading-relaxed text-red-light">
                Lorem Ipsum is simply dummy text of the printing
              </li>

              <li class="text-base leading-relaxed text-red-light">
                Industry's standard dummy text ever since the 1500s, when
              </li>
            </ul>
          </div>
        </div>

        <div
          class="flex w-full rounded-lg border-l-[6px] border-red bg-red-light-6 px-7 py-8 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] md:p-9"
        >
          <div
            class="mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-lg bg-red"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_961_15645)">
                <path
                  d="M9 0.506256C4.30313 0.506256 0.50625 4.30313 0.50625 9.00001C0.50625 13.6969 4.30313 17.5219 9 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9.00001C17.5219 4.30313 13.6969 0.506256 9 0.506256ZM9 16.2563C5.00625 16.2563 1.77188 12.9938 1.77188 9.00001C1.77188 5.00626 5.00625 1.77188 9 1.77188C12.9938 1.77188 16.2563 5.03438 16.2563 9.02813C16.2563 12.9938 12.9938 16.2563 9 16.2563Z"
                  fill="white"
                />
                <path
                  d="M11.5875 6.38438C11.3344 6.13125 10.9406 6.13125 10.6875 6.38438L9 8.1L7.28438 6.38438C7.03125 6.13125 6.6375 6.13125 6.38438 6.38438C6.13125 6.6375 6.13125 7.03125 6.38438 7.28438L8.1 9L6.38438 10.7156C6.13125 10.9688 6.13125 11.3625 6.38438 11.6156C6.49688 11.7281 6.66563 11.8125 6.83438 11.8125C7.00313 11.8125 7.17188 11.7563 7.28438 11.6156L9 9.9L10.7156 11.6156C10.8281 11.7281 10.9969 11.8125 11.1656 11.8125C11.3344 11.8125 11.5031 11.7563 11.6156 11.6156C11.8688 11.3625 11.8688 10.9688 11.6156 10.7156L9.9 9L11.6156 7.28438C11.8406 7.03125 11.8406 6.6375 11.5875 6.38438Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_961_15645">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="w-full">
            <h5 class="mb-3 text-base font-semibold text-[#BC1C21]">
              There were 1 errors with your submission
            </h5>
            <ul class="list-inside list-disc">
              <li class="text-base leading-relaxed text-red-light">
                Lorem Ipsum is simply dummy text of the printing
              </li>
            </ul>
          </div>
        </div>

        <div
          class="inline-flex rounded-lg bg-red-light-6 px-[18px] py-4 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]"
        >
          <p class="flex items-center text-sm font-medium text-[#BC1C21]">
            <span
              class="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-red"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_961_15656)">
                  <path
                    d="M6 0.337494C2.86875 0.337494 0.3375 2.86874 0.3375 5.99999C0.3375 9.13124 2.86875 11.6812 6 11.6812C9.13125 11.6812 11.6813 9.13124 11.6813 5.99999C11.6813 2.86874 9.13125 0.337494 6 0.337494ZM6 10.8375C3.3375 10.8375 1.18125 8.66249 1.18125 5.99999C1.18125 3.33749 3.3375 1.18124 6 1.18124C8.6625 1.18124 10.8375 3.35624 10.8375 6.01874C10.8375 8.66249 8.6625 10.8375 6 10.8375Z"
                    fill="white"
                  />
                  <path
                    d="M7.725 4.25625C7.55625 4.0875 7.29375 4.0875 7.125 4.25625L6 5.4L4.85625 4.25625C4.6875 4.0875 4.425 4.0875 4.25625 4.25625C4.0875 4.425 4.0875 4.6875 4.25625 4.85625L5.4 6L4.25625 7.14375C4.0875 7.3125 4.0875 7.575 4.25625 7.74375C4.33125 7.81875 4.44375 7.875 4.55625 7.875C4.66875 7.875 4.78125 7.8375 4.85625 7.74375L6 6.6L7.14375 7.74375C7.21875 7.81875 7.33125 7.875 7.44375 7.875C7.55625 7.875 7.66875 7.8375 7.74375 7.74375C7.9125 7.575 7.9125 7.3125 7.74375 7.14375L6.6 6L7.74375 4.85625C7.89375 4.6875 7.89375 4.425 7.725 4.25625Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_961_15656">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            Uh oh, something went wrong
          </p>
        </div>

        <!-- ==== info alerts ==== -->

        <div
          class="flex w-full rounded-lg border-l-[6px] border-transparent bg-white px-7 py-8 shadow-1 md:p-9 dark:bg-dark-2"
        >
          <div
            class="mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md bg-cyan-light-2/30 text-cyan-dark"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99998 0.506256C4.3031 0.506256 0.506226 4.30313 0.506226 9.00001C0.506226 13.6969 4.3031 17.5219 8.99998 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9.00001C17.5219 4.30313 13.6969 0.506256 8.99998 0.506256ZM8.99998 16.2563C5.00623 16.2563 1.77185 12.9938 1.77185 9.00001C1.77185 5.00626 5.00623 1.77188 8.99998 1.77188C12.9937 1.77188 16.2562 5.03438 16.2562 9.02813C16.2562 12.9938 12.9937 16.2563 8.99998 16.2563Z"
                fill="#0B76B7"
              />
              <path
                d="M10.125 7.65001H7.87496C7.53746 7.65001 7.22809 7.93126 7.22809 8.29688V13.9219C7.22809 14.2594 7.50934 14.5688 7.87496 14.5688H10.125C10.4625 14.5688 10.7718 14.2875 10.7718 13.9219V8.29688C10.7718 7.93126 10.4625 7.65001 10.125 7.65001ZM9.50621 13.275H8.52184V8.91563H9.50621V13.275Z"
                fill="#0B76B7"
              />
              <path
                d="M8.99996 3.45938C8.04371 3.45938 7.22809 4.24688 7.22809 5.23126C7.22809 6.21563 8.01559 7.00313 8.99996 7.00313C9.98434 7.00313 10.7718 6.21563 10.7718 5.23126C10.7718 4.24688 9.95621 3.45938 8.99996 3.45938ZM8.99996 5.70938C8.71871 5.70938 8.49371 5.48438 8.49371 5.20313C8.49371 4.92188 8.71871 4.69688 8.99996 4.69688C9.28121 4.69688 9.50621 4.92188 9.50621 5.20313C9.50621 5.48438 9.28121 5.70938 8.99996 5.70938Z"
                fill="#0B76B7"
              />
            </svg>
          </div>
          <div class="w-full">
            <h5 class="mb-3 text-lg font-semibold text-cyan-dark">
              Important Notice
            </h5>
            <p
              class="text-base leading-relaxed text-body-color dark:text-dark-6"
            >
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when
            </p>
          </div>
        </div>

        <div
          class="flex w-full rounded-lg border-l-[6px] border-cyan-dark bg-[#E9F9FF] px-7 py-8 md:p-9"
        >
          <div
            class="mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md bg-cyan-dark text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99998 0.506256C4.3031 0.506256 0.506226 4.30313 0.506226 9.00001C0.506226 13.6969 4.3031 17.5219 8.99998 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9.00001C17.5219 4.30313 13.6969 0.506256 8.99998 0.506256ZM8.99998 16.2563C5.00623 16.2563 1.77185 12.9938 1.77185 9.00001C1.77185 5.00626 5.00623 1.77188 8.99998 1.77188C12.9937 1.77188 16.2562 5.03438 16.2562 9.02813C16.2562 12.9938 12.9937 16.2563 8.99998 16.2563Z"
                fill="currentColor"
              />
              <path
                d="M10.125 7.65001H7.87496C7.53746 7.65001 7.22809 7.93126 7.22809 8.29688V13.9219C7.22809 14.2594 7.50934 14.5688 7.87496 14.5688H10.125C10.4625 14.5688 10.7718 14.2875 10.7718 13.9219V8.29688C10.7718 7.93126 10.4625 7.65001 10.125 7.65001ZM9.50621 13.275H8.52184V8.91563H9.50621V13.275Z"
                fill="currentColor"
              />
              <path
                d="M8.99996 3.45938C8.04371 3.45938 7.22809 4.24688 7.22809 5.23126C7.22809 6.21563 8.01559 7.00313 8.99996 7.00313C9.98434 7.00313 10.7718 6.21563 10.7718 5.23126C10.7718 4.24688 9.95621 3.45938 8.99996 3.45938ZM8.99996 5.70938C8.71871 5.70938 8.49371 5.48438 8.49371 5.20313C8.49371 4.92188 8.71871 4.69688 8.99996 4.69688C9.28121 4.69688 9.50621 4.92188 9.50621 5.20313C9.50621 5.48438 9.28121 5.70938 8.99996 5.70938Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="w-full">
            <h5 class="mb-3 text-lg font-semibold text-cyan-dark">
              Attention needed
            </h5>
            <p class="text-base leading-relaxed text-body-color">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when
            </p>
          </div>
        </div>

        <div
          class="flex max-w-[655px] items-center rounded-md border-l-[6px] border-l-cyan-dark bg-white p-5 pl-6 dark:bg-dark-2"
        >
          <div
            class="mr-5 flex h-[36px] w-full max-w-[36px] items-center justify-center rounded-full bg-cyan-dark text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_961_15681)">
                <path
                  d="M8.99998 0.506256C4.3031 0.506256 0.506226 4.30313 0.506226 9.00001C0.506226 13.6969 4.3031 17.5219 8.99998 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9.00001C17.5219 4.30313 13.6969 0.506256 8.99998 0.506256ZM8.99998 16.2563C5.00623 16.2563 1.77185 12.9938 1.77185 9.00001C1.77185 5.00626 5.00623 1.77188 8.99998 1.77188C12.9937 1.77188 16.2562 5.03438 16.2562 9.02813C16.2562 12.9938 12.9937 16.2563 8.99998 16.2563Z"
                  fill="currentColor"
                />
                <path
                  d="M10.125 7.65001H7.87496C7.53746 7.65001 7.22809 7.93126 7.22809 8.29688V13.9219C7.22809 14.2594 7.50934 14.5688 7.87496 14.5688H10.125C10.4625 14.5688 10.7718 14.2875 10.7718 13.9219V8.29688C10.7718 7.93126 10.4625 7.65001 10.125 7.65001ZM9.50621 13.275H8.52184V8.91563H9.50621V13.275Z"
                  fill="currentColor"
                />
                <path
                  d="M8.99996 3.45938C8.04371 3.45938 7.22809 4.24688 7.22809 5.23126C7.22809 6.21563 8.01559 7.00313 8.99996 7.00313C9.98434 7.00313 10.7718 6.21563 10.7718 5.23126C10.7718 4.24688 9.95621 3.45938 8.99996 3.45938ZM8.99996 5.70938C8.71871 5.70938 8.49371 5.48438 8.49371 5.20313C8.49371 4.92188 8.71871 4.69688 8.99996 4.69688C9.28121 4.69688 9.50621 4.92188 9.50621 5.20313C9.50621 5.48438 9.28121 5.70938 8.99996 5.70938Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_961_15681">
                  <rect width="18" height="18" fill="currentColor" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="flex w-full items-center justify-between">
            <div>
              <h3
                class="mb-1 text-lg font-medium text-dark dark:text-white"
              >
                Did you know?
              </h3>
              <p class="text-sm text-body-color dark:text-dark-6">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </div>
            <div>
              <button
                class="text-dark-3 duration-300 hover:text-dark dark:text-dark-4 dark:hover:text-dark-6"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 10L18.625 2.375C18.9062 2.09375 18.9062 1.65625 18.625 1.375C18.3438 1.09375 17.9062 1.09375 17.625 1.375L10 9L2.375 1.375C2.09375 1.09375 1.65625 1.09375 1.375 1.375C1.09375 1.65625 1.09375 2.09375 1.375 2.375L9 10L1.375 17.625C1.09375 17.9062 1.09375 18.3438 1.375 18.625C1.5 18.75 1.6875 18.8438 1.875 18.8438C2.0625 18.8438 2.25 18.7812 2.375 18.625L10 11L17.625 18.625C17.75 18.75 17.9375 18.8438 18.125 18.8438C18.3125 18.8438 18.5 18.7812 18.625 18.625C18.9062 18.3438 18.9062 17.9062 18.625 17.625L11 10Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- ====== Alerts Section End -->`;
