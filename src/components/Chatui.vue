<template>
  <div class="chatui">
    <div class="chatui_entries" :ref="`chatEntries`">
      <chatui-entry v-for="(data, index) in entries" 
        :key="`entry-${index}`"
        :data="data"
        @mounted="entryPopped"
      > 
      </chatui-entry>
    </div>
    <div class="chatui_inputs">
      <component 
        :is="input.type" 
        :data="input.data" 
        :ref="`inputComponent`"
        @submit="onInput"
      />
    </div>
  </div>
</template>

<script>
import ChatuiEntry from './chatui/Entry'
import ChatuiInputText from './chatui/InputText'
import ChatuiInputSelect from './chatui/InputSelect'
const BASE_ENTRY = { text: '', user: false, loading: true }
export default {
  name:'chatui',
  props: {
    loadingTimeout: { type: Number, default: 500 }
  },
  components:{
    ChatuiEntry,
    ChatuiInputText,
    ChatuiInputSelect
  },
  data(){
    return{
      entries: [],
      input: {
        type: '',
        data: '',
        resolve: null
      }
    }
  },
  methods:{
    addEntry (content) {
      let {loadingTimeout} = this
      let entry = {...BASE_ENTRY, loadingTimeout}
      if (typeof content === "string") {
        entry.text = content
      } else if (typeof content === "object") {
        entry = {...entry, ...content}
      }
      this.entries.push(entry)
      entry.readable = new Promise( resolve => { entry.makeReadable = resolve })
      return entry
    }, 
    /**
     * type:String [text, select]
     * data:Object [{placeholder:String, options:String[]}]
     *  */   
    userInput (type = 'text', data) {
      // Updates input component
      type = `chatui-input-${type}`
      this.input = {type, data, resolve: null}
      // Promise resolves when input component submits and that entry is readable
      return new Promise( resolve => {
        this.input.resolve = async data => {
          let obj = this.addEntry(data)
          await obj.readable
          resolve(obj)
        }
      })
    },  
    getUserInput (type = 'text', data) {
      // Updates input component
      type = `chatui-input-${type}`
      this.input = {type, data, resolve: null}
      // Promise resolves when input component submits without making an entry
      return new Promise( resolve => {
        this.input.resolve = async data => {
          resolve(data)
        }
      })
    },
    onInput (data) {
      this.$emit('input', data)
      this.input.type = ''
      this.input.resolve(data)
    },
    entryPopped(entry){
      entry.scrollIntoView()
    }
  },
  mounted(){
    const hideScroll = (el) => {
      let scrollWidth = el.offsetWidth - el.clientWidth
      el.style.marginRight = -scrollWidth + "px"
    }
    hideScroll(this.$refs.chatEntries)
  }
}
</script>

<style>
.chatui{
  width: 100%;
  height: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr auto;
  overflow: hidden;
  position: relative;
}
.chatui_entries{
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: min-content;
    grid-row-gap: var(--chat--row-gap, .618em);
    overflow-y: auto;
    padding: 8px;
    position: relative;
    background: white;
}
.chatui_inputs{
  border-top: solid 0.5px rgba(0,0,0,0.16);
  padding-top: 0.5rem;
  min-height: 3em;
}

@supports(mix-blend-mode: screen) {
  .chatui_entries:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background:linear-gradient(135deg, #184e68 0%,#57ca85 100%);
    mix-blend-mode: screen;
    pointer-events: none;
  }
}
</style>