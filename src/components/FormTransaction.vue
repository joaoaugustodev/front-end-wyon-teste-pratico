<template>
  <form @submit.prevent="submit">
    <label>
      <p>Conta do destinatário</p>
      <input
        pattern="^[0-9]{10}$"
        v-model.lazy="account"
        type="text"
        placeholder="Informe os 10 dígitos"
        maxlength="10"
        required
      />
    </label>

    <label>
      <p>Valor da tranferência</p>
      <input
        v-model.lazy="amount"
        v-money3="config"
        type="text"
        placeholder="Digite a conta"
        required
      />
    </label>

    <label>
      <p>Data da transferência</p>
      <input type="date" :min="dateMin" required v-model.lazy="date" />
    </label>

    <button class="form">Transferir</button>
  </form>
</template>

<script>
import { Money3Directive } from 'v-money3'

export default {
  data() {
    return {
      isLoading: false,
      today: new Date(),
      date: '',
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
  computed: {
    dateMin() {
      this.today.setDate(this.today.getDate())
      return this.today.toISOString().split('T')[0]
    }
  },
  methods: {
    async submit() {
      const value = parseFloat(this.amount.replace('R$', '').replace(/\./gim, '').replace(',', '.'))
      this.isLoading = false

      try {
        await this.$store.dispatch('makeTransaction', {
          sender: this.$store.state.user.id,
          fromAccount: this.$store.state.user.account,
          toAccount: this.account,
          transactionDate: new Date(this.date).toISOString(),
          valueTransaction: value
        })

        this.$store.commit('toggleModal', false)
        this.$store.commit('updateBalance', this.$store.state.user.balance - value)

        alert('Transferência feita com sucesso!')
      } catch (error) {
        const message = error?.response?.data?.message ?? error.message
        alert(message)
      } finally {
        this.isLoading = false
      }
    }
  },
  directives: { money3: Money3Directive }
}
</script>

<style scoped lang="scss"></style>
