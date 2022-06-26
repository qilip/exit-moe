<template>
  <div class="text-center flex flex-col items-center h-32 my-4">
    <div class="shortened-link text-lg inline-flex py-3 px-5 rounded-lg shadow-lg items-center focus:outline-none flex bg-rose-300 hover:bg-rose-400 shadow-rose-200"
    v-if="urlprops.longUrl.invalid || urlprops.longUrl.exitmoe">
      <div class="mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>
      </div>
      <p v-if="urlprops.longUrl.invalid">
        http://, https:// 를 포함하는 URL을 입력해주세요
      </p>
      <p v-else-if="urlprops.longUrl.exitmoe">
        exit.moe는 줄일 수 없어요
      </p>
    </div>
    <div>
      <button class="shortened-link text-2xl inline-flex py-3 px-5 rounded-lg shadow-lg items-center focus:outline-none flex"
      v-bind:class="[beforeCopy ? 'bg-gray-200 hover:bg-gray-300 shadow-gray-200' : 'bg-green-300 hover:bg-green-400 shadow-green-200']"
      v-if="urlprops.isShortened"
      @click="linkCopy">
        {{ urlprops.shortenedLink }}
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
      <p class="text-md py-4" v-if="urlprops.isShortened">
        링크는 30일간 유지됩니다.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBox',
  props: {
    urlprops: {
      longUrl: Object,
      shortenedLink: String,
      isShortened: Boolean,
    }
  },
  data() {
    return {
      beforeCopy: true,
    }
  },
  methods: {
    linkCopy() {
      (async() => {
        try {
          await navigator.clipboard.writeText(this.urlprops.shortenedLink);
        } catch (error) {
          // 카카오톡 인앱브라우저 Fallback
          const copyArea = document.createElement('textarea');
          document.body.appendChild(copyArea);
          copyArea.value = this.urlprops.shortenedLink;
          copyArea.select();
          copyArea.setSelectionRange(0, 99999);
          document.execCommand('copy');
          document.body.removeChild(copyArea);
        }
      })();
      this.beforeCopy = false;
    },
  }
}
</script>
