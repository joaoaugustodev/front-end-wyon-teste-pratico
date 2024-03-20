<template>
  <h2>informe sua conta para acessar</h2>

  <form @submit.prevent="submit">
    <label>
      <p>Conta</p>
      <input
        v-model.lazy="account"
        placeholder="Digite sua conta"
        maxLength="10"
        pattern="^[0-9]{10}$"
        required
      />
    </label>

    <button :disabled="isLoading" class="form">{{ !isLoading ? 'Acessar' : 'Acesando...' }}</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      account: ''
    }
  },
  methods: {
    async submit() {
      try {
        const isLogged = await this.$store.dispatch('signIn', this.account)

        if (isLogged) {
          this.$router.push('/admin')
        }
      } catch (error) {
        const message = error?.response?.data?.message ?? error.message
        alert(message)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 30px;
}
</style>
