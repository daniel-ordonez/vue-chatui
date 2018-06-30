<template>
    <div class="chatui-entry-loading">
        <div class="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>
    </div>
</template>

<style>
@keyframes blink {
    0% {
      opacity: .2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: .2;
    }
}
.chatui-entry-loading{
    width: 100%;
    height: 100%;
    min-height: 1em;
    min-width: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
}
.chatui-entry-loading>.dots{
    text-align: center;
    line-height: 1;
}
.chatui-entry-loading>.dots>span{
    font-size: 3em;
    line-height: 0;
    animation-name: blink;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
}
.chatui-entry-loading>.dots>span:nth-child(2){
    animation-delay: 0.2s;
}
.chatui-entry-loading>.dots>span:nth-child(3){
    animation-delay: 0.4s;
}
</style>
