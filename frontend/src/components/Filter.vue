<template>
    <form class="flex fixed bottom-4 left-1/2 transform -translate-x-1/2 gap-2 items-center flex-col-reverse" @submit.prevent="onApplyFilter">
        
        <div class="flex p-3 bg-gray-800 w-max rounded-full md:hidden gap-2 glow-box transition-all duration-500 ease-in-out" @click.prevent="toggleFilter">
      <Funnel color="white":size="24"/>
    </div>

 <div class="md:flex md:bg-[linear-gradient(to_right,_#2E5077,_#40917b,_#2E5077)] bg-gray-800 text-white text-lg md:pl-8 md:pr-1.5 md:py-1.5 weight-300 md:rounded-3xl gap-4 glow-box flex-col md:flex-row items-center justify-between w-full max-w-4xl px-4 py-4 rounded-lg"
 :class="[isopen?'flex slide-enter-active':'hidden'],isactive?'slide-leave-active':''"> 
    <select class="border-none outline-none" value="active" v-model="filterRef.status" name="status">
        <option value="all" class="text-black">All</option>
        <option value="active" class="text-black">Active</option>
        <option value="inactive" class="text-black">InActive</option>
    </select>
    <input type="number" placeholder="Min Output" class="border-none outline-none placeholder:text-wite w-32" min="0" max="1000" name="min_output" v-model="filterRef.min_output" step="any"> 
    <input type="number" placeholder="Max Output" class="border-none outline-none palaceholder:text-wite w-32" max="1000" min="0" name="max_output" v-model="filterRef.max_output" step="any">
    <select class="border-none outline-none" name="type" v-model="filterRef.type">
        <option value="all" class="text-black">All</option>
        <option value="ac_level_1" class="text-black">AC Level 1</option>
        <option value="ac_level_2" class="text-black">AC Level 2</option>
        <option value="dc_ccs" class="text-black">DC CCS</option>
        <option value="dc_GB/T" class="text-black">DC GB/T</option>
    </select>
    <button class="border-1 border-white px-6 py-1 outline-none text-white rounded-3xl transition-colors duration-500 ease-in-out hover:bg-white hover:text-[#2E5077]" type="submit">Apply</button>
 </div>
 
    
</form>
</template>
<script setup>                           
import {Funnel} from 'lucide-vue-next'; 
import { ref } from 'vue';

const filterRef = ref({
    status: 'all',
    min_output: null,
    max_output: null,
    type: 'all',
});

const isopen = ref(false);
const isactive = ref(true);
const toggleFilter = () => {
    isactive.value = !isactive.value;
    setTimeout(() => {
        isopen.value = !isopen.value;
    }, 500);
};
const emit = defineEmits(['apply-filter']);

const onApplyFilter = () => {
    const filterData = {
        status: filterRef.value.status,
        min_output: filterRef.value.min_output ? filterRef.value.min_output : 0,
        max_output: filterRef.value.max_output ? filterRef.value.max_output : 1000,
        type: filterRef.value.type,
    };
      if(filterData.max_output <= filterData.min_output) {
      alert("Max output should be greater than Min output");
      return;
  }
    emit('apply-filters', filterData);
};

</script>
<!-- , status, power output, connector type) -->
<style scoped>
.glow-box:hover {
    box-shadow: 0 0 10px rgba(157, 255, 229, 0.3),
                0 0 10px rgba(157, 255, 229, 0.3),
                0 0 10px rgba(157, 255, 229, 0.3),
                0 0 10px rgba(157, 255, 229, 0.3);
                transition: 0.5s ease-in-out;
}

@keyframes slide-in {
  from {
    transform: translateY(25%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(25%);
  }
}
.slide-enter-active
 {
  animation: slide-in 0.5s ease-in-out;
}
.slide-leave-active {
  animation: slide-out 0.5s ease-in-out;
}
</style>