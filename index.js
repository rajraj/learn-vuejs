import Vue from "vue/dist/vue.js";

Vue.config.productionTip = false;

Vue.component("task-list", {
  template:
    "<ul><task v-for='task in tasks'>{{ task.description }}</task></ul>",
  data() {
    return {
      tasks: [
        { description: "Go to the store", completed: false },
        { description: "Go to the shop", completed: true },
        { description: "Go to the bank", completed: false },
        { description: "Go to the cinema", completed: true },
        { description: "Go to the pub", completed: false }
      ]
    };
  }
});

Vue.component("task", {
  template: "<li><slot></slot></li>"
});

Vue.component("message", {
  props: ["title"],
  data() {
    return {
      isVisible: true
    };
  },
  template: `
  <article class="message" v-show="isVisible">
    <div class="message-header">
      <p>{{ title }}</p>
      <button class="delete" aria-label="delete" @click="hide">x</button>
    </div>
    <div class="message-body"><slot></slot></div>
  </article>
  `,
  methods: {
    hide() {
      this.isVisible = false;
    }
  }
});

Vue.component("modal", {
  template: `
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <slot></slot>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
  </div>
  `
});

new Vue({
  el: "#app",
  data: {
    newName: "",
    names: ["Rajesh", "Saritha", "Athul"],
    btnTitle: "Click to add new name",
    className: "title-blue",
    isLoading: false,
    isDisabled: false,
    message: "Hello World",
    tasks: [
      { description: "Learn VueJS", completed: false },
      { description: "Learn Elixir", completed: false },
      { description: "Learn Ruby", completed: true },
      { description: "Learn Terraform", completed: false },
      { description: "Learn AWS", completed: true }
    ],
    showModal: false
  },
  methods: {
    addName() {
      if (this.newName) {
        this.names.push(this.newName);
        this.newName = "";
      }
    },

    toggleColour() {
      this.isLoading = true;
    },

    disableBtn() {
      this.isDisabled = true;
    },

    completeTask(task) {
      task.completed = true;
    },

    inCompleteTask(task) {
      task.completed = false;
    }
  },
  computed: {
    reversedMessage() {
      return this.message
        .split("")
        .reverse()
        .join("");
    },

    incompleteTasks() {
      return this.tasks.filter(task => !task.completed);
    }
  }
});
