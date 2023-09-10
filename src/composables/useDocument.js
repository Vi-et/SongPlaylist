import {ref} from 'vue'
import { projectFireStore } from '@/firebase/config'

const useDocument = (collection, id) => {

    const error = ref(null)
    const isPending = ref(null)
    let docRef = projectFireStore.collection(collection).doc(id)

    const deleteDoc = async () => {
        error.value = null
        isPending.value = true

        try{
            const res = await docRef.delete()
            isPending.value = false
            return res
        }catch(err){
            isPending.value = false
            error.value = "Could not delete the document"
        }
    }


    const updateDoc = async (updates) => {
        error.value = null
        isPending.value = true

        try{
            const res = await docRef.update(updates)
            isPending.value = false
            return res
        }catch(err){
            isPending.value = false
            error.value = "Could not delete the document"
        }
    }
    return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument