const ServiceUrl = "http://localhost:5000";

let objMapping = {};
let algoMapping = {};

const App = new Vue({
  el: '#app',
  data: {
    children: [
    ]
  },
  methods: {
    addChildren (comp) {
      this.children.push(comp);
    },
  }
});

function getOneObjectForType(type) {
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

function getObjectFromId(id) {
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
