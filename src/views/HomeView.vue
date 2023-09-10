<template>
  <div class="home">
    <div class="error" v-if="error">Could not fetch the data</div>
    <ListView :playlists = "documents"/>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'

import ListView from '@/components/ListView.vue'
export default {
  name: 'HomeView',
  components: {
    ListView
  },
  setup(){
    const {error , documents } = getCollection("playlists")
  
    return {error, documents}  
  }
}
</script>
