import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import {library } from '@fortawesome/fontawesome-svg-core'
import { fas} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { projectAuth } from './firebase/config'
library.add(fas)



import VTooltip from 'v-tooltip'

let app

projectAuth.onAuthStateChanged(() =>{
    if(!app){

        app = createApp(App)
        .use(router)
        .use(VTooltip)
        .component('fa', FontAwesomeIcon)
        .mount('#app')
    }
})


