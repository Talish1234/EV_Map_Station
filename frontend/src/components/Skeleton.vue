<script setup>
import { MapPin } from 'lucide-vue-next';
</script>

<template>
    <div v-for="n in 12"
         :key="n"
          class="text-gray-800 border-none p-4 rounded w-[300px] bg-[#F6F4F0] shadow-md shadow-[rgba(255,255,255,0.5)]"
        >
          <div class="flex justify-between items-center pb-3">
            <span class="skeleton-line w-[70%] bg-gray-300 rounded-full h-4">&nbsp;</span>
            <span class="skeleton-line w-1/5 bg-gray-300 rounded-full h-2">&nbsp;</span>
          </div>
          <div class="flex justify-between text-gray-400 pl-0.5">
            <span class="skeleton-line w-[35%] bg-gray-300 rounded-full h-2">&nbsp;</span>
            <span class="skeleton-line w-[25%] bg-gray-300 rounded-full h-2">&nbsp;</span>
          </div>
          <div class="flex items-center text-gray-400 mt-2 gap-0.5">
            <MapPin size="16px" />
            <span class="skeleton-line w-full bg-gray-300 rounded-full h-2">&nbsp;</span>
          </div>
        </div>
</template>
<style scoped>
.skeleton-line {
  position: relative;
  overflow: hidden;
}

.skeleton-line::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}
</style>