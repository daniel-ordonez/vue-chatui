<template>
  <div id="app">
    <chatui ref="chatui"></chatui>
  </div>
</template>

<script>
import chatui from './components/Chatui.vue'

export default {
  name: 'app',
  components: {
    chatui
  },
  methods:{
    async demo(){
      let chat = this.$refs.chatui;
      await chat.addEntry("Yo!").readable;
      await chat.addEntry("Try typing something, check out bellow.").readable;
      let input1 = await chat.userInput("text");
      await chat.addEntry("I cant read your response after is visible").readable;
      await chat.addEntry( input1.text ).readable;
      await chat.addEntry("Now try typing something else").readable;
      let input2 = await chat.getUserInput("text");
      await chat.addEntry(`So, you wanted to say: ${input2.text}`).readable;
      await chat.addEntry("I can also get your response before it shows").readable;

      //user makrdown vue to documentate 
      //<mdvue> ```js code ``` above this
    }
  },
  mounted() {
    this.demo();
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
