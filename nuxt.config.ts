import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',

  css: [
    '@/assets/css/main.css',
  ],

  // https://v3.nuxtjs.org/api/configuration/nuxt.config#modules
  modules: [
    // https://github.com/vuejs/pinia
    '@pinia/nuxt',
    // https://vueuse.org/functions.html
    '@vueuse/nuxt',
    // './modules/auth/module',
  ],
})
