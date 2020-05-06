const ServiceUrl = "http://localhost:5000";

let objMapping = {};
let algoMapping = {};
let objNames = {};


let Tab = {
    template: '<div v-if="isActive">aaa</div>',
    data: function() {
        return {
            name: "pippo",
            isActive: false
        }
    }
};

let Tabs = {
    template: '<div><div class="tabs"><ul><li v-for="tab in tabs"><a v-on:click="selectTab(tab)" href="#">{{tab.data().name}}</a></li></ul></div><template v-for="(child, index) in tabs"><component :is="child" :key="child.name"></component></template></div>',

    data: function() {
        return {
            tabs: [],
            tabsMap: {}
        };
    },
    created() {
        App.$on('addTab', val => {
          this.addTab(val[0], val[1]);
        });
    },
    methods: {
        selectTab(selectedTab) {
            console.log(selectedTab);
            let selectedTabData = selectedTab.data();
            this.tabs.forEach(tab => {
                let oldData = tab.data();
                console.log(oldData.name+" "+selectedTabData.name+" "+(oldData.name == selectedTabData.name))
                tab.data = function() {
                    return {
                        name: oldData.name,
                        isActive: (oldData.name == selectedTabData.name)
                    }
                }
            });
        },
        addTab(name, comp) {
            this.tabs.push(comp);
            this.tabsMap[name] = comp;

            let oldData = comp.data();

            if (this.tabs.length == 1) {
                comp.data = function() {
                    return {
                        name: oldData.name,
                        isActive: true
                    }
                }
            }
            else {
                comp.data = function() {
                    return {
                        name: oldData.name,
                        isActive: false
                    }
                }
            }
        }
    }
};

const App = new Vue({
  el: '#app',
  data: {
    children: [
    ],
    childrenMap: {
    }
  },
    created() {
        //this.addChildren("tabs", Tabs);
    },
  methods: {
    addChildren (name, comp) {
      this.children.push(comp);
      this.childrenMap[name] = comp;
    },
  }
});

App.addChildren("tabs", Tabs);

function AddAndGetTab(name) {
    let tab = Object.assign({}, Tab);
    tab.data = function() {
        return {
            isActive: false,
            name: name
        };
    }
    App.$emit('addTab', [name, tab]);
    //Tabs.addTab(name, tab);
    return tab;
}

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

function UpdateCallback(obj) {
    let i = 0;
    while (i < obj[1]["depending"].length) {
        obj[1]["depending"][i][0].data = obj[1]["depending"][i][1](obj);
        i++;
    }
}