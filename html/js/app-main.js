const ServiceUrl = "http://localhost:5000";

let objMapping = {};
let algoMapping = {};
let objNames = {};

const App = new Vue({
  el: '#app',
  data: {
    children: [
    ],
    childrenMap: {
    }
  },
  methods: {
    addChildren (name, comp) {
      this.children.push(comp);
      this.childrenMap[name] = comp;
    },
  }
});

function GetOneObjectForType(type) {
    for (let key in algoMapping) {
        if (algoMapping[key][1]["type"].includes(type)) {
            return algoMapping[key]
        }
    }
    for (let key in objMapping) {
        if (objMapping[key][1]["type"].includes(type)) {
            return objMapping[key];
        }
    }
    return null;
}

function GetObjectFromId(id) {
    for (let key in algoMapping) {
        if (key == id) {
            return algoMapping[key];
        }
    }
    for (let key in objMapping) {
        if (key == id) {
            return objMapping[id];
        }
    }
    return null;
}

function GetChilds(obj) {
    if (obj[1]["childs"] != null) {
        let childs = [];
        let i = 0;
        while (i < obj[1].childs.length) {
            childs.push(GetObjectFromId(obj[1].childs[i]));
            i++;
        }
        return childs;
    }
    return null;
}

function GetObjectFromName(name) {
    if (objNames[name] != null) {
        return GetObjectFromId(objNames[name]);
    }
    return null;
}

function GetParentObjectOfType(obj, type) {
    let i = 0;
    while (i < obj[1]["obtainedFrom"].length) {
        let rel_obj = GetObjectFromId(obj[1]["obtainedFrom"][i]);
        if (rel_obj[1]["type"].includes(type)) {
            return rel_obj;
        }
        i++;
    }
    return null;
}