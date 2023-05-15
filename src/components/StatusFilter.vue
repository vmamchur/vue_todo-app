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

<style></style>
