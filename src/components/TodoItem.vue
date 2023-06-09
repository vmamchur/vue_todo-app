<script>
export default {
  name: "TodoItem",
  props: {
    todo: Object,
    isLoading: Boolean,
  },
  data() {
    return {
      isRenaming: false,
      newTitle: this.todo.title,
    };
  },
  emits: ["update", "remove"],
  methods: {
    toggle() {
      this.$emit("update", { ...this.todo, completed: !this.todo.completed });
    },
    remove() {
      this.$emit("remove");
    },
    edit() {
      this.newTitle = this.todo.title;
      this.isRenaming = true;
      this.$nextTick(() => this.$refs.title.focus());
    },
    rename() {
      if (!this.isRenaming) {
        return;
      }

      this.isRenaming = false;

      if (this.newTitle === this.todo.title) {
        return;
      }

      if (this.newTitle.trim() === "") {
        this.remove();

        return;
      }

      this.$emit("update", { ...this.todo, title: this.newTitle });
    },
  },
};
</script>

<template>
  <div :class="{ completed: todo.completed }" class="todo">
    <label class="todo__status-label">
      <input
        :checked="todo.completed"
        @click="toggle"
        type="checkbox"
        class="todo__status"
      />
    </label>

    <form v-if="isRenaming" @submit.prevent="rename">
      <input
        v-model="newTitle"
        @keyup.esc="isRenaming = false"
        @blur="rename"
        type="text"
        ref="title"
        class="todo__title-field"
        placeholder="Empty todo will be deleted"
      />
    </form>

    <template v-else>
      <span @dblclick="edit" class="todo__title">{{ todo.title }}</span>
      <button @click="remove" class="todo__remove">x</button>
    </template>

    <div class="modal overlay" :class="{ 'is-active': isLoading }">
      <div class="modal-background has-background-white-ter"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo {
  position: relative;

  display: grid;
  grid-template-columns: 45px 1fr;
  justify-items: stretch;

  font-size: 24px;
  line-height: 1.4em;
  border-bottom: 1px solid #ededed;

  &:last-child {
    border-bottom: 0;
  }

  &__status-label {
    cursor: pointer;
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center left;
  }

  &.completed &__status-label {
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
  }

  &__status {
    opacity: 0;
  }

  &__title {
    cursor: text;
    padding: 12px 15px;

    word-break: break-all;
    transition: color 0.4s;
  }

  &.completed &__title {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  &__remove {
    position: absolute;
    right: 12px;
    top: 0;
    bottom: 0;

    font-size: 120%;
    line-height: 1;
    font-family: inherit;
    font-weight: inherit;
    color: #cc9a9a;

    float: right;
    border: 0;
    background: none;
    cursor: pointer;

    transform: translateY(-2px);
    opacity: 0;
    transition: color 0.2s ease-out;

    &:hover {
      color: #af5b5e;
    }
  }

  &:hover &__remove {
    opacity: 1;
  }

  &__title-field {
    box-sizing: border-box;
    width: 100%;
    padding: 11px 14px;

    font-size: inherit;
    line-height: inherit;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;

    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);

    &::placeholder {
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    }
  }

  .overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    opacity: 0.5;
  }
}
</style>
