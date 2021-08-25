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
template|String/Function|This takes the HTML code to render inside the **el** Element.
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
The **Boxer** function has a render function unlike the **Box** function for rendering.
The **Boxer** takes two parameters.


Attribute | Type | Description
------------ | ------------- | -------------
el|HTML Element/CSS Selector|This is either a HTML Element or CSS selector for selecting the element.
box Object|Box Object|This is the box Object containing data for the Box UI.

The **Syncer** takes in an array of Box Objects returned from **Boxer**.

The **Boxer** function returns an array of Box Objects when the **el** attribute selector matches more than 1 Element.

The **Syncer** is now used to set the prop of all the Box Objects using one instance of the **Syncer** instead of having to loop through the Box Objects.

Now that we fully understand how BoxJS works.
Let's move to the Element attribute part.

## Box Attributes

### b-on
**b-on** is a special Box Element Attribute for attaching Event Listener to Elements.

This is how the **b-on** Attribute works.

`b-on:[event]=[Box MethodName|Function]`

```html
<button b-on:click="hideMe"> Click Me</button>
```
This will attach an `onclick` Event on the button.

### b-value
**b-value** is used to bind a prop to value attribute of an Element.

This is how the **b-value** attribute works.

`b-value=[PropName]`

Example

index.html
```html
<div id="demo"></div>
```
script.js
```javascript
let demo = {
    data:{
        name:"",
    },
    template:function(){
        return `
        <h1>My name is {{name}}</h1>
        <input b-value="name" placeholder="Enter Your Name">
        `
    }
}

let bx = new Boxer("#demo",demo).render();
```

This will automatically set any text you write in the `Input` Element to the prop `name` which updates the `H1` Element
