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
