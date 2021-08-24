# BoxJS
BoxJS is a framework for building micro user interfaces.

# Introduction

BoxJS is a framework inspired by [VueJS](https://vuejs.org/) and
[ReactJS](https://reactjs.org/).
BoxJS is easy to use and very powerful.
It makes creating reusable UI components easy.

# Installation

Add BoxJS to the bottom of the body tag

```html
<script src="path/to/box.js"></script>
```
or import with [NodifyJS](https://github.com/DevBash1/NodifyJS)
```javascript
let { Box } = require("path/to/box.js");
```
# Usage

BoxJS comes with three functions for doing three different things.

1. **Box** is the main function for working with UI.
2. **Boxer** is used to render imported or reusable UI components.
3. **Syncer** is used to set props for muiltiple Box UIs.

The **Box** function is a bit similar to the Vue function for [VueJS](https://vuejs.org/).
This a demo of the **Box** function.

index.html
```html
<div id="box-demo">
  <p>My name is {{name}}</p>
</div>
```

script.js
```javascript
let bm = new Box({
  el:"#box-demo",
  data:{
    name: "Favour",
  }
})
```

This will render "My name is Favour" in the Paragraph Element.
As you can see there is no render function for **Box**.
The **Box** function takes an Object as parameter.
This Object can contain any of this attributes.

Attribute | Type | Description
------------ | ------------- | -------------
el|HTML Element/CSS Selector|This is either a HTML Element or CSS selector for selecting the element.
data|JSON/String,number,boolean|This stores all the props, expects only string,number,boolean values.
methods|JSON/Function|This takes only functions that you can call from your Box UI component.
watch|JSON/Function|This takes a json with list of functions with props name for callback function to listen for props change.It takes two parameter (The new prop value, The old prop value).
template|String|This takes the HTML code to render inside the **el** Element.
start|Function|This takes a function that will run once the UI is mounted.

This is a demo of **Boxer**.

index.html
```html
<script src="clicker.box"></script>
<script src="script.js"></script>
<div id="demo"></div>
```

script.js
```javascript
let clickMe = new Boxer("#demo",clicker).render();
```

clicker.box
```javascript
let clicker = {
    data:{
        count:0,
    },
    methods:{
        add:function(){
            this.count++;
        }
    },
    template:"<button b-on:click='add'>Add #{{count}}</button>"
}
```
