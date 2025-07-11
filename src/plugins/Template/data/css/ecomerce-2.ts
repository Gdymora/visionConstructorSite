export const source = `
<style>
@layer base {
    body {
      @apply font-poppins;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      @apply font-roboto;
    }
  }
  
  @layer components {
    .size-selector input:checked + label {
      @apply bg-primary text-white;
    }
    .color-selector input:checked + label {
      @apply ring-2 ring-primary;
    }
  
    .input-box {
      @apply block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 focus:border-primary focus:ring-0;
    }
  }
  </style>
  `;