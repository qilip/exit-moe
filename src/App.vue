<template>
  <div class="h-screen flex flex-col">
    <UrlInput class="grow"/>
    <Copyright class="grow-0"/>
  </div>
</template>

<script>
import UrlInput from './components/UrlInput.vue'
import Copyright from './components/Copyright.vue'

export default {
  name: 'App',
  components: {
    UrlInput,
    Copyright,
  }
}
</script>
