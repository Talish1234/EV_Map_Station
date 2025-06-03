<template>
  <div class="h-[calc(100vh_-_64px)] flex items-center justify-center bg-[#06202B] pb-24">
    <form
      class="border-none shadow-lg transition-all duration-500 ease-in-out shadow-[rgba(255,255,255,0.4)] hover:shadow-[rgba(255,255,255,0.7)] px-6 py-4 flex flex-col gap-4 rounded-lg items-center bg-white min-w-[18rem] md:min-w-[22rem] max-w-[18rem] md:max-w-[22rem]"
      @submit.prevent="handleSubmit"
    >
      <span class="text-3xl font-medium">Login</span>
      <div class="flex flex-col w-full gap-1">
        <label class="text-black text-md"> Email </label>
        <input
          type="email"
          placeholder="example@gmail.com"
          class="px-1 py-0.5 border-1 border-gray-400 rounded-sm focus:outline-none"
          v-model="email"
          required
        />
      </div>
      <div class="flex flex-col w-full gap-1">
        <label class="text-black text-md"> Password </label>
        <input
          type="password"
          placeholder="Password"
          class="px-1 py-0.5 border-1 border-gray-400 rounded-sm focus:outline-none"
          v-model="password"
          required
        />
        <span class="text-[12px] text-red-500">{{ message }}</span>
      </div>
      <button
        class="bg-[#06202B] cursor-pointer text-white px-6 py-1 w-full text-lg rounded-md hover:bg-[#0a2c3d] transition-colors duration-300 ease-in-out"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</template>


<script setup>
import { inject } from 'vue'
const user = inject('user');
import { BASE_URL } from "@/config";
import {useRouter} from 'vue-router';
import { ref } from "vue";

const email = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();
const handleSubmit = async () => {

  message.value = "";
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    if (response.ok) {
      const {data} = await response.json();
      localStorage.setItem("user",JSON.stringify(data));
      user.value = data; 
      router.push("/");
      alert("Login successful!");
    } else {
      const { message } = await response.json();
      message.value = errorData.message || "Login failed. Please try again.";
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again later.");
  }
};
</script>