<script>
export default {
  name: "Header",
  props: {
    activeTodos: Array,
    title: String,
  },
  emits: ["create", "toggle", "change"],
};
</script>

<template>
  <header class="header">
    <button
      @click="$emit('toggle')"
      :class="{ active: !activeTodos.length }"
      class="header__toggle-all"
    ></button>

    <form @submit.prevent="$emit('create')">
      <input
        :value="title"
        @input="$emit('change', $event.target.value.trim())"
        type="text"
        class="header__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;

  &__toggle-all {
    position: absolute;

    height: 100%;
    width: 45px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    color: #e6e6e6;

    border: 0;
    background-color: transparent;
    cursor: pointer;

    &.active {
      color: #737373;
    }

    &:before {
      content: "❯";
      transform: translateY(2px) rotate(90deg);
      line-height: 0;
    }
  }

  &__new-todo {
    box-sizing: border-box;
    width: 100%;
    padding: 16px 16px 16px 60px;

    font-size: 24px;
    line-height: 1.4em;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    border: none;
    background: rgba(0, 0, 0, 0.01);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

    &::placeholder {
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    }
  }
}
</style>
