<template>

    <ListView :playlists="playlists" />
    <router-link class="btn" :to="{name:'CreatePlaylist'}">Create Playlist</router-link>

</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import ListView from '@/components/ListView.vue'

export default {
    components:{ListView},
    setup(){
        const user = getUser()
        
        const {error, documents: playlists} = getCollection('playlists',['userId','==',user.value.uid]) 
        console.log(playlists)
        return {playlists, error}
    }

}
</script>

<style>

</style>