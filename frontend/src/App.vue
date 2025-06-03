
<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>
</template>
<script setup>
import Navbar from './components/Navbar.vue';
import { provide ,ref} from 'vue'
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const data = ref(user)
provide('user', data)
</script>