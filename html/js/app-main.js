const ServiceUrl = "http://localhost:5000";

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
