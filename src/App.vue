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
      await  chat.addEntry("Yo!").readable
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
}
.chat-container {
  width: 100%;
  max-width: 300px;
}
</style>
