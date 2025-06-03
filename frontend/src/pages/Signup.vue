<template>
  <div class="h-[calc(100vh_-_64px)] flex items-center justify-center bg-[#06202B] pb-24">
    <form
      class="border-none shadow-lg transition-all duration-500 ease-in-out shadow-[rgba(255,255,255,0.4)] hover:shadow-[rgba(255,255,255,0.7)] px-6 py-4 flex flex-col gap-4 rounded-lg items-center bg-white min-w-[18rem] md:min-w-[22rem] max-w-[18rem] md:max-w-[22rem]"
      @submit.prevent="handleSubmit"
    >
      <span class="text-3xl font-medium">SignUp</span>
      <div class="flex flex-col w-full gap-1">
        <label class="text-black text-md">Name</label>
        <input
          type="text"
          placeholder="Name"
          class="px-1 py-0.5 border-1 border-gray-400 rounded-sm focus:outline-none"
          v-model="name"
          required
        />
      </div>
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
        SignUp
      </button>
    </form>
  </div>
</template>
<script setup>
import { BASE_URL } from "@/config";
import { ref } from "vue";
import {useRouter} from 'vue-router';
const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const message = ref("");
const handleSubmit = async () => {
  if (password.value.length < 8) {
    message.value = "Password must be at least 8 characters long.";
    return;
  }
  if (
    !/[A-Z]/.test(password.value) ||
    !/[A-Z]/.test(password.value) ||
    !/[a-z]/.test(password.value) ||
    !/\d/.test(password.value) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password.value)
  ) {
    message.value = "Weak password.";
    return;
  }
  message.value = "";
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      alert("Signup successful! Please login.");
      router.push("/login");
      
    } else {
      const { message } = await response.json();
      message.value = errorData.message || "Signup failed. Please try again.";
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again later.");
  }
};
</script>