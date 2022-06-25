<template>
  <div class="container mx-auto item-center justify-center font-light flex flex-col">
    <div>
      <h1 class="font-['lato'] font-thin text-8xl text-gray-900">exit.moe</h1>
    </div>
    <div class="flex justify-center mb-4">
      <input type="text" spellcheck="false" placeholder="https://example.com" autofocus
      class="w-full border-2 border-gray-300 hover:border-gray-400
      focus:outline-none focus:border-gray-500 text-gray-700 rounded text-lg pl-3 pr-3 py-2"/>
      <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-2 py-3 px-6 hover:bg-gray-200 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
    <div class="text-center">
      <p>
        링크는 30일 뒤 만료됩니다.
      </p>
      <div class="text-2xl bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
        https://exit.moe/SxWlI1
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'UrlInput',
}
</script>
