<script setup>
import { Cable } from "lucide-vue-next";
import { inject } from "vue";
const user = inject("user");
const toggleLogin = () => {
  user.value = null;
  localStorage.removeItem("user");
};
</script>

<template>
  <div>
    <!-- Navbar -->
    <nav class="relative text-white overflow-hidden group h-16">
      <!-- Base gradient -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,_#2E5077,_#40917b,_#2E5077)] transition-opacity duration-1000 ease-in-out"
      ></div>

      <!-- Hover gradient overlay -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,_#79D7BE,_#2E5077,_#2E5077)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
      ></div>
      <div class="relative z-10 px-4 py-3 flex items-center justify-between h-full">
        <router-link to="/" class="font-bold flex items-center">
          <Cable size="28px" />
          <span class="ml-2 text-3xl">Evoltsoft</span>
        </router-link>

        <!-- Hamburger Icon -->
        <button @click="toggleMenu" class="md:hidden focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- Desktop Nav -->
        <div class="hidden md:flex gap-6 text-lg">
          <router-link to="/" class="hover:text-gray-300 cursor-pointer">Home</router-link>
          <router-link to="/map" class="hover:text-gray-300 cursor-pointer">Map</router-link>
          <router-link to="/stations" class="hover:text-gray-300 cursor-pointer"
            >Charging Stations</router-link>
        </div>

        <div class="hidden md:flex gap-2">
          <router-link
            to="/login"
            class="px-4 py-2 border border-white rounded transition-colors duration-500 ease-in-out hover:bg-white hover:text-gray-800 cursor-pointer"
            v-if="!user">
            Login
          </router-link>
          <router-link
            to="/signup"
            class="px-4 py-2 bg-white text-gray-800 rounded transition-colors duration-500 ease-in-out hover:bg-gray-200 cursor-pointer"
            v-if="!user"
            >
            Sign Up
          </router-link>

          <button
            @click.prevent="toggleLogin"
            class="px-4 py-2 border border-white rounded transition-colors duration-500 ease-in-out hover:bg-white hover:text-gray-800 cursor-pointer"
            v-if="user"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Sidebar -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 w-64 h-full bg-gray-900 text-white z-999 p-6 flex flex-col gap-4 shadow-lg"
      >
        <button @click="toggleMenu" class="self-end text-white">✕</button>
        <router-link @click="toggleMenu" to="/" class="hover:text-gray-300 cursor-pointer"
          >Home</router-link
        >

        <router-link @click="toggleMenu" to="/map" class="hover:text-gray-300 cursor-pointer"
          >Map</router-link
        >
        <router-link @click="toggleMenu" to="/stations" class="hover:text-gray-300 cursor-pointer"
          >Charging Stations</router-link
        >

        <router-link
          @click="toggleMenu"
          to="/login"
          class="mt-4 px-4 py-2 border border-[#4DA1A9] text-[#4DA1A9] rounded hover:bg-[#4DA1A9] hover:text-white transition-color duration-500 ease-in-out text-center cursor-pointer"
          v-if="!user"
        >
          Login
        </router-link>
        <router-link
          @click="toggleMenu"
          to="/signup"
          class="px-4 py-2 bg-white text-gray-800 rounded transition-colors duration-500 ease-in-out hover:bg-gray-200 text-center cursor-pointer"
          v-if="!user"
        >
          Sign Up
        </router-link>
         <router-link
          @click="toggleLogin"
          to="/login"
          class="mt-4 px-4 py-2 border border-[#4DA1A9] text-[#4DA1A9] rounded hover:bg-[#4DA1A9] hover:text-white transition-color duration-500 ease-in-out text-center cursor-pointer"
          v-if="user"
        >
          Login
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
