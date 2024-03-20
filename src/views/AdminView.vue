<template>
  <the-header />

  <main>
    <the-container>
      <div class="header-main">
        <h2>Transferências</h2>
        <button @click="toggleModal" class="btn-transferencia">Nova transferência</button>
      </div>
    </the-container>

    <table-transaction />
  </main>

  <my-modal />
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import TheContainer from '../components/TheContainer.vue'
import TableTransaction from '../components/TableTransaction.vue'
import MyModal from '../components/MyModal.vue'

export default {
  components: {
    TheHeader,
    TheContainer,
    TableTransaction,
    MyModal
  },
  methods: {
    toggleModal() {
      this.$store.commit('toggleModal')
    }
  },
  mounted() {
    const user = this.$store.state.user
    const hasUser = Boolean(user.account)

    if (!hasUser) {
      this.$router.push('/')
    }

    this.$store.dispatch('getAllTransactions', user.id).then((response) => response)
  }
}
</script>

<style scoped lang="scss">
main {
  margin-top: 30px;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;

  .btn-transferencia {
    margin-top: 10px;
    display: inline-block;
    border: none;
    padding: 10px 20px;
    background: #00010c;
    color: #fff;
    cursor: pointer;
  }
}
</style>
