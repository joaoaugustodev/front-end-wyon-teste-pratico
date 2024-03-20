<template>
  <main>
    <div class="card">
      <h1>Bem-vindo ao banco Wayon!</h1>
      <small>O banco de teste prático para vaga FullStack Java e Vue.</small>
    </div>

    <div class="form">
      <form-login v-if="!isSignup" />
      <form-signup v-if="isSignup" />

      <div class="signup">
        <span>{{ isSignup ? 'Já tem conta?' : 'Não tem uma conta?' }}</span>
        <button @click="isSignup = !isSignup">{{ isSignup ? 'Login' : 'Criar conta' }}</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import FormLogin from '../components/FormLogin.vue'
import FormSignup from '../components/FormSignup.vue'

export default {
  components: {
    FormLogin,
    FormSignup: FormSignup
  },
  data() {
    return {
      isSignup: false
    }
  }
}
</script>

<style scoped lang="scss">
main {
  background: #00010c;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 30px;

  .card {
    h1,
    small {
      color: #fff;
    }
  }

  .form {
    background: #fff;
    padding: 30px;
    width: calc(40% - 40px);

    .signup {
      text-align: center;
      margin-top: 30px;
      color: #757575;
      font-size: 12px;

      button {
        background: transparent;
        border: none;
        color: #2811f7;
        padding-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
