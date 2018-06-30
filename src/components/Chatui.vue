<template>
    <div id="chatui">
        <div class="chatui-entries" :ref="`chatEntries`">
            <chatui-entry v-for="(data, index) in chatEntries" 
            :key="index"
            :data="data"
            @mounted="entryPoped"
            > 
            </chatui-entry>
        </div>
        <div class="chatui-inputs">
            <component 
            :is="inputComponent.name" 
            :options="inputComponent.options" 
            :ref="`inputComponent`"
            @submit="input"
            ></component>
        </div>
    </div>
</template>

<script>
import chatuiEntry from './Chatui-Entry.vue';
import chatuiInputText from './Chatui-Input-Text.vue';
export default {
    components:{
        chatuiEntry,
        chatuiInputText
    },
    data(){
        return{
            chatEntries: [],
            userPromises: null,
            inputComponent: {
                "name":"",
                "options":{
                    defaults:{
                        user:true,
                        loading: false,
                    }
                }
            },
        }
    },
    methods:{
        input( data ){
            typeof this.onInput === "function" && this.onInput( data );
            this.inputComponent.name = "";
        },
        setInputComponent( type, options ){
            switch( type ){
                case "text": 
                    this.inputComponent.name = "chatui-input-text";
            }
        },
        userInput( type ){
            this.setInputComponent( type );
            return new Promise((resolve)=>{
                this.onInput = async ( data ) => {
                    let obj = this.addEntry( data );
                    await obj.readable;
                    resolve(obj);
                }
            });
        },
        getUserInput( type ){
            this.setInputComponent( type );
            return new Promise((resolve)=>{
                this.onInput = ( data ) => {
                    resolve( data );
                }
            });
        },
        addEntry( text ){
            let obj = { "text":"", "user":false, "loading":true, "timeout":500 }
            if( typeof text === "string" ){
                obj.text = text
            }else if( typeof text === "object" ){
                obj = Object.assign( obj, text );
            }
            this.chatEntries.push( obj );
            obj.readable = new Promise((resolve)=>{
                obj.onReadable = () => resolve(); //called by chatui-entry component onReadable function
            });
            return obj;
        },
        entryPoped(entry){
            entry.scrollIntoView();
        }
    },
    mounted(){
        const hideScroll = (el) => {
            let scrollWidth = el.offsetWidth - el.clientWidth;
            el.style.marginRight = -scrollWidth + "px";
        }
        hideScroll( this.$refs.chatEntries );
    }
}
</script>

<style>
#chatui{
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc( 300px + 3rem );

    overflow: hidden;
    position: relative;
}
.chatui-entries{
    display: flex;
    flex-direction: column;
    height: calc( 100% - 3em );
    position: absolute;
    left: 0;
    right: 0;
    bottom: 3em;
    overflow-y: scroll;
    padding: 8px;
    box-sizing: border-box;
}
.chatui-inputs{
    border-top: solid 0.5px rgba(0,0,0,0.16);
    padding-top: 0.5rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3em;
}
</style>