<template>
  <div class="modal" v-if="$store.state.modal">
    <div class="modal__content">
      <header class="modal__header">
        <h1>Transferência</h1>
        <button @click="toggleModal" title="fechar modal">&times;</button>
      </header>

      <div class="modal__body">
        <form-transaction />
      </div>
    </div>

    <div @click="toggleModal" class="modal__overlay"></div>
  </div>
</template>

<script>
import FormTransaction from './FormTransaction.vue'

export default {
  components: {
    FormTransaction
  },
  mounted() {
    window.addEventListener('keyup', (event) => {
      if (event.code === 'Escape') {
        this.$store.commit('toggleModal', false)
      }
    })
  },
  methods: {
    toggleModal() {
      this.$store.commit('toggleModal')
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #7777;
    padding: 10px 30px;

    button {
      background: transparent;
      border: none;
      font-weight: bold;
      font-size: 28px;
      cursor: pointer;
    }
  }

  &__body {
    padding: 30px;
  }

  &__content {
    background: #fff;
    width: 50%;
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__overlay {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
  }
}
</style>
