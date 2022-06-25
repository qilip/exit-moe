<template>
  <div class="container mx-auto item-center justify-center font-light flex flex-col">
    <div>
      <h1 class="font-['lato'] font-thin text-8xl text-gray-900">exit.moe</h1>
    </div>
    <div class="flex justify-center mb-4">
      <input type="text" spellcheck="false" placeholder="https://example.com" autofocus
      class="w-full border-2 border-gray-300 hover:border-gray-400
      focus:outline-none focus:border-gray-500 text-gray-700 rounded-lg text-lg pl-3 pr-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      v-model.trim="longUrl" v-on:keyup="urlValidate" v-on:keyup.enter="shorten" :disabled="isShortened===true"/>
      <button class="ml-4 inline-flex text-gray-700 py-3 px-6 shadow-lg bg-cyan-300 hover:bg-cyan-400 shadow-cyan-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="isUrl===false || isShortened===true" @click.once="shorten">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
    <div class="text-center">
      <p>
        링크는 30일 뒤 만료됩니다.
      </p>
      <button class="shortened-link text-2xl inline-flex py-3 px-5 rounded-lg shadow-lg items-center focus:outline-none flex"
      v-bind:class="[
        beforeCopy ? 'bg-gray-100 hover:bg-gray-200 shadow-gray-100' : 'bg-green-300 hover:bg-green-400 shadow-green-200',
        isShortened ? '' : 'invisible'
      ]"
      @click="linkCopy">
        {{ shortenedLink }}
        <div class="ml-3" v-if="beforeCopy">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
          </svg>
        </div>
        <div class="ml-3" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  name:'UrlInput',
  data() {
    return {
      longUrl: '',
      isUrl: false,
      shortenedLink: 'shortenedURL',
      isShortened: false,
      beforeCopy: true,
    }
  },
  methods: {
    urlValidate() {
      if (this.longUrl.match(/^(http|https):\/\/[^ "]+\.[^ "]+$/)) {
        this.isUrl = true;
      } else {
        this.isUrl = false;
      }
    },
    linkCopy() {
      navigator.clipboard.writeText(this.shortenedLink);
      this.beforeCopy = false;
    },
    shorten() {
      (async () => {
        try {
          const response = await axios.post('https://api.exit.moe/shorten', { url: this.longUrl });
          this.shortenedLink = response.data.shortenedUrl;
          this.isShortened = true;
        } catch (error) {
          //TODO: 오류메시지 출력
          console.log(error);
        }
      })();
    }
  }
}
</script>
