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
  emits: ["update", "clear"],
};
</script>

<template>
  <footer class="footer">
    <span class="footer__count"> {{ activeTodos.length }} items left </span>

    <StatusFilter :status="status" @update="$emit('update', $event)" />

    <button v-if="isClearVisible" @click="$emit('clear')" class="footer__clear-completed">
      Clear completed
    </button>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  align-items: center;

  box-sizing: content-box;
  height: 40px;
  padding: 0 15px;

  font-size: 14px;

  color: #777;
  text-align: center;
  border-top: 1px solid #e6e6e6;

  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);

  &__count {
    text-align: left;
  }

  &__clear-completed {
    margin: 0;
    padding: 0;
    border: 0;

    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    text-decoration: none;
    text-align: right;

    cursor: pointer;
    background: none;

    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      text-decoration: none;
    }
  }
}
</style>
