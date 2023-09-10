<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="Email" v-model="email">
    <div class="password">
      <input :type="showPassword" placeholder="Password" v-model="password">
      <span @click="togglePassword" :class="{'rotate': showPassword == 'text'}"><i class="fa-solid fa-eye"></i></span>
    </div>
    <div class="error">{{error}}</div>
    <button :disabled="isPending">{{ isPending ? 'Loading' : 'Log in' }}</button>


  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin'
import {useRouter} from 'vue-router'
export default {
  setup(){
    const showPassword = ref("password")
    const router = useRouter()

    const togglePassword = () => {
      showPassword.value = showPassword.value == "password" ? "text" : "password"
    }

    const email = ref()
    const password = ref()
    const {error, login, isPending} = useLogin()

    const handleSubmit = async() => {
      const res = await login(email.value, password.value)

      if(!error.value){
              router.push({name : 'UserPlaylist'})

      }
    }
    return {showPassword, togglePassword, error, handleSubmit, email, password, isPending}
  }
}
</script>

<style scoped>
.password{
  display: flex;

}

.password span{
    border: 0;
    border-bottom: 1px solid var(--secondary);
    padding: 10px;
    outline: none;

    margin: 20px auto;
    caret-color: transparent;
      cursor: pointer;

}
.fa-eye:active {
  transform: scale(1.2);
  transition: transform 0.1s ease;
}


</style>