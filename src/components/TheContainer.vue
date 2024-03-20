<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 1240px;
  padding: 0 20px;
  margin: 0 auto;

  @media (max-width: 960px) {
    width: calc(100% - 40px);
  }
}
</style>
