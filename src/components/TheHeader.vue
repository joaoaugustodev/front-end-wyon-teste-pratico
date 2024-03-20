<template>
  <header>
    <the-container>
      <button @click="logout" class="logout">Sair</button>

      <div class="wrapper">
        <div class="user-info">
          <h1>{{ $store.state.user.name }}</h1>
          <small><strong>Saldo:</strong> {{ balanceFormatted($store.state.user.balance) }}</small>
        </div>

        <div class="account-info">
          <strong>Conta:</strong>
          <p>{{ $store.state.user.account }}</p>
        </div>
      </div>
    </the-container>
  </header>
</template>

<script>
import { useStore } from 'vuex'

import TheContainer from './TheContainer.vue'

export default {
  components: { TheContainer },
  setup() {
    const store = useStore()

    const balanceFormatted = (balance) =>
      balance.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })

    const logout = () => {
      store.dispatch('addUser', { name: '', account: '', balance: 0 })
      window.location.href = '/'
    }

    return {
      balanceFormatted,
      logout
    }
  }
}
</script>

<style scoped lang="scss">
header {
  border-bottom: 1px solid #fff;
  width: 100%;
  background: #00010c;
  position: sticky;
  top: 0;
  color: #fff;
}

.wrapper {
  padding: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.account-info {
  width: 160px;

  strong {
    display: inline-block;
    margin-bottom: 10px;
  }
}

.logout {
  position: absolute;
  left: 90%;
  padding: 5px 30px;
  background: transparent;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
</style>
