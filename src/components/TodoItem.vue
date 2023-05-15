<script>
export default {
  name: "TodoItem",
  props: {
    todo: Object,
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

      if (this.newTitle === "") {
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

    <div class="modal overlay" :class="{ 'is-active': false }">
      <div class="modal-background has-background-white-ter"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style></style>
