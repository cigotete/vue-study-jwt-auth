<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import store from '@/store/auth';
import router from '@/router'

export default {
  setup() {
    const email = ref('');
    const password = ref('');

    const submitForm = async () => {
      const credentials = {
        email: email.value,
        password: password.value
      };
      try {
        await store.dispatch('login', credentials);
        router.push({ name: 'Dashboard' });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      email,
      password,
      submitForm,
    };
  },
};
</script>
