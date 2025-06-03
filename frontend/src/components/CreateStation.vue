<template>
  <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <form class="bg-white p-6 rounded shadow w-full max-w-[320px] md:max-w-md" @submit.prevent="create">
      <h3 class="text-lg font-semibold mb-4">Create Station</h3>
      <input
        v-model="station.name"
        type="text"
        class="w-full border px-3 py-2 rounded mb-4 border-gray-400 focus:outline-none"
        placeholder="Name"
        required
      />
      <select
        v-model="station.status"
        class="w-full border px-3 py-2 rounded mb-4 border-gray-400 focus:outline-none"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <select
        v-model="station.type"
        class="w-full border px-3 py-2 rounded mb-4 border-gray-400 focus:outline-none"
      >
        <option value="ac_level_1">AC Level 1</option>
        <option value="ac_level_2">AC Level 2</option>
        <option value="dc_ccs">DC CCS</option>
        <option value="dc_GB/T">DC GB/T</option>
      </select>
      <input
        v-model="station.poweroutput"
        type="number"
        step="any"
        class="w-full border px-3 py-2 rounded mb-4 border-gray-400 focus:outline-none"
        placeholder="Power Output (kW)"
        required
      />
      <input
        v-model="station.latitude"
        type="number"
        step="any"
        class="w-full border px-3 py-2 rounded mb-4 border-gray-400 focus:outline-none"
        placeholder="latitude"
        required

      />
      <input
        v-model="station.longitude"
        type="number"
        step="any"
        class="w-full border px-3 py-2 rounded mb-4 border-gray-400 focus:outline-none"
        placeholder="longitude"
        required
      />
      <div class="flex gap-2">
        <button
          @click="$emit('cancel')"
          class="px-3 py-1 text-white w-full bg-[#06202B] rounded border-2 border-[#06202B]"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-3 py-1 w-full text-[#06202B] rounded bg-transparent border-2 border-[#06202B]"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
const station = ref({
  name: "",
  type: "dc_ccs",
  status: "Active",
  poweroutput: null,
  latitude: null,
  longitude: null
});


const emit = defineEmits(["cancel", "create"]);

const create = () => {
  if (station.value.poweroutput <= 0  || station.value.latitude > 90 || station.value.latitude < -90 || station.value.longitude > 180 || station.value.longitude < -180) {
    alert("Please enter valid values for power output, latitude, and longitude.");
    return;
  }
  emit("create", {
    ...station.value,
  });
};
</script>
