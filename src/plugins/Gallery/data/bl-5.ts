export const source = `  <!-- ====== Gallery Section Start -->
<section class="bg-white py-20 dark:bg-dark">
  <div class="container">
    <div x-data="{activeIndex: 1}">
      <div class="mb-6">
        <div class="overflow-hidden rounded-xl">
          <img
            x-show="activeIndex === 1"
            src="../images/galleries/gallery-05/image-1.jpg"
            alt="gallery image"
            class="w-full object-cover object-center"
          />
          <img
            x-show="activeIndex === 2"
            src="../images/galleries/gallery-05/image-2.jpg"
            alt="gallery image"
            class="w-full object-cover object-center"
          />
          <img
            x-show="activeIndex === 3"
            src="../images/galleries/gallery-05/image-3.jpg"
            alt="gallery image"
            class="w-full object-cover object-center"
          />
          <img
            x-show="activeIndex === 4"
            src="../images/galleries/gallery-05/image-4.jpg"
            alt="gallery image"
            class="w-full object-cover object-center"
          />
        </div>
      </div>
      <div class="flex items-center gap-2 sm:gap-4 md:gap-6">
        <button
          @click="activeIndex = 1"
          :class=" activeIndex === 1 ? 'border-primary' : 'border-transparent' "
          class="overflow-hidden rounded-lg border lg:rounded-xl"
        >
          <img
            src="../images/galleries/gallery-05/thumbnail-1.jpg"
            alt="thumbnail-1"
            class="w-full object-cover object-center"
          />
        </button>
        <button
          @click="activeIndex = 2"
          :class=" activeIndex === 2 ? 'border-primary' : 'border-transparent' "
          class="overflow-hidden rounded-lg border lg:rounded-xl"
        >
          <img
            src="../images/galleries/gallery-05/thumbnail-2.jpg"
            alt="thumbnail-2"
            class="w-full object-cover object-center"
          />
        </button>
        <button
          @click="activeIndex = 3"
          :class=" activeIndex === 3 ? 'border-primary' : 'border-transparent' "
          class="overflow-hidden rounded-lg border lg:rounded-xl"
        >
          <img
            src="../images/galleries/gallery-05/thumbnail-3.jpg"
            alt="thumbnail-3"
            class="w-full object-cover object-center"
          />
        </button>
        <button
          @click="activeIndex = 4"
          :class=" activeIndex === 4 ? 'border-primary' : 'border-transparent' "
          class="overflow-hidden rounded-lg border lg:rounded-xl"
        >
          <img
            src="../images/galleries/gallery-05/thumbnail-4.jpg"
            alt="thumbnail-4"
            class="w-full object-cover object-center"
          />
        </button>
      </div>
    </div>
  </div>
</section>
<!-- ====== Gallery Section End -->`;