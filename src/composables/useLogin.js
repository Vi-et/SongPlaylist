import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'
import { fas } from '@fortawesome/free-solid-svg-icons'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null

    try{
        isPending.value = true
        const res = await projectAuth.signInWithEmailAndPassword(email, password)

        isPending.value = false
        error.value = null
        return res

    } catch(err){
        console.log(err.value)
        error.value = "Incorrect login credentials"
        isPending.value = false
    }
}

const useLogin = () => {
    return {error, login, isPending}
}

export default useLogin