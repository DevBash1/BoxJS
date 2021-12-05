//A fake company is not a company that's not there,
//It's a company that's not real.
//   -- Dev Bash

//In the end,
//Its not about who said,
//But who stayed.
//     -- Dev Bash

function Box(obj) {
    let box = this;
    let data = {};
    let methods = {};
    let watch = {};
    let create = {};
    let start = {};
    let styles = {};
    let length = 0;
    let $el;
    let len = 0;

    //for storing children element
    let children = [];

    let elements = [];
    let elementsTemplate = [];
    let elementsProps = {};
    let scanListenedElement = [];

    //for elements and properties
    let tag = [];
    let tagProp = [];
    let tagData = [];

    //for elements and switch
    let elementSwitch = [];
    let switchProp = [];
    let switchMap = [];
    let switchCase = [];
    let switchDefault = [];

    //for elements if and else
    let elementFlow = [];
    //1:if 2:else 3:main
    let flowProp = [];
    let flowMap = [];

    //for loop data storing
    let elementLoop = [];
    let loopProp = [];
    let loopMap = [];
    let loopName = [];
    let loopMapName = [];
    let loopIterator = [];

    //for props in props
    let propProp = [];
    let modelProp = [];
    let modelMap = [];
    let modelReal = [];

    if (obj.component != undefined) {/* Stay like this for now


        if (obj.el == undefined) {
            throw ("[Box Error]: el Not Specified");
        }
        if (obj.template == undefined) {
            throw ("[Box Error]: template Not Specified");
        }

        let dom = document.createElement("html");
        dom.innerHTML = obj.template;
        let body = dom.getElementsByTagName("body")[0];
        if (body.children.length == 0) {
            throw ("[Box Error]: Invalid template");
        }

        let elem;
        if(typeof obj.el == "string"){
            elem = document.querySelector(obj.el).children;
        }else{
            elem = obj.el.children;
        }
        children = [];
        getChildren(elem);
        elem = children;
        for (i = 0; i < elem.length; i++) {
            if (elem[i].tagName.toLowerCase() == obj.component.toLowerCase()) {
                if (body.children.length != 0) {
                    elem[i].innerHTML = body.innerHTML;
                    scanHtml(elem[i]);
                    scanListen();
                } else {
                    //Work on this later
                    let attributes = Object.values(body.children[0].attributes);
                    elem[i].setAttribute("is", body.children[0].tagName.toLowerCase());
                    attributes.forEach(function(attribute) {
                        elem[i].setAttribute(attribute.name, attribute.value);
                        //console.log(attribute.value, attribute.name)
                    })
                }
            }
        }
        */
    }

    if (obj.el == undefined) {
        console.warn("[Box Error]: el not set");
        return false;
    }

    if (obj.styles != undefined) {
        styles = obj.styles;
    }

    if (obj.data != undefined) {
        //Asign data attributes to main object
        let attributes = Object.keys(obj.data);
        attributes.forEach(function(attribute) {
            data[attribute] = obj.data[attribute];
            box[attribute] = obj.data[attribute];
            //Add data to methods
            methods[attribute] = obj.data[attribute];
        });
        //set attributes length
        len = attributes.length;
    }

    if (obj.watch != undefined) {
        watch = obj.watch;
        let elem;

        if (typeof obj.el == "string") {
            elem = document.querySelector(obj.el);
        } else {
            elem = obj.el;
        }
        watch.$el = elem;
    }

    if (obj.creation != undefined) {
        create = obj.creation;
    }

    if (obj.methods != undefined) {

        let tempMethods = Object.values(obj.methods);
        tempMethods.forEach(function(method) {
            if (typeof method != "function") {
                throw (method + " is not of type function");
            }
        });
        Object.keys(obj.methods).forEach(function(method) {
            methods[method] = obj.methods[method];
        });

        let elem;

        if (typeof obj.el == "string") {
            elem = document.querySelector(obj.el);
        } else {
            elem = obj.el;
        }

        methods.$el = elem;

    }

    if (obj.el != undefined) {
        element = obj.el;
        let elem;

        if (typeof obj.el == "string") {
            elem = document.querySelector(obj.el);
        } else {
            elem = obj.el;
        }

        if (obj.template != undefined) {
            if (typeof obj.template == "function") {
                let run = obj.template();
                if (run == undefined || run == null) {
                    console.warn("[Box]: Template Error");
                } else {
                    elem.innerHTML = run;
                }
            } else {
                elem.innerHTML = obj.template;
            }
        }

        if (elem == null) {
            throw ("[Box Error]: Element Not Found!");
        }
        box.$el = elem;
        $el = elem;
        scanHtml(elem);
    }

    if (obj.start != undefined) {
        Object.keys(methods).forEach(function(method) {
            start[method] = methods[method];
        });

        start.$start = obj.start;
        start.$el = $el;
        try {
            start.$start();
        } catch (e) {
            console.warn("[Box Error]: " + e)
        }

        //Sync box with any changes made to props in start
        Object.keys(box).forEach(function(attribute) {
            if (start[attribute] != undefined) {
                if (typeof start[attribute] != "function") {
                    box[attribute] = start[attribute];
                }
            }
        })
    }

    this.scan = function() {
        //Rescan All Elements under El
        scanHtml(box.$el);
        //Fix stored elements and delete removed elements
        fixElements();
    }

    let loop = setInterval(function() {
        //Catch Any Error and stop loop
        try {
            let attributes = Object.keys(data);

            //watch for new attributes
            if (Object.keys(box).length > len) {
                let newAttributes = getNewAttributes();
                newAttributes.forEach(function(attribute) {
                    if (attribute.startsWith("$")) {
                        //handle special attributes
                        if (attribute == "$method") {
                            let value = box.$method[0]
                            let func = box.$method[1];
                            if (typeof func != "function") {
                                throw ("Second Item must be of type 'function'");
                            }
                            if (typeof value != "string") {
                                throw ("First Item must be of type 'string'");
                            }
                            methods[value] = func;
                            delete box.$method;
                        }
                        if (attribute == "$watch") {
                            let value = box.$watch[0]
                            let func = box.$watch[1];
                            if (typeof func != "function") {
                                throw ("Second Item must be of type 'function'");
                            }
                            if (typeof value != "string") {
                                throw ("First Item must be of type 'string'");
                            }
                            watch[value] = func;
                            delete box.$watch;
                        }
                    } else {
                        //handle normal attributes
                        let tempCreate = Object.keys(create);
                        tempCreate.forEach(function(created) {
                            if (attribute == created) {
                                try {
                                    create[created](box[attribute]);
                                    delete create[created];
                                } catch (e) {
                                    console.warn("[Box Error]: " + e)
                                }
                            }
                        })
                    }
                })
            }

            attributes.forEach(function(attribute) {

                loopName.forEach(function(loop, i) {
                    if (loop == attribute) {
                        //watch for attribute change in loop properties
                        if (data[attribute].toString() != loopProp[i].toString()) {
                            //check if new updated data is still an array
                            if (typeof data[attribute] == "object") {
                                let html = "";

                                //get children
                                children = [];
                                getChildren(elementLoop[i].children);
                                //remove children data
                                children.forEach(function(child) {
                                    if (elements.includes(child)) {
                                        let index = elements.indexOf(child);
                                        elements.splice(index, 1);
                                        elementsTemplate.splice(index, 1);
                                    }
                                })

                                data[attribute].forEach(function(item) {
                                    elementLoop[i].setAttribute("b-loop", item + " in " + data[attribute]);
                                    elementLoop[i].setAttribute("b-map", loopMap[i].replace(loopIterator[i], item));
                                    html += loopMap[i].replace(loopIterator[i], item);
                                })
                                //Append new items
                                elementLoop[i].innerHTML = html;

                                //get new children
                                children = [];
                                getChildren(elementLoop[i].children);

                                children.forEach(function(elem) {
                                    scanElement(elem);
                                    matchEvents(elem);
                                })
                                loopProp[i] = data[attribute].toString().split(",");
                            }
                        }

                    }
                })

                loopMapName.forEach(function(loop, i) {
                    if (loop[i] == attribute) {
                        //watch for attribute change in loop properties
                        if (loopMap[i] != data[attribute]) {
                            //check if new updated data is still an array
                            if (typeof data[attribute] == "string") {
                                if (data[attribute] != loopMap[i]) {
                                    let html = "";

                                    //get children
                                    children = [];
                                    getChildren(elementLoop[i].children);
                                    //remove children data
                                    children.forEach(function(child) {
                                        if (elements.includes(child)) {
                                            let index = elements.indexOf(child);
                                            elements.splice(index, 1);
                                            elementsTemplate.splice(index, 1);
                                        }
                                    })

                                    loopProp[i].forEach(function(item) {
                                        elementLoop[i].setAttribute("b-loop", item + " in " + data[attribute]);
                                        elementLoop[i].setAttribute("b-map", loopMap[i].replace(loopIterator[i], item));
                                        html += data[attribute].replace(loopIterator[i], item);
                                    })
                                    //Append new items
                                    elementLoop[i].innerHTML = html;

                                    //get new children
                                    children = [];
                                    getChildren(elementLoop[i].children);

                                    children.forEach(function(elem) {
                                        scanElement(elem);
                                        matchEvents(elem);
                                    })
                                    loopMap[i] = data[attribute];
                                }
                            }
                        }
                    }
                })

                //Listen for string change
                if (data[attribute] != box[attribute]) {
                    start[attribute] = box[attribute];

                    //watch for switch attribute change
                    switchProp.forEach(function(prop, index) {
                        if (prop == attribute) {
                            let cases = switchCase[index];
                            let value = false;
                            cases.forEach(function(each) {
                                let option = mapProps(each.split(":")[0].trim());
                                let match = mapProps(each.split(":")[1].trim());

                                if (box[attribute] == option) {
                                    if (box[attribute] != match) {
                                        value = mapProps(match);
                                    }
                                }
                            })
                            if (value) {
                                if (box[switchMap[index]] != value) {
                                    box[switchMap[index]] = value;
                                }
                            } else {
                                if (box[switchMap[index]] != switchDefault[index]) {
                                    box[switchMap[index]] = switchDefault[index];
                                }
                            }

                            elementSwitch[index].setAttribute("b-switch", box[attribute] + ":" + box[switchMap[index]]);
                        }
                    })
                    //watch for if and else attribute change
                    flowProp.forEach(function(flow, i) {
                        //check if
                        if (flow[0].includes(attribute)) {
                            elementFlow[i].setAttribute("b-if", "true");
                            elementFlow[i].setAttribute("b-else", "false");
                            //evaluate if
                            if (evalProp(repProps(flowMap[i][0]))) {
                                try {
                                    elementFlow[i].innerHTML = mapProps(flowMap[i][2]);
                                } catch (e) {
                                    elementFlow[i].value = mapProps(flowMap[i][2]);
                                }
                                //update element mapper and properties
                                elements.forEach(function(elem, index) {
                                    if (elem == elementFlow[i]) {
                                        elementsProps[index] = flowProp[i][2];
                                        elementsTemplate[index] = flowMap[i][2];
                                    }
                                })
                                //scan for children
                                children = [];
                                getChildren(elementFlow[i].children);
                                if (children.length != 0) {
                                    children.forEach(function(kid) {
                                        scanElement(kid);
                                        matchEvents(kid);
                                    })
                                }
                            } else {
                                elementFlow[i].setAttribute("b-if", "false");
                                elementFlow[i].setAttribute("b-else", "true");
                                try {
                                    elementFlow[i].innerHTML = mapProps(flowMap[i][1]);
                                } catch (e) {
                                    elementFlow[i].value = mapProps(flowMap[i][1]);
                                }
                                //update element mapper and properties
                                elements.forEach(function(elem, index) {
                                    if (elem == elementFlow[i]) {
                                        elementsProps[index] = flowProp[i][1];
                                        elementsTemplate[index] = flowMap[i][1];
                                    }
                                })
                                //scan for children
                                children = [];
                                getChildren(elementFlow[i].children);
                                if (children.length != 0) {
                                    children.forEach(function(kid) {
                                        scanElement(kid);
                                        matchEvents(kid);
                                    })
                                }
                            }
                        }
                    })

                    //watch for tag property change
                    tagData.forEach(function(tagDetails, i) {
                        tagDetails.properties.forEach(function(props,j){
                            if(props.includes(attribute)){
                                getProps(tag[i],tagProp[i][j])
                            }
                        })
                    })

                    //Detect Change
                    if (watch != undefined) {

                        let tempWatch = Object.keys(watch);

                        if (tempWatch.includes(attribute) && typeof obj.watch[attribute] == "function") {
                            try {
                                let run = watch[attribute](box[attribute], data[attribute]);
                                //sync props set in watch function 
                                if (watch != null) {
                                    Object.keys(watch).forEach(function(each) {
                                        if (typeof watch[each] != "function") {
                                            box[each] = watch[each];
                                        }
                                    })
                                }
                            } catch (e) {
                                console.warn("[Box Error]: " + e);
                            }
                        }
                    }

                    data[attribute] = box[attribute];
                    methods[attribute] = box[attribute];

                    //Rescan on any attribute change
                    Object.values(elementsProps).forEach(function(props, i) {
                        if (props.includes(attribute)) {
                            scanElement(elements[i]);
                            //Rescan All Children
                            if (elements[i].children.length != 0) {
                                children = [];
                                getChildren(elements[i].children);
                                children.forEach(function(child) {
                                    scanElement(child);
                                    scanListen(child);
                                })
                            }
                        }
                    })
                }
                if (methods[attribute] != box[attribute]) {
                    if (typeof methods[attribute] != "function") {
                        box[attribute] = methods[attribute];
                    }
                }
                if (start[attribute] != box[attribute] && box[attribute] == data[attribute]) {
                    if (start[attribute] != undefined) {
                        if (typeof start[attribute] != "function") {
                            //console.log(box[attribute], start[attribute],data[attribute]);
                            box[attribute] = start[attribute];
                            //console.log(box[attribute], start[attribute],data[attribute]);
                        }
                    }
                }
            });
        } catch (e) {
            //stop loop first
            clearInterval(loop);
            throw ("[Box Error]: " + e);
        }
    }, 1);

    //Kill Instance
    box.$kill = function() {
        clearInterval(loop);
        let keys = Object.keys(box);
        keys.forEach(function(key) {
            delete box[key];
        })
        Object.freeze(box);
    }
    function getChildren(parents) {
        for (let i = 0; i < parents.length; i++) {
            let child = parents[i];
            if (child.children.length == 0) {
                if (!children.includes(child)) {
                    children.push(child);
                }
            } else {
                if (!children.includes(child)) {
                    children.push(child);
                }
                getChildren(child.children);
            }
        }
    }

    function scanHtml(el) {
        if (el.children.length != 0) {
            let hasInput = false;

            //check for inputs and value reading elements
            children = [];
            getChildren(el.children);

            children.forEach(function(child) {
                if (child.isContentEditable == true || child.tagName == "INPUT" || child.tagName == "TEXTAREA") {
                    hasInput = true;
                }
            })

            if (!hasInput) {
                scanElement(el);
                scanListen();
            }

            //get children
            children = [];
            getChildren(el.children);

            children.forEach(function(child) {
                scanElement(child);
            })
            scanListen();
        } else {
            scanElement(el);
            scanListen();
        }
    }

    //Check for this stuff {{ }}
    function scanElement(el) {
        try {
            let elem = el;
            let html;
            let index;
            let elemProps;
            if (elements.includes(elem)) {
                index = elements.indexOf(elem);
                html = elementsTemplate[index];
                elemProps = elementsProps[index];
            } else {
                elements.push(elem);
                elementsTemplate.push(elem.innerHTML);
                index = elements.indexOf(elem);
                html = elem.innerHTML;
                elementsProps[index] = [];
                elemProps = elementsProps[index];
            }
            //console.log(el);
            let start = 0;
            let hasOpen = false;
            let hasClose = false;
            let open = null;
            let close = null;
            let count = 0;
            let prop = null;
            let props = [];
            let realProps = [];
            let propsReplace = [];
            let propsResult = [];

            let realTemplate = html;

            if (html.includes("{{") && html.includes("}}")) {
                let o = 0;
                while (start < html.length) {
                    o++;
                    //console.log(start,html.length)

                    if (!hasOpen && !hasClose) {
                        open = html.indexOf("{{", start);
                        if (open == -1) {
                            break;
                        } else {
                            start = open
                        }
                        hasOpen = true;
                    } else if (hasOpen && !hasClose) {
                        close = html.indexOf("}}", start);
                        if (close == -1) {
                            break;
                        } else {
                            start = close + 2;
                        }
                        if (close > open) {
                            hasOpen = false;
                            prop = html.substring(open, close + 2);
                            props.push(prop);
                            realProps.push(prop.replace("{{", "").replace("}}", "").trim());
                            //console.log(props);
                            //console.log(realProps);
                            prop = null;
                        }
                    } else {
                        break;
                    }
                    //Debugging purpose
                    if (o > 50) {
                        console.warn("[Box Error]: " + "End");
                        break;
                    }
                }
                if (props.length != 0) {
                    realProps.forEach(function(prop, i) {
                        let propSplit = prop.split(" ");
                        let tempPropSplit = [];
                        let tempData = Object.keys(data);
                        let tempMethods = Object.keys(methods);

                        if (propSplit.length == 1) {
                            if (tempData.includes(prop)) {
                                propsReplace.push("box." + prop);
                                if (elemProps.includes(prop) == false) {
                                    elemProps.push(prop);
                                }
                            } else if (tempMethods.includes(prop)) {
                                propsReplace.push("methods." + prop + "()");
                            } else {
                                propsReplace.push(prop);
                            }
                        } else {
                            propSplit.forEach(function(prop2) {
                                if (tempData.includes(prop2)) {
                                    tempPropSplit.push("box." + prop2);
                                    if (elemProps.includes(prop2) == false) {
                                        elemProps.push(prop2);
                                    }
                                } else if (tempMethods.includes(prop2)) {
                                    tempPropSplit.push("methods." + prop2 + "()");
                                } else {
                                    tempPropSplit.push(prop2);
                                }
                            });
                            propsReplace.push(tempPropSplit.join(" "));
                            tempPropSplit = [];
                        }
                    });
                    propsReplace.forEach(function(test) {
                        try {
                            let result = eval("(" + test + ")");

                            if (!test.includes(".") && result == "") {
                                propsResult.push("{{" + test + "}}")
                            } else {
                                propsResult.push(result);
                            }
                        } catch (e) {
                            propsResult.push(test);
                            elemProps.push(test);
                            let err = e.toString().substring(0, 50);
                            console.warn("[Box Error]: " + err);
                        }
                    })
                    props.forEach(function(prop, i) {
                        let tempReplaceProp = propsResult[i];
                        html = html.replace(prop, tempReplaceProp);
                    })
                    if (elem.innerHTML != html) {
                        elem.innerHTML = html;
                        //Rescan Children
                        children = [];
                        getChildren(elem.children);
                        children.forEach(function(child) {
                            scanElement(child);
                            scanListen(child);
                        })
                    }
                }
            }

        } catch (e) {
            console.warn("[Box Error]: " + e);
        }
    }

    function scanListen() {
        try {
            let BoxAttributes = ["b-value", "b-html", "b-switch", "b-if", "b-else", "b-loop", "b-map"];
            //Go through children
            elements.forEach(function(child) {
                if (!scanListenedElement.includes(child)) {
                    let attributes = child.attributes;
                    if (attributes.length != 0) {
                        for(i=0;i<attributes.length;i++){
                            let attribute = attributes[i];
                                let value = attribute.value;
                                let key = attribute.name;
                                if (!key.startsWith("b-")) {
                                    getProps(child, key);
                                }
                        }
                        
                        if (attributes.getNamedItem("b-value")) {
                            let value = child.getAttribute("b-value");
                            child.oninput = function() {
                                child.setAttribute("b-value", child.value);
                                box[value] = child.value;
                            }
                        }
                        if (attributes.getNamedItem("b-html")) {
                            let value = child.getAttribute("b-html");
                            child.onchange = function() {
                                child.setAttribute("b-html", child.innerHTML);
                                box[value] = child.innerHTML;
                            }
                        }
                        if (attributes.getNamedItem("b-switch")) {
                            let value = child.getAttribute("b-switch");

                            if (!value.includes(":")) {
                                throw ("b-switch: Invalid Switch Attribute");
                            }
                            value = value.split(":");
                            if (value.length != 2) {
                                throw ("b-switch: Switch Expects 2 Parameters");
                            }
                            let from = value[0];
                            let switcher = value[1];
                            if (box[from] == undefined) {
                                throw (from + " is undefined");
                            }
                            if (box[switcher] == undefined) {
                                throw (switcher + " is undefined");
                            }
                            switchDefault.push(box[switcher]);
                            if (attributes.getNamedItem("b-case")) {
                                let cases = child.getAttribute("b-case");
                                if (cases.trim() == "") {
                                    throw ("b-case can not be empty");
                                }
                                if (cases.trim().endsWith(";")) {
                                    cases = cases.substring(0, cases.length - 1);
                                }
                                cases = cases.split(";");
                                cases.forEach(function(each, i) {
                                    if (!each.includes(":")) {
                                        throw ("b-case: Invalid case at " + each.trim());
                                    }
                                    if (each.trim().split(":").length != 2) {
                                        throw ("b-case: Unexpected " + each.trim().split(":")[2])
                                    }
                                    let option = each.trim().split(":")[0];
                                    let match = each.trim().split(":")[1];
                                    if (box[from] == mapProps(option)) {
                                        box[switcher] = mapProps(mapProps(match));
                                    }
                                })
                                child.setAttribute("b-switch", box[from] + ":" + box[switcher]);
                                switchProp.push(from);
                                switchMap.push(switcher);
                                switchCase.push(cases);
                                elementSwitch.push(child);

                                //scan for children
                                children = [];
                                getChildren(child.children);
                                if (children.length != 0) {
                                    children.forEach(function(kid) {
                                        scanElement(kid);
                                        matchEvents(kid);
                                    })
                                }
                            } else {
                                throw ("b-switch Expects b-case");
                            }
                        }
                        if (attributes.getNamedItem("b-if")) {
                            let value = child.getAttribute("b-if");
                            let mapped = repProps(value);
                            let value2;
                            let mapped2;
                            let realMap;
                            let realProps;

                            child.setAttribute("b-if", evalProp(mapped));

                            if (attributes.getNamedItem("b-else")) {
                                value2 = child.getAttribute("b-else");
                                mapped2 = mapProps(value2);
                                if (!evalProp(mapped)) {
                                    try {
                                        child.innerHTML = mapped2;
                                    } catch (e) {
                                        child.value = mapped2;
                                    }
                                    child.setAttribute("b-else", "true")
                                }
                                //find and update elements mapper and properties
                                elements.forEach(function(elem, index) {
                                    if (elem == child) {
                                        realMap = elementsTemplate[index];
                                        realProps = elementsProps[index]
                                        elementsProps[index] = propList(value2);
                                        elementsTemplate[index] = value2;
                                    }
                                })
                                if (!elementFlow.includes(child)) {
                                    elementFlow.push(child);
                                    flowProp.push([propList(value), propList(value2), realProps]);
                                    flowMap.push([value, value2, realMap]);
                                }
                                //scan for children
                                children = [];
                                getChildren(child.children);
                                if (children.length != 0) {
                                    children.forEach(function(kid) {
                                        scanElement(kid);
                                        matchEvents(kid);
                                    })
                                }
                            }
                        }
                        if (attributes.getNamedItem("b-loop")) {
                            let value = child.getAttribute("b-loop");
                            //validate b-loop option
                            if (value.split(" ").length != 3) {
                                throw ("b-loop Error")
                            }
                            if (value.split(" ")[1] != "in") {
                                throw ("b-loop expects keyword 'in'")
                            }
                            let html = "";
                            let each = value.split(" ")[0];
                            let all1 = value.split(" ")[2];
                            let all = mapProps("{{" + all1 + "}}").split(",");

                            if (attributes.getNamedItem("b-map")) {
                                let map = mapProps(child.getAttribute("b-map"));
                                all.forEach(function(item) {
                                    child.setAttribute("b-loop", item + " in " + all);
                                    child.setAttribute("b-map", map.replace(each, item));
                                    html += map.replace(each, item);
                                })
                                if (all.length == 0 || all.length == 1 && all[0] == "") {
                                    html = "";
                                }
                                child.innerHTML += html;
                                elementLoop.push(child);
                                loopProp.push(all);
                                loopMap.push(map);
                                loopName.push(all1)
                                loopMapName.push(propList(child.getAttribute("b-map")))
                                loopIterator.push(each);
                                //Scan children
                                children = [];
                                getChildren(child.children)
                                children.forEach(function(kid) {
                                    scanElement(kid);
                                    matchEvents(kid);
                                })
                            } else {
                                throw ("b-loop expects attribute b-map");
                            }
                        }
                        if (attributes.getNamedItem("b-once")) {
                            let index = elements.indexOf(child);
                            elementsProps[index] = [];
                            child.setAttribute("b-once", elementsTemplate[index]);
                            elementsTemplate[index] = child.innerHTML;

                        }
                        //Style Parser
                        function objToStyle(obj) {
                            let myStyle = "";
                            try {
                                let keys = Object.keys(obj);
                                keys.forEach(function(key) {
                                    let value = obj[key];
                                    if (typeof value != "function" && typeof value != "object") {
                                        if (typeof value == "string") {
                                            let word = "";
                                            key.split("").forEach(function(i) {
                                                if (i == i.toUpperCase()) {
                                                    word += ("-" + i.toLowerCase())
                                                } else {
                                                    word += i;
                                                }
                                            })
                                            myStyle += word + ": " + value + "; ";
                                        } else if (typeof value == "number") {
                                            let word = "";
                                            key.split("").forEach(function(i) {
                                                if (i == i.toUpperCase()) {
                                                    word += ("-" + i.toLowerCase())
                                                } else {
                                                    word += i;
                                                }
                                            })
                                            myStyle += word + ": " + value + "px" + "; ";
                                        }
                                    }
                                });
                                return myStyle.trim();
                            } catch (e) {
                                console.warn("[Box Error]: b-style error");
                                return "";
                            }
                        }

                        if (attributes.getNamedItem("b-style")) {
                            let ElemStyle = child.getAttribute("b-style").trim();
                            if (ElemStyle.startsWith("{") && ElemStyle.endsWith("}")) {
                                let formattedStyle = objToStyle(eval("(" + ElemStyle + ")"));
                                if (child.getAttribute("style") == null) {
                                    child.setAttribute("style", formattedStyle);
                                } else {
                                    if (child.getAttribute("style").trim().endsWith(";")) {
                                        child.setAttribute("style", child.getAttribute("style") + formattedStyle);
                                    } else {
                                        child.setAttribute("style", child.getAttribute("style") + ";" + formattedStyle);
                                    }
                                }
                                child.setAttribute("b-style",formattedStyle);
                            } else {
                                try {
                                    let formattedStyle = objToStyle(eval("(" + ElemStyle + ")"));
                                    if (child.getAttribute("style") == null) {
                                        child.setAttribute("style", formattedStyle);
                                    } else {
                                        if (child.getAttribute("style").trim().endsWith(";")) {
                                            child.setAttribute("style", child.getAttribute("style") + formattedStyle);
                                        } else {
                                            child.setAttribute("style", child.getAttribute("style") + ";" + formattedStyle);
                                        }
                                    }
                                    child.setAttribute("b-style",formattedStyle);
                                } catch (e) {
                                    console.warn("[Box Error]: b-style error");
                                }
                            }
                        }
                        matchEvents(child);
                    }
                    //Add to Scanned Elements
                    scanListenedElement.push(child);
                }
            })

        } catch (e) {
            console.warn("[Box Error]: " + e);
        }
    }

    //get new attributes
    function getNewAttributes() {
        let newAttributes = Object.keys(box);
        let oldAttributes = Object.keys(data);
        let attributes = [];
        newAttributes.forEach(function(attribute) {
            if (!oldAttributes.includes(attribute)) {
                attributes.push(attribute);
            }
        })
        return attributes;
    }

    function getProps(child, property) {
        let elemProps;
        let html;
        let set;
        if (!tag.includes(child)) {
            tag.push(child);
            let index = tag.indexOf(child);
            if(tagProp[index] == undefined){
                tagProp[index] = [];
            }
            tagProp[index].push(property);

            tagData[index] = {};
            tagData[index].mapper = [];
            tagData[index].mapper.push(child.getAttribute(property));
            tagData[index].properties = [];
            tagData[index].properties[0] = [];
            elemProps = tagData[index].properties[0];
            html = child.getAttribute(property);
            set = tagProp[index][tagProp[index].indexOf(property)];
        } else {
            let index = tag.indexOf(child);
            let i = tagProp[index].indexOf(property);
            if(i == -1){
                tagProp[index].push(property);
                tagData[index].mapper.push(child.getAttribute(property))
                tagData[index].properties.push([]);
                elemProps = tagData[index].properties[tagData[index].properties.length -1];
                set = property;
                html = child.getAttribute(property);
            }else{
                elemProps = tagData[index].properties[i];
                set = property;
                html = tagData[index].mapper[i];
            }

            /*
            elemProps = tagData[index].properties[index];
            html = tagData[index].mapper;
            property = tagProp[index][tagProp[index].indexOf(property)];
            set = tagProp[index];
            */
        }
        //console.log(tagData,tagProp,elemProps);

        let start = 0;
        let hasOpen = false;
        let hasClose = false;
        let open = null;
        let close = null;
        let count = 0;
        let prop = null;
        let props = [];
        let realProps = [];
        let propsReplace = [];
        let propsResult = [];

        let realTemplate = html;

        if (html.includes("{{") && html.includes("}}")) {
            let o = 0;
            while (start < html.length) {
                o++;
                //console.log(start,html.length)

                if (!hasOpen && !hasClose) {
                    open = html.indexOf("{{", start);
                    if (open == -1) {
                        break;
                    } else {
                        start = open
                    }
                    hasOpen = true;
                } else if (hasOpen && !hasClose) {
                    close = html.indexOf("}}", start);
                    if (close == -1) {
                        break;
                    } else {
                        start = close + 2;
                    }
                    if (close > open) {
                        hasOpen = false;
                        prop = html.substring(open, close + 2);
                        props.push(prop);
                        realProps.push(prop.replace("{{", "").replace("}}", "").trim());
                        //console.log(props);
                        //console.log(realProps);
                        prop = null;
                    }
                } else {
                    break;
                }
                //Debugging purpose
                if (o > 50) {
                    //console.warn("[Box Error]: " +"End");
                    break;
                }
            }
        }
        if (props.length != 0) {
            realProps.forEach(function(prop, i) {
                //age + 100 -54
                let propSplit = prop.split(" ");
                let tempPropSplit = [];
                let tempData = Object.keys(data);
                let tempMethods = Object.keys(methods);

                if (propSplit.length == 1) {
                    if (tempData.includes(prop)) {
                        propsReplace.push("box." + prop);
                        if (elemProps.includes(prop) == false) {
                            elemProps.push(prop);
                        }
                    } else if (tempMethods.includes(prop)) {
                        propsReplace.push("methods." + prop + "()");
                    } else {
                        propsReplace.push(prop);
                    }
                } else {
                    propSplit.forEach(function(prop2) {
                        if (tempData.includes(prop2)) {
                            tempPropSplit.push("box." + prop2);
                            if (elemProps.includes(prop2) == false) {
                                elemProps.push(prop2);
                            }
                        } else if (tempMethods.includes(prop2)) {
                            tempPropSplit.push("methods." + prop2 + "()");
                        } else {
                            tempPropSplit.push(prop2);
                        }
                    });
                    propsReplace.push(tempPropSplit.join(" "));
                    tempPropSplit = [];
                }
            });
            propsReplace.forEach(function(test) {
                try {
                    let result = eval("(" + test + ")");
                    propsResult.push(result);
                } catch (e) {
                    let err = e.toString().substring(0, 50);
                    throw (console.error(err));
                }
            })
            props.forEach(function(prop, i) {
                let tempReplaceProp = propsResult[i];
                html = html.replace(prop, tempReplaceProp);
            })
        }
        child.setAttribute(set, html);
        //console.log(tagData,tagProp,elemProps);
    }

    function evalProp(test) {
        try {
            let result = eval("(" + test + ")");
            return result;
        } catch (e) {
            return false;
        }
    }
    function mapProps(html) {
        let start = 0;
        let hasOpen = false;
        let hasClose = false;
        let open = null;
        let close = null;
        let count = 0;
        let prop = null;
        let props = [];
        let realProps = [];
        let propsReplace = [];
        let propsResult = [];

        let realTemplate = html;

        if (html.includes("{{") && html.includes("}}")) {
            let o = 0;
            while (start < html.length) {
                o++;
                //console.log(start,html.length)

                if (!hasOpen && !hasClose) {
                    open = html.indexOf("{{", start);
                    if (open == -1) {
                        break;
                    } else {
                        start = open
                    }
                    hasOpen = true;
                } else if (hasOpen && !hasClose) {
                    close = html.indexOf("}}", start);
                    if (close == -1) {
                        break;
                    } else {
                        start = close + 2;
                    }
                    if (close > open) {
                        hasOpen = false;
                        prop = html.substring(open, close + 2);
                        props.push(prop);
                        realProps.push(prop.replace("{{", "").replace("}}", "").trim());
                        //console.log(props);
                        //console.log(realProps);
                        prop = null;
                    }
                } else {
                    break;
                }
                //Debugging purpose
                if (o > 50) {
                    //console.warn("[Box Error]: " +"End");
                    break;
                }
            }
            if (props.length != 0) {
                realProps.forEach(function(prop, i) {
                    //age + 100 -54
                    let propSplit = prop.split(" ");
                    let tempPropSplit = [];
                    let tempData = Object.keys(data);
                    let tempMethods = Object.keys(methods);

                    if (propSplit.length == 1) {
                        if (tempData.includes(prop)) {
                            propsReplace.push("box." + prop);
                        } else if (tempMethods.includes(prop)) {
                            propsReplace.push("methods." + prop + "()");
                        } else {
                            propsReplace.push(prop);
                        }
                    } else {
                        propSplit.forEach(function(prop2) {
                            if (tempData.includes(prop2)) {
                                tempPropSplit.push("box." + prop2);
                                if (elemProps.includes(prop2) == false) {
                                    elemProps.push(prop2);
                                }
                            } else if (tempMethods.includes(prop2)) {
                                tempPropSplit.push("methods." + prop2 + "()");
                            } else {
                                tempPropSplit.push(prop2);
                            }
                        });
                        propsReplace.push(tempPropSplit.join(" "));
                        tempPropSplit = [];
                    }
                });
                propsReplace.forEach(function(test) {
                    try {
                        let result = eval("(" + test + ")");
                        propsResult.push(result);
                    } catch (e) {
                        let err = e.toString().substring(0, 50);
                        //console.error(err);
                        propsResult.push(test);
                    }
                })
                props.forEach(function(prop, i) {
                    let tempReplaceProp = propsResult[i];
                    html = html.replace(prop, tempReplaceProp);
                })
            }
            props.forEach(function(prop, i) {
                let tempReplaceProp = propsResult[i];
                html = html.replace(prop, tempReplaceProp);
            })
            return html;
        }
        return html;
    }
    function repProps(html) {
        let start = 0;
        let hasOpen = false;
        let hasClose = false;
        let open = null;
        let close = null;
        let count = 0;
        let prop = null;
        let props = [];
        let realProps = [];
        let propsReplace = [];
        let propsResult = [];

        let realTemplate = html;

        if (html.includes("{{") && html.includes("}}")) {
            let o = 0;
            while (start < html.length) {
                o++;
                //console.log(start,html.length)

                if (!hasOpen && !hasClose) {
                    open = html.indexOf("{{", start);
                    if (open == -1) {
                        break;
                    } else {
                        start = open
                    }
                    hasOpen = true;
                } else if (hasOpen && !hasClose) {
                    close = html.indexOf("}}", start);
                    if (close == -1) {
                        break;
                    } else {
                        start = close + 2;
                    }
                    if (close > open) {
                        hasOpen = false;
                        prop = html.substring(open, close + 2);
                        props.push(prop);
                        realProps.push(prop.replace("{{", "").replace("}}", "").trim());
                        //console.log(props);
                        //console.log(realProps);
                        prop = null;
                    }
                } else {
                    break;
                }
                //Debugging purpose
                if (o > 50) {
                    //console.warn("[Box Error]: " +"End");
                    break;
                }
            }
            if (props.length != 0) {
                realProps.forEach(function(prop, i) {
                    //age + 100 -54
                    let propSplit = prop.split(" ");
                    let tempPropSplit = [];
                    let tempData = Object.keys(data);
                    let tempMethods = Object.keys(methods);

                    if (propSplit.length == 1) {
                        if (tempData.includes(prop)) {
                            propsReplace.push("box." + prop);
                        } else if (tempMethods.includes(prop)) {
                            propsReplace.push("methods." + prop + "()");
                        } else {
                            propsReplace.push(prop);
                        }
                    } else {
                        propSplit.forEach(function(prop2) {
                            if (tempData.includes(prop2)) {
                                tempPropSplit.push("box." + prop2);
                                if (elemProps.includes(prop2) == false) {
                                    elemProps.push(prop2);
                                }
                            } else if (tempMethods.includes(prop2)) {
                                tempPropSplit.push("methods." + prop2 + "()");
                            } else {
                                tempPropSplit.push(prop2);
                            }
                        });
                        propsReplace.push(tempPropSplit.join(" "));
                        tempPropSplit = [];
                    }
                });
                propsReplace.forEach(function(test) {
                    try {//let result = eval("(" + test + ")");
                    //propsResult.push(result);
                    } catch (e) {
                        let err = e.toString().substring(0, 50);
                        throw (console.error(err));
                    }
                })
                props.forEach(function(prop, i) {
                    let tempReplaceProp = propsReplace[i];
                    html = html.replace(prop, tempReplaceProp);
                })
            }
            return html;
        }
        return html;
    }
    function propList(html) {
        let start = 0;
        let hasOpen = false;
        let hasClose = false;
        let open = null;
        let close = null;
        let count = 0;
        let prop = null;
        let props = [];
        let realProps = [];
        let propsReplace = [];
        let propsResult = [];

        let realTemplate = html;

        if (html.includes("{{") && html.includes("}}")) {
            let o = 0;
            while (start < html.length) {
                o++;
                //console.log(start,html.length)

                if (!hasOpen && !hasClose) {
                    open = html.indexOf("{{", start);
                    if (open == -1) {
                        break;
                    } else {
                        start = open
                    }
                    hasOpen = true;
                } else if (hasOpen && !hasClose) {
                    close = html.indexOf("}}", start);
                    if (close == -1) {
                        break;
                    } else {
                        start = close + 2;
                    }
                    if (close > open) {
                        hasOpen = false;
                        prop = html.substring(open, close + 2);
                        props.push(prop);
                        realProps.push(prop.replace("{{", "").replace("}}", "").trim());
                        //console.log(props);
                        //console.log(realProps);
                        prop = null;
                    }
                } else {
                    break;
                }
                //Debugging purpose
                if (o > 50) {
                    console.warn("[Box Error]: " + "End");
                    break;
                }
            }
        }
        return realProps;
    }
    function matchEvents(el) {
        //Will fix you later
        let child = el;
        let attributes = el.attributes;
        Object.values(attributes).forEach(function(attribute) {
            let value = attribute.value;
            let key = attribute.name;
            //handle b-on
            if (key.startsWith("b-on:")) {
                let event = key.substring(5);
                if (typeof eval("methods." + value) == "function") {
                    child.addEventListener(event, function(e) {
                        let result = false;
                        try {
                            result = eval("(methods." + value + "())");
                        } catch (e) {
                            throw ("[Box Error]: " + e);
                        }
                        child.setAttribute(key, result);
                    });
                } else {
                    child.addEventListener(event, function(e) {
                        let result = false;
                        try {
                            result = eval("(" + value + "())");
                        } catch (e) {
                            throw ("[Box Error]: " + e);
                        }
                        child.setAttribute(key, result);
                    });
                }
            }
            if (key.startsWith("b-bind:")) {
                let bind = key.substring(7);
                //Leave for now finish later
                child.onchange = function() {
                    console.log(value);
                }
            }
        })
    }
    function fixElements() {
        let all = document.querySelectorAll("*");
        let real_all = [];
        for (i = 0; i < all.length; i++) {
            real_all.push(all[i]);
        }
        elements.forEach(function(elem, index) {
            if (!real_all.includes(elem)) {
                elements.splice(index, 1);
            }
        });
    }
}

//Boxer for Attachable UI 

function Boxer(el, obj) {
    let newObj = {};
    let all = [];
    let ui;
    let elem;
    Object.assign(newObj,obj);

    if (typeof el == "string") {
        elem = document.querySelectorAll(el)
    } else {
        elem = el;
    }
    if (elem.length == undefined) {
        newObj.el = el;
        ui = {
            render: function() {
                return new Box(newObj);
            }
        }
    } else if (elem.length == 1) {
        newObj.el = elem[0];
        ui = {
            render: function() {
                return new Box(newObj);
            }
        }
    } else if (elem.length > 1) {
        for (i = 0; i < elem.length; i++) {
            let elemObj = {};
            Object.assign(elemObj,newObj);
            elemObj.el = elem[i];
            all.push(elemObj);
        }
        ui = {
            render: function() {
                let new_all = [];
                all.forEach(function(func) {
                    let each = new Box(func);
                    new_all.push(each);
                })
                return new_all;
            }
        }
    } else {
        ui = {
            render: function() {
                console.warn("[Box Error]: Error rendering " + el);
            }
        }
    }
    return ui;
}

//Sync multiple Boxs

function Syncer(boxs) {
    let sync = {};
    let bad = [];

    boxs.forEach(function(box, i) {
        if (box.constructor.name != "Box") {
            console.warn("[Box Error]: " + box + " is not a Box Component");
            bad.push(i);
        }
    })

    bad.forEach(function(i) {
        boxs.splice(i, 1);
    })

    let loop = setInterval(function() {
        try {
            let keys = Object.keys(sync);
            keys.forEach(function(key) {
                if (!key.startsWith("$")) {
                    boxs.forEach(function(box) {
                        box[key] = sync[key];
                    })
                }
                delete sync[key];
            })
        } catch (e) {
            clearInterval(loop);
            console.log(e);
        }
    }, 1);
    return sync;
}

function BoxClone(obj){
    let newObj = {};
    Object.assign(newObj,obj);
    return newObj;
}

//For use with NodifyJS

try {
    module.exports = {
        Box,
        Boxer,
        Syncer,
        BoxClone
    }
} catch (e) {}
