<template>
  <div class="chatui-input-select">
    <div class="chatui-input-select_options">
      <button v-for="(option, index) in data" 
        :key="`option-${index}`"
        class="chatui-input-select_button"
        @click="submit(option)"
      >
        {{option}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatuiInputSelect',
  props: { data: { type: Array, default: () => [] } },
  methods: {
    submit (text) {
      let input = { text, user: true, loading: false }
      this.$emit('submit', input)
    }
  }
}
</script>

<style>
.chatui-input-select_options {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
button.chatui-input-select_button {
  margin: .309em;
  word-wrap: break-word;
  word-wrap: break-all;
  position: relative;
  padding: 0.618em 1em;
  border-radius: 1.31em;
  background: var(--chat--input-select--option-bg-color, #eee);
  color: black;
  min-width: 1em;
  min-height: 1em;
  outline: none;
  border: none;
  appearance: none;
}
button.chatui-input-select_button:hover {
  cursor: pointer;
  background: var(--chat--input-select--option-bg-color, #ccc);
}
</style>