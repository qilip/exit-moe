<template>
  <div class="h-screen flex flex-col selection:bg-cyan-200 selection:text-cyan-900">
    <UrlInput class="grow"/>
    <Copyright class="grow-0"/>
  </div>
</template>

<script>
import UrlInput from './components/UrlInput.vue'
import Copyright from './components/Copyright.vue'

export default {
  name: 'Home',
  components: {
    UrlInput,
    Copyright,
  }
}
</script>
