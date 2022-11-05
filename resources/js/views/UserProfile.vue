<template>
  {{ username }}
</template>

<script setup>
  import { useRoute } from "vue-router";

  const route = useRoute();
  const username = route.params.username;

</script>