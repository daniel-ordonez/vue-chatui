<template>
  <div id="app">
    <div class="chat-container">
      <chatui ref="chat"/>
    </div>
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
      let {chat} = this.$refs
      await chat.addEntry("Yo! 👋").readable
      await chat.addEntry("Try typing something down bellow.").readable
      await chat.userInput("text")
      await chat.addEntry("Now, try typing something else").readable
      await chat.addEntry({
        img: 'https://media.giphy.com/media/ZZu3MCdRI3LJm/giphy.gif',
        text: "I'm gonna caputure your input"
      }).readable
      let input = await chat.getUserInput("text")
      await chat.addEntry({
        html: `Here's what you typed: <i><b>${input.text}</b></i>`
      }).readable
      await chat.addEntry("Is that correct?").readable
      let {text} = await chat.userInput("select", ['Yes', 'No'])
      if (text === 'No') {
        await  chat.addEntry('... OK, everbody makes mistakes').readable
        await chat.addEntry({
          img: 'https://media.giphy.com/media/rYEAkYihZsyWs/giphy.gif'
        }).readable
      } else {
        await chat.addEntry({
          img: 'https://media.giphy.com/media/9GIuYF4OoqwGTE7oUd/giphy.gif',
          text: 'OK 👌'
        }).readable
      }
      await chat.addEntry({
        html: `Wanna try the NPM package? go <a href="https://www.npmjs.com/package/@daniel-ordonez/vue-chatui">here</a>`
      })
    }
  },
  mounted() {
    this.demo()
  },
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
*, *::after, *::before {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background-color: #00bb77;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");
}
.chatui_entries::-webkit-scrollbar {
  display: none;
  opacity: 0;
}
.chat-container {
  width: 100%;
  max-width: 375px;
  max-height: 812px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 16px;
  background: white;
}
</style>
