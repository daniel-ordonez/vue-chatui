<template>
    <textarea v-model="text"
    @keyup.13="submit"
    v-on="$listeners"
    :placeholder="placeholder"
    cols="40"
    rows="4"
    class="chatui-input-text">
    </textarea>
</template>

<script>
export default {
    props:{
        "options":Object
    },
    data(){
        return{
            text:""
        }
    },
    computed:{
        placeholder:{
            get(){ return this.options.placeholder ? this.options.placeholder : "Type something..."; }
        }
    },
    methods:{
        submit(){
            let defaults = this.options && this.options.defaults ? this.options.defaults : {};
            let input = Object.assign( {"text":this.text}, defaults )
            this.$emit( 'submit', input );
            this.text = "";
        }
    }
}
</script>

<style>
.chatui-input-text{
    border: none;
    outline: none;
    padding: 0.5em;
    padding-left: 2em;
    padding-right: 2em;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
textarea{
    resize: none;
}
</style>