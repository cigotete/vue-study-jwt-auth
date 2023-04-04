<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>Name:</label>
        <input type="text" v-model="name" required>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <div>
        <label>password Confirmation:</label>
        <input type="password" v-model="password_confirmation" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import store from '@/store/auth';

export default {
  setup() {
    const name = ref('Milusete');
    const email = ref('milu@sete.com');
    const password = ref('12345678');
    const password_confirmation = ref('12345678');

    const submitForm = async () => {
      const credentials = {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      };
      try {
        await store.dispatch('register', credentials);
        // Redirect to the login page or the home page
      } catch (error) {
        console.error(error);
      }
    };

    return {
      name,
      email,
      password,
      password_confirmation,
      submitForm,
    };
  },
};
</script>
