<template>
    <div class="add-song" >
        <button @click="showForm = !showForm" v-if="!showForm">Add Song</button>
        <form action="" v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add Song</h4>
            <input type="text" placeholder="Song Title" required v-model="title">
            <input type="text" placeholder="Artist" required v-model="artist">
            <button>Add</button>
        </form>
    </div>
</template>

<script>

import {ref} from 'vue'
import useDocument from '@/composables/useDocument'

export default {
    props:['playlist'],
    setup(props){
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)
        const {updateDoc} = useDocument('playlists',props.playlist.id)

        const handleSubmit = async () => {
            let newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random()*1000000 )
            }           
            
            await updateDoc({
                songs: [...props.playlist.songs, newSong]
            })

            title.value = ""
            artist.value = ""
        }
        return {title, artist, showForm, handleSubmit}
    }
}
</script>

<style scoped>
    .add-song{
        text-align: center;
        margin-top: 40px;
    }

    form{
        text-align: left;
        max-width: 100%;
    }
</style>