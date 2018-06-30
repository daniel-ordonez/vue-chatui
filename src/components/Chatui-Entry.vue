<template>
    <div class="chatui-entry-wrapper" :class="{'chatui-user-entry':userEntry}">
        <entry-loading class="chatui-entry" v-if="isLoading"></entry-loading>
        <div class="chatui-entry" v-else-if="embeddedHTML" v-html="embeddedHTML"></div>
        <div class="chatui-entry" v-else>{{text}}</div>
    </div>
</template>

<script>
import EntryLoading from './Chatui-Entry-Loading.vue'
export default {
    components:{
        EntryLoading
    },
    props:{
        "data":Object
    },
    computed:{
        userEntry:{
            get(){
                return this.data.user;
            }
        },
        embeddedHTML:{
            get(){
                return typeof this.data.html === "string" ? this.data.html : false;
            }
        },
        isLoading:{
            get(){
                return this.data.loading;
            }
        },
        text:{
            get(){
                return this.data.text;
            }
        }
    },
    methods:{
        scrollIntoView(){
            this.$el.scrollIntoView();
        },
        readable(){
            this.data.loading = false;
            typeof this.data.onReadable === "function" && this.data.onReadable();
        }
    },
    mounted() {
        if( this.data.loading === true && this.data.timeout && typeof this.data.timeout === "number" ){
            setTimeout( ()=>{ this.readable(); }, this.data.timeout );
        }else{
            this.readable();
        }
        this.$emit("mounted",this);
    },
}
</script>

<style>
.chatui-entry{
    word-wrap: break-word;
    word-wrap: break-all;
    position: relative;
    padding: 0.75em;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 2em;
    background: rgba(0, 0, 0, 0.16);
    min-width: 1em;
    min-height: 1em;
    align-self: flex-start;
    margin-right: 1em;
}
.chatui-user-entry>.chatui-entry{
    margin-left: 1em;
    margin-right: 0;
}

.chatui-entry-wrapper{
    margin-bottom: 0.5em;
    margin-left: 0;
    margin-right: auto;
    padding-right: 1em;
}
.chatui-entry-wrapper.chatui-user-entry{
    margin-left: auto;
    margin-right: 0;
    padding-right: 0;
    padding-left: 1em;
}
</style>
