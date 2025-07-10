export const source = ` 
<section class="bg-gray-900 text-white py-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="pattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)"/>
        </svg>
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <h2 class="text-4xl font-bold mb-12 text-center">Get in Touch</h2>
        <div class="max-w-lg mx-auto">
          <form>
            <div class="mb-4">
              <input type="text" placeholder="Your Name" class="w-full p-3 rounded-lg bg-gray-800 text-white">
            </div>
            <div class="mb-4">
              <input type="email" placeholder="Your Email" class="w-full p-3 rounded-lg bg-gray-800 text-white">
            </div>
            <div class="mb-4">
              <textarea placeholder="Your Message" rows="4" class="w-full p-3 rounded-lg bg-gray-800 text-white"></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">Send Message</button>
          </form>
        </div>
      </div>
    </section>
`;
