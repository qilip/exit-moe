<template>
  <div class="h-screen flex items-center justify-center text-center font-light font-localsans">
    <p>
      redirecting...
    </p>
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  created() {
    window.location.href = `https://api.exit.moe/${this.$route.params.slug}`;
  }
}
</script>
