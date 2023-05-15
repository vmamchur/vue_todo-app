<script>
import Header from "./components/Header.vue";
import TodoItem from "./components/TodoItem.vue";
import StatusFilter from "./components/StatusFilter.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    TodoItem,
    StatusFilter,
    Footer,
  },
  data() {
    let todos = [];
    const jsonData = localStorage.getItem("todos") || "[]";

    try {
      todos = JSON.parse(jsonData);
    } catch (error) {}

    return {
      todos,
      title: "",
      status: "all",
    };
  },
  computed: {
    activeTodos() {
      return this.todos.filter((todo) => !todo.completed);
    },
    completedTodos() {
      return this.todos.filter((todo) => todo.completed);
    },
    visibleTodos() {
      switch (this.status) {
        case "active":
          return this.activeTodos;

        case "completed":
          return this.completedTodos;

        default:
          return this.todos;
      }
    },
  },
  watch: {
    todos: {
      deep: true,
      handler() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
    },
  },
  methods: {
    handleCreateTodo() {
      this.todos.push({
        id: Date.now(),
        title: this.title,
        completed: false,
      });

      this.title = "";
    },
  },
};
</script>

<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <Header
        :activeTodos="activeTodos"
        :handleCreateTodo="handleCreateTodo"
        :title="title"
        @change="title = $event"
      />

      <TransitionGroup name="list" tag="section" class="todoapp__main">
        <TodoItem
          v-for="todo of visibleTodos"
          :key="todo.id"
          :todo="todo"
          @update="Object.assign(todo, $event)"
          @remove="todos.splice(todos.indexOf(todo), 1)"
        />
      </TransitionGroup>

      <Footer
        :activeTodos="activeTodos"
        :isClearVisible="!!completedTodos.length"
        :status="status"
        @update="status = $event"
      />
    </div>

    <article class="message is-danger message--hidden">
      <div class="message-header">
        <p>Error</p>
        <button class="delete"></button>
      </div>

      <div class="message-body">Unable to add a Todo</div>
    </article>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  max-height: 60px;
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  max-height: 0;
  opacity: 0;
  transform: scaleY(0);
}
</style>
