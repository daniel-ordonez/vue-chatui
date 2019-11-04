<template>
  <div class="chatui-input-text">
    <textarea v-model="text"
      v-on="$listeners"
      :placeholder="placeholder"
      cols="40"
      rows="3"
    >
    </textarea>
    <button 
      class="chatui-input-text_btn--submit"
      @click="submit"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        stroke-width="3" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M12 19V6M5 12l7-7 7 7"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ChatuiInputText',
  props:{
    data: { type: Object, default: () => ({}) }
  },
  data(){
    return{
      text:""
    }
  },
  computed:{
    placeholder () {
      return this.data.placeholder ? this.options.placeholder : "Type here..."
    }
  },
  methods:{
    submit(){
      let {text} = this
      let input = { text, user: true, loading: false }
      this.$emit('submit', input)
      this.text = ""
    }
  }
}
</script>

<style>
.chatui-input-text {
  display: flex;
}
.chatui-input-text>textarea{
    border: none;
    outline: none;
    padding: 0.5em;
    padding-left: 2em;
    padding-right: 2em;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    resize: none;
}
button.chatui-input-text_btn--submit {
  outline: none;
  border: none;
  appearance: none;
  margin: 0;
  padding: 0;
  min-width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
}
button.chatui-input-text_btn--submit:hover {
  background: rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
button.chatui-input-text_btn--submit>svg {
  fill: none;
  stroke: black;
  width: 1rem;
  height: 1rem;
}

</style>