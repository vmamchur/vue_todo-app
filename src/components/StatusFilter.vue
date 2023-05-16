<script>
export default {
  name: "StatusFilter",
  props: {
    status: String,
  },
  emits: ["update"],
};
</script>

<template>
  <nav class="filter">
    <a
      @click="$emit('update', 'all')"
      :class="{ selected: status === 'all' }"
      class="filter__link"
    >
      All
    </a>

    <a
      @click="$emit('update', 'active')"
      :class="{ selected: status === 'active' }"
      class="filter__link"
    >
      Active
    </a>

    <a
      @click="$emit('update', 'completed')"
      :class="{ selected: status === 'completed' }"
      class="filter__link"
    >
      Completed
    </a>
  </nav>
</template>

<style lang="scss" scoped>
.filter {
  display: flex;

  &__link {
    margin: 3px;
    padding: 3px 7px;

    color: inherit;
    text-decoration: none;

    border: 1px solid transparent;
    border-radius: 3px;

    &:hover {
      border-color: rgba(175, 47, 47, 0.1);
    }

    &.selected {
      border-color: rgba(175, 47, 47, 0.2);
    }
  }
}

</style>
