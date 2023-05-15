<script>
export default {
  name: "Header",
  props: {
    activeTodos: Array,
    handleCreateTodo: Function,
    title: String,
  },
  emits: ["change"],
};
</script>

<template>
  <header class="todoapp__header">
    <button
      :class="{ active: !activeTodos.length }"
      class="todoapp__toggle-all"
    ></button>

    <form @submit.prevent="handleCreateTodo">
      <input
        :value="title"
        @input="$emit('change', $event.target.value)"
        type="text"
        class="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
</template>

<style></style>
