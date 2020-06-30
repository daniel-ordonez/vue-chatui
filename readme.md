# Vue ChatUI

A Vuejs component for creating conversational UIs based on simple 2-way chat.

[![npm version][0]][1]

![vue-chatui screenshot](https://raw.githubusercontent.com/daniel-ordonez/vue-chatui/master/screenshots/sample.PNG)
## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Support](#support)
* [Contributing](#contributing)
* [License](#license)
* [Bonus](#buy-me-a-coffee)
## Installation
### Client side
```html
<!-- add scripts and style -->
<script src="https://unpkg.com/vue"></script>
<script src="./VueChatui.umd.js"></script>
<link rel="stylesheet" href="./VueChatui.css">
<!-- add the component tag -->
<div id="app">
  <vue-chatui></vue-chatui>
</div>
<!-- instantiate your Vue app and add component -->
<script>
// VueChatui is globally accessible
new Vue({
  components: {
    VueChatui: VueChatui
  }
}).$mount('#app')
</script>
```
### NPM

Import the package
```node
npm i @daniel-ordonez/vue-chatui
```
Register the component in Vue
```javascript
import { VueChatui } from '@daniel-ordonez/vue-chatui';
export default{
	components:{
    	VueChatui
    }
}
```
Use the component tag
```html
<template>
	<vue-chatui></vue-chatui>
</template>
```

## Usage
To access your component easily use the ref attribute
```html
<vue-chatui ref="chat"></vue-chatui>
```

Then assign it to a variable
```javascript
// 'this' is your Vue instance
let {chat} = this.$refs;
```

### Adding text programatically
```javascript
//Passing a plain string will add a new text bubble at the left
chat.addEntry("Bot says hello!");
//You can pass an object with the property 'user:true' to add the bubble at the right
chat.addEntry( { text : "User says hi!", user : true } );
```

The function addEntry accepts either a string or an object with the following structure:

| Property | Type     | Description |
|----------|----------|-------------|
|text      |String    |the text to show in the chat bubble|
|user      |Boolean   |if true the chat bubble will appear at the right|
|loading   |Boolean   |if true shows a three dots animation in the chat bubble instead of text until the loadingTimeout expires |
|loadingTimeout   |Number    |time in milliseconds to show the animation when loading, after that loading is set to false, and text becomes readable|

If it's given a string, the rest attributes will set to defult
`{ user: false, loading: true, loadingTimeout: 500 }`

The **_addEntry_** function returns a new object with the same attributes plus a new one

| Property | Type     | Description |
|----------|----------|-------------|
|readable  |Promise   |if loading, resolves after loadingTimeout when the text becomes visible, else, resolves immediately|


### User input text
```javascript
//This enables a textarea for the user
chat.userInput("text");
```

When the user submits (by pressing the send button), the text is put into an object (data) and _addEntry_ is called
```javascript
/*
data = {
 text: <whatever the user typed>,
 user: true,
 loading: false
}
*/
addEntry(data);
```

All that is made under the hood, **_userInput_** returns a Promise that resolves after the new chat bubble with the user text is readable. 

### Using with async/await
```javascript
async talk = (chat) => {
  //Use the readable promise
  await chat.addEntry("What's your name?").readable;
  let name = await chat.userInput("text");
  //userInput returns an object after the user submits a response
  await chat.addEntry(`Nice to meet you ${name.text}`).readable;
  console.log("done");
}
```

If you want to only capture the user's input without adding a new entry, use **_getUserInput_**

```javascript
async talk = (chat) => {
  await chat.addEntry("Tell me a secret").readable;
  let secret = await chat.getUserInput();
  //storeSecure( secret.text );
  await chat.addEntry("Your secret is safe with me").readable;
  console.log("done");
}
```
It works the same as _userInput_ but the Promise resolves right after the user submits returning the object
```javascript
{
 text: <whatever the user typed>,
 user: true,
 loading: false
}
```

## Support

Please [open an issue](https://github.com/daniel-ordonez/vue-chatui/issues/new) for support.

>Be aware that some features may be under development

## Contributing

1. Please check whether another person has raised a pull request for same issue before creating one.
2. Please check issues created before requesting for a feature.
3. Open a pull request explaining what changes it brings.
4. Add references where applicable.

## License

[GNU](https://tldrlegal.com/license/gnu) General Public License

## Buy me a coffee

<a href="https://www.buymeacoffee.com/danielordonez" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

Yay! 🎉 You reached the end.

[0]: https://img.shields.io/badge/npm-0.3-lightgrey.svg
[1]: https://www.npmjs.com/package/@daniel-ordonez/vue-chatui