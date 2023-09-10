import { projectAuth } from '@/firebase/config'
import { faL } from '@fortawesome/free-solid-svg-icons'
import {ref} from 'vue'

const error = ref(null)
const isPending = ref(false)
const signup = async (email, password, displayName) => {
    error.value = null

    try{
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        isPending.value = true
        if(!res){
            throw new Error("Could not complete the sign up")
        }

        await res.user.updateProfile({displayName})
        isPending.value = false
        error.value = null
    }catch(err){
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

const useSignup = () => {
    return { error, signup, isPending }
}

export default useSignup