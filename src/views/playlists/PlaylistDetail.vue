<template>
 <div class="error" v-if="error"> {{error}} </div>
 <div class="playlist-detail" v-if="playlist">
     <div class="playlist-info">
        <div class="cover">
            <img :src="playlist.coverUrl" alt="">
        </div>
        <h2> {{playlist.title}} </h2>
        <p class = "username">Created by {{playlist.userName}}  </p>
        <p class="description"> {{playlist.description}}  </p>
        <button  @click="handleDelete" v-if="ownerShip">Delete Playlist</button>
     </div>

     <div class="song-list">
        <div class="song-list">
            <div v-if="!playlist.songs.length">No song has been added yet</div>
            <div class="single-song" v-for="song in playlist.songs" :key="song.id">
                <div class="song-info">
                    <h3>{{song.title}}</h3>
                    <p>{{song.artist}}</p>
                </div>
                <button @click="handleDeleteSong(song.id)">Delete</button>
            </div>
        </div>
        <AddSong :playlist="playlist" v-if="ownerShip"/>
     </div>
 </div>
</template>

<script>
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import {computed} from 'vue'
import useDocument from '@/composables/useDocument'
import {useRouter} from 'vue-router'
import useStorage from '@/composables/useStorage'
import AddSong from "@/components/AddSong.vue"

export default {
    props: ['id'],
    components: {AddSong},
    setup(props){
        const {error, document: playlist} = getDocument('playlists', props.id)
        const user = getUser()
        const {deleteDoc, updateDoc} = useDocument('playlists',props.id)
        const router = useRouter()
        const { deleteImage } = useStorage()

        const ownerShip = computed(() => {
            return playlist.value && user.value && user.value.uid === playlist.value.userId
        })

        const handleDelete = async () => {
            await deleteImage(playlist.value.filePath)
            await deleteDoc()
            router.push({name: "home"})
        }

        const handleDeleteSong = async (id) => {
            let filteredSongs = playlist.value.songs.filter((song) => song.id != id)

            await updateDoc({songs: filteredSongs})
        }

        return {error,  playlist, ownerShip, handleDelete, handleDeleteSong}
    }
}
</script>

<style>
    .playlist-detail {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 80px
    }

    .cover{
        overflow: hidden;
        border-radius: 20px;
        position: relative;
        padding: 160px;
    }

    .cover img{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        max-width: 200%;
        max-height: 200%;
    }

    .playlist-info{
        text-align: center;
    }

    .playlist-info h2{
        text-transform: capitalize;
        font-size: 28px;
        margin-top: 20px;

    }

    .playlist-info p {
        margin-bottom: 20px;
    }

    .username{
        color: #999;
    }

    .description{
        text-align: left;
    }

    .single-song{
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px dashed var(--secondary);
        margin-bottom: 20px;
    }
</style>