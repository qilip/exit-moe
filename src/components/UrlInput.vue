<template>
  <div class="container mx-auto justify-center font-light flex flex-col px-6">
    <div>
      <h1 class="font-['Lato'] font-thin text-gray-900 text-6xl md:text-8xl">exit.moe</h1>
    </div>
    <div class="flex justify-center mb-4">
      <input type="url" spellcheck="false" placeholder="https://example.com" autofocus autocomplete=”off”
      class="w-full border-2 border-gray-300 hover:border-gray-400
      focus:outline-none focus:border-gray-500 text-gray-700 rounded-lg text-lg pl-3 pr-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      v-model.trim="longUrl.url" v-on:keyup.enter="shorten" :disabled="inputDisabled"/>
      <button class="ml-4 inline-flex text-gray-700 py-3 px-6 shadow-lg bg-cyan-300 hover:bg-cyan-400 shadow-cyan-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="inputDisabled" @click="shorten">
        <svg v-if="inputDisabled" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
    <MessageBox v-bind:urlprops="{longUrl, shortenedLink, status, error}"/>
  </div>
</template>

<script>
import axios from 'redaxios';
import MessageBox from './MessageBox.vue';

export default {
  name:'UrlInput',
  components: {
    MessageBox
  },
  data() {
    return {
      longUrl: {
        url: '',
        invalid: false,
        exitmoe: false,
      },
      shortenedLink: '',
      status: 'ready', // ready, invalid, error, loading, success
      error: null,
    }
  },
  computed: {
    inputDisabled() {
      return this.status === 'success' || this.status === 'loading' || this.status === 'error';
    }
  },
  methods: {
    urlValidate () {
      const isUrlRegEx = /^(http|https):(\/)+[^ "]+\.[^ "]+$/i;
      const isExitmoeRegEx = /^(http|https):(\/)+(.*\.)?(exit\.moe)(:[0-9]{1,5})?(\/.*)?$/i;
      this.longUrl.invalid = !isUrlRegEx.test(this.longUrl.url);
      this.longUrl.exitmoe = isExitmoeRegEx.test(this.longUrl.url);
      if(this.longUrl.invalid || this.longUrl.exitmoe) return false;
      else return true;
    },
    shorten() {
      this.status = 'loading';
      if (this.urlValidate() === false) {
        this.status = 'invalid';
        return;
      }
      (async () => {
        try {
          const response = await axios.post('https://api.exit.moe/shorten', { url: this.longUrl.url });
          this.shortenedLink = 'https://exit.moe/' + response.data.slug;
          this.status = 'success';
        } catch (error) {
          this.status = 'error';
          this.error = error;
        }
      })();
    }
  }
}
</script>
