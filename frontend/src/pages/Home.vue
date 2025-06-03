<template>
  <div class="relative min-h-[calc(100vh-64px)] bg-gradient-to-r from-teal-100 via-[#d1f8f0] to-cyan-100 overflow-hidden flex items-center justify-center px-6 md:px-16 py-10">
    
    <!-- Decorative Gradient Blobs -->
    <div class="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-teal-700 opacity-40 rounded-full filter blur-3xl z-0"></div>
    <div class="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-cyan-700 opacity-40 rounded-full filter blur-3xl z-0"></div>
    
    <!-- Main Content Centered -->
    <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-left w-full max-w-6xl">
      
      <!-- Left Text Section -->
      <div class="w-full md:min-w-[40%] px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-700 mb-6 animate-fadeIn">
          Find Your Nearest Charging Station
        </h1>
        <p class="text-md text-gray-700 mb-8 animate-fadeIn text-gray-400">
          Discover nearby EV charging points using our interactive map — clearly marked, easy to locate, and hassle-free. No live tracking needed — just quick, reliable access when you need it.
        </p>
        <router-link
          to="/map"
          class="bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:animate-pulse"
        >
          Explore Map
        </router-link>
      </div>

      <!-- Right Image Section -->
      <div class="w-full md:w-[70%] flex justify-center">
        <img 
          src="@/assets/map.svg" 
          alt="EV Charging Right" 
          class="w-full animate-fadeIn delay-200 drop-shadow-2xl drop-shadow-gray-600"
        />
        
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}

</style>
