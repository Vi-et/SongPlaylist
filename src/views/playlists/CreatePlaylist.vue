<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description..." v-model="description"></textarea>
    <label >Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <p class="error"> {{fileError}}</p>
    <button v-if="!isPending">Create Playlist</button>
    <button v-if="isPending" disabled>Uploading...</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import {timestamp} from '@/firebase/config'
import {useRouter} from 'vue-router'

export default {
    setup(){
        const {url, filePath, uploadImage} = useStorage()
        const title = ref('')
        const description = ref('')
        const image = ref(null)
        const types = ["image/png","image/jpeg"]
        const fileError = ref(null)
        const {error, addDoc } = useCollection('playlists')
        const user = getUser()
        const isPending = ref(false)
        const router = useRouter()

        const handleSubmit = async ()  => {
            if(image.value){
                isPending.value = true
                
                await uploadImage(image.value)

                const doc = {
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                }
                const res = await addDoc(doc)

                isPending.value = false
                if(!error.value){
                    router.push({name: 'PlaylistDetail', params: {id: res.id}})
                }
            }
        }

        const handleChange = (e) => {
            const file = e.target.files[0]

            if(file && types.includes(file.type)){
                image.value = file
                console.log("Tải file lên thành công")
                fileError.value = null
            }else{
                image.value = null
                console.log("Tải file không thành công")
                fileError.value = "Please select an image file (png or jpeg)"
            }
        }

        return { title, description, handleSubmit, handleChange, fileError, isPending }
    }
}
</script>

<style>
    input[type="file"]{
        border: 0;
        padding: 0;
    }

    label{
        display: block;
        font-size: 12px;
        margin-top: 30px;
    }

    button{
        margin-top: 20px;
    }
</style>