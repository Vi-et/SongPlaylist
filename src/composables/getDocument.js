import {ref, watchEffect} from 'vue'
import { projectFireStore } from '@/firebase/config'

const getDocument = (collection, id) => {
    const document = ref(null)
    const error = ref(null)

    let documentRef = projectFireStore.collection(collection).doc(id)

    
    
    const unsub = documentRef.onSnapshot((doc) => {
            if(doc.data()){
                document.value = {...doc.data(), id: id}
                error.value = null
            }else{
                error.value = 'That document does not exit'
            }
        }, err => {
        console.log(err.message)
        error.value = "Could not fetch data"
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })


    return {document, error}
}

export default getDocument