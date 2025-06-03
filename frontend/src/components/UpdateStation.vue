<template>
  <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded shadow w-full max-w-[320px] md:max-w-md">
      <h3 class="text-lg font-semibold mb-4">Update Station</h3>
      <input
        v-model="editedItem.name"
        type="text"
        class="w-full border px-3 py-2 rounded mb-4 border-gray-400  focus:outline-none "
        placeholder="Name"
      />
      <select
        v-model="editedItem.status"
        class="w-full border px-3 py-2 rounded mb-4 border-gray-400  focus:outline-none "
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <select v-model="editedItem.type"
        class="w-full border px-3 py-2 rounded mb-4 border-gray-400  focus:outline-none ">
        <option value="ac_level_1">AC Level 1</option>
        <option value="ac_level_2">AC Level 2</option>
        <option value="dc_ccs">DC CCS</option>
        <option value="dc_GB/T">DC GB/T</option>
      </select>
        <input
            v-model="editedItem.poweroutput"
            type="number"
            class="w-full border px-3 py-2 rounded mb-4 border-gray-400  focus:outline-none "
            placeholder="Power Output (kW)"
            step="any"
        />
        <input 
            v-model="editedItem.location[0]"
            type="number"
            class="w-full border px-3 py-2 rounded mb-4 border-gray-400  focus:outline-none "
            placeholder="Location Name" 
            step="any"
        />
        <input 
            v-model="editedItem.location[1]"
            type="number"
            class="w-full border px-3 py-2 rounded mb-4 border-gray-400  focus:outline-none "
            placeholder="Location Name" 
            step="any"
        />
      <div class="flex gap-2">
        <button @click="$emit('cancel')" class="px-3 py-1 text-white w-full bg-[#06202B] rounded border-2 border-[#06202B]">Cancel</button>
        <button @click.prevent="save" class=" px-3 py-1  w-full text-[#06202B] rounded bg-transparent border-2 border-[#06202B]">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'

const props = defineProps({
  item: Object,
})
const emit = defineEmits(['cancel', 'save'])

// Create a local editable copy
const editedItem = reactive({ ...props.item })

watch(() => props.item, (newItem) => {
  Object.assign(editedItem, newItem)
})

const save = () => {
  if (editedItem.poweroutput <= 0  || editedItem.latitude > 90 || editedItem.latitude < -90 || editedItem.longitude > 180 || editedItem.longitude < -180) {
    alert("Please enter valid values for power output, latitude, and longitude.");
    return;
  }
  emit('save', { ...editedItem })
}
</script>
