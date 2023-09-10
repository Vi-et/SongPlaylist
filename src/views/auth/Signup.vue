<template>
  <form @submit.prevent="handleSubmit">

    <input type="text" placeholder="Display Name" v-model="displayName">

    <input type="email" placeholder="Email" v-model="email">

    <div class="password">
      <input :type="showPassword" placeholder="Password" v-model="password">
      <span @click="togglePassword" :class="{'rotate': showPassword == 'text'}"><i class="fa-solid fa-eye"></i></span>
    </div>
    <div class="error">{{error}}</div>
    <button :disabled="isPending">{{ isPending ? 'Loading' : 'Sign up' }}</button>


  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import {useRouter} from 'vue-router'

import {ref} from 'vue'

export default {
    setup(){
    const showPassword = ref("password")
    const router = useRouter()
    const togglePassword = () => {
      showPassword.value = showPassword.value == "password" ? "text" : "password"
    }

    const email = ref()
    const password = ref()
    const displayName = ref()
    const {error, signup, isPending} = useSignup()

    const handleSubmit = async() => {
      const res = await signup(email.value, password.value,displayName.value)
      if(!error.value){
        console.log("User logged")
        router.push({name:"UserPlaylist"})

      }
    }
    return {showPassword, togglePassword, error, handleSubmit, email, password, isPending, displayName}
  }

}
</script>

<style>

</style>