<script>
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./services/todoService";
import Header from "./components/Header.vue";
import TodoItem from "./components/TodoItem.vue";
import StatusFilter from "./components/StatusFilter.vue";
import Footer from "./components/Footer.vue";
import Message from "./components/Message.vue";

export default {
  components: {
    Header,
    TodoItem,
    StatusFilter,
    Footer,
    Message,
  },
  data() {
    return {
      todos: [],
      title: "",
      status: "all",
      errorMessage: "",
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
  async mounted() {
    try {
      const { data } = await getTodos();

      this.todos = data;
    } catch (error) {
      this.errorMessage = "Unable to load todos";
    }
  },
  methods: {
    async handleCreateTodo() {
      if (!this.title.length) {
        return;
      }


      try {
        await createTodo(this.title);

        this.title = "";

        const { data } = await getTodos();
        this.todos = data;
      } catch (error) {
        this.errorMessage = "Unable to create a todo";
      }
    },
    async handleUpdateTodo({ id, title, completed }) {

      try {
        await updateTodo({ id, title, completed });

        const { data } = await getTodos();
        this.todos = data;
      } catch (error) {
        this.errorMessage = "Unable to update a todo";
      }
    },
    async handleDeleteTodo(id) {

      try {
        await deleteTodo(id);

        const { data } = await getTodos();
        this.todos = data;
      } catch (error) {
        this.errorMessage = "Unable to delete a todo";
      }
    },
    async handleToggleTodos() {

      try {
        const isEveryTodoCompleted = this.todos.every((todo) => todo.completed);
        const todosPromises = this.todos.map(async (todo) => {
          if (isEveryTodoCompleted) {
            await updateTodo({
              id: todo.id,
              title: todo.title,
              completed: false,
            });
          } else if (!todo.completed) {
            await updateTodo({
              id: todo.id,
              title: todo.title,
              completed: true,
            });
          }
        });

        await Promise.all(todosPromises);

        const { data } = await getTodos();
        this.todos = data;
      } catch (error) {
        this.errorMessage = "Unable to toggle todos";
      }
    },
    async handleDeleteCompletedTodos() {
      try {
        const completedTodos = this.todos.filter((todo) => todo.completed);
        const todosPromises = completedTodos.map(
          async (todo) => await this.handleDeleteTodo(todo.id)
        );

        await Promise.all(todosPromises);

        const { data } = await getTodos();
        this.todos = data;
      } catch (error) {
        this.errorMessage = "Unable to delete completed todos";
      }
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
        :title="title"
        @create="handleCreateTodo"
        @toggle="handleToggleTodos"
        @change="title = $event"
      />

      <TransitionGroup name="list" tag="section" class="todoapp__main">
        <TodoItem
          v-for="todo of visibleTodos"
          :key="todo.id"
          :todo="todo"
          @update="handleUpdateTodo"
          @remove="handleDeleteTodo(todo.id)"
        />
      </TransitionGroup>

      <Footer
        v-if="todos.length"
        :activeTodos="activeTodos"
        :isClearVisible="!!completedTodos.length"
        :status="status"
        @update="status = $event"
        @clear="handleDeleteCompletedTodos"
      />
    </div>

    <Message
      @hide="errorMessage = ''"
      :class="{ 'message--hidden': !errorMessage.length }"
    >
      {{ errorMessage }}
    </Message>
  </div>
</template>

<style lang="scss" scoped>
.todoapp {
  margin: 40px 20px;

  &__content {
    margin-bottom: 20px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 24px;
    font-weight: 300;
    color: #4d4d4d;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }

  &__title {
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }

  &__main {
    border-top: 1px solid #e6e6e6;
  }
}

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
