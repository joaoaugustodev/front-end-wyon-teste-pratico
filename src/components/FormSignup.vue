<template>
  <h2>Crie uma conta para fazer transferências</h2>

  <form @submit.prevent="submit">
    <label>
      <p>Nome</p>
      <input v-model.lazy="name" type="text" placeholder="Informe um nome" required />
    </label>

    <label>
      <p>Conta</p>
      <input
        required
        type="text"
        placeholder="No mínimo 10 dígitos"
        maxlength="10"
        pattern="^[0-9]{10}$"
        v-model.lazy="account"
      />
    </label>

    <label>
      <p>Saldo</p>
      <input
        v-money3="config"
        v-model.lazy="amount"
        required
        type="text"
        placeholder="Digite um saldo para sua conta"
      />
    </label>

    <button :disabled="isLoading" class="form">{{ isLoading ? 'Criando...' : 'Criar' }}</button>
  </form>
</template>

<script>
import { Money3Directive } from 'v-money3'

export default {
  data() {
    return {
      isLoading: false,
      name: '',
      account: '',
      amount: '0',
      config: {
        prefix: 'R$',
        thousands: '.',
        decimal: ',',
        precision: 2,
        disableNegative: true,
        minimumNumberOfCharacters: 3,
        shouldRound: true
      }
    }
  },
  methods: {
    async submit() {
      const balance = parseFloat(
        this.amount.replace('R$', '').replace(/\./gim, '').replace(',', '.')
      )
      this.isLoading = false

      try {
        const isCreated = await this.$store.dispatch('signup', {
          name: this.name,
          account: this.account,
          balance
        })

        if (isCreated) {
          this.$router.push('/admin')
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
    }
  },
  directives: { money3: Money3Directive }
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
</style>
