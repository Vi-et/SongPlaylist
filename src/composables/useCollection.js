import {ref} from  'vue'
import { projectFireStore } from '../firebase/config'

const useCollection = (collection) =>{
    const error = ref(null)

    const addDoc = async(doc) => {
        error.value = null

        try {
            console.log("Đã vào function useCollection")
            console.log(collection)
            const res = await projectFireStore.collection(collection).add(doc)
            return res
        }catch(err){
            console.log(err.message)
            error.value = "Could not send the message"
        }
    }

    return {error, addDoc}
}

export default useCollection