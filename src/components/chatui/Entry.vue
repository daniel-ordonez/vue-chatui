<template>
  <div class="chatui-entry" :user="isUser">
    <entry-loading 
      v-if="isLoading" 
      class="chatui-entry_content"
    />
    <div 
      v-else-if="embeddedHTML"
      class="chatui-entry_content"  
      v-html="embeddedHTML"
    />
    <div 
      v-else
      class="chatui-entry_content"
    >
      {{text}}
    </div>
  </div>
</template>

<script>
import EntryLoading from './EntryLoading.vue'
export default {
    components: { EntryLoading },
    props:{
      'data': { type: Object, default: () => ({}) }
    },
    computed:{
      isUser () { return this.data.user },
      embeddedHTML () { return typeof this.data.html === "string" ? this.data.html : false },
      isLoading () { return this.data.loading },
      text () { return this.data.text }
    },
    methods:{
      scrollIntoView(){
        this.$el.scrollIntoView()
      },
      makeReadable(){
        this.data.loading = false
        this.data.makeReadable()
        typeof this.data.onReadable === "function" && this.data.onReadable()
      }
    },
    mounted() {
      let {loading, loadingTimeout} = this.data
      if (loading === true && typeof loadingTimeout === "number") {
        setTimeout(this.makeReadable, loadingTimeout)
      } else this.makeReadable()
      this.$emit('mounted', this)
    },
}
</script>

<style>

.chatui-entry[user]>.chatui-entry{
  margin-left: 1em;
}
.chatui-entry[user] {
  margin-left: auto;
  padding-left: 1.618em;
  animation: popin .3s cubic-bezier(0.39, 0.575, 0.565, 1) forwards;
}
.chatui-entry:not([user])>.chatui-entry{
  margin-right: 1em;
}
.chatui-entry:not([user]) {
  margin-right: auto;
  padding-right: 1.618em;
}
.chatui-entry_content{
    word-wrap: break-word;
    word-wrap: break-all;
    position: relative;
    padding: 0.618em 1em;
    border-radius: 1.31em;
    background: var(--chat--entry-bg-color, #eee);
    color: black;
    min-width: 1em;
    min-height: 1em;
    z-index: 1;
}
.chatui-entry[user] .chatui-entry_content{ 
  background: var(--chat--user-entry-bg-color, var( --chat--entry-bg-color, black));
  color: var(--chat--user-entry-text-color, white);
  z-index: 0;
}
@keyframes popin {
  from {
    transform: translate(0, 1em);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
