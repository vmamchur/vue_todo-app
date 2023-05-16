<script>
export default {
  name: "Message",
  emits: ["hide"],
};
</script>

<template>
  <article class="message is-danger">
    <div class="message-header">
      <p>Error</p>
      <button @click="$emit('hide')" class="delete"></button>
    </div>

    <div class="message-body">
      <slot></slot>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.message {
  transform-origin: top center;
  transition-property: opacity, transform;
  transition-duration: 0.3s;

  &--hidden {
    transform: scaleY(0);
    opacity: 0;
    pointer-events: none;
  }
}
</style>
