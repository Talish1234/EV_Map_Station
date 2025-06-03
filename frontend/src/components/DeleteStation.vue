<template>
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded shadow w-full max-w-[320px] md:max-w-md">
      <h4 class="text-md font-semibold mb-4 text-center">Do you really want to delete this station?</h4>
      <div class="flex gap-2">
        <button @click="$emit('cancel')" class=" px-3 py-1  w-full text-[#06202B] rounded bg-transparent border-2 border-[#06202B]">Cancel</button>
        <button @click.prevent="confirm" class=" px-3 py-1  w-full text-white rounded bg-red-500 border-2 border-red-500">Delete</button>
      </div>
    </div>
  </div>
</template>
<script setup> 
const props = defineProps({
  item: String,
})
const emit = defineEmits(['cancel', 'delete']);
const confirm = () => {
  emit('delete', props.item);
};
</script>