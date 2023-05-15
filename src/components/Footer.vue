<script>
import StatusFilter from "./StatusFilter.vue";

export default {
  name: "Footer",
  components: {
    StatusFilter,
  },
  props: {
    activeTodos: Array,
    isClearVisible: Boolean,
    status: Boolean,
  },
  emits: ["update"],
};
</script>

<template>
  <footer class="todoapp__footer">
    <span class="todoapp__count"> {{ activeTodos.length }} items left </span>

    <StatusFilter :status="status" @update="$emit('update', $event)" />

    <button v-if="isClearVisible" class="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
</template>

<style></style>
