<template>
  <div class="table-transaction">
    <table>
      <thead>
        <tr>
          <th>Destino</th>
          <th>Destinatário</th>
          <th>Valor</th>
          <th>Taxa em R$</th>
          <th>Taxa em %</th>
          <th>Data de agendamento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in $store.state.transactions" :key="transaction.id">
          <th>{{ transaction.fromAccount }}</th>
          <th>{{ transaction.toAccount }}</th>
          <th :class="transaction.toAccount === $store.state.user.account ? 'green' : 'red'">
            {{ moneyFormater(transaction.valueTransaction) }}
          </th>
          <th>{{ moneyFormater(transaction.moneyFee) }}</th>
          <th>{{ transaction.percentFee }}%</th>
          <th>{{ dateFormater(transaction.scheduleDateTransaction) }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  setup() {
    const moneyFormater = (money) =>
      money.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })

    const dateFormater = (date) => new Date(`${date} `).toLocaleDateString()

    return {
      moneyFormater,
      dateFormater
    }
  }
}
</script>

<style scoped lang="scss">
.table-transaction {
  table {
    border-collapse: collapse;
    width: 100%;

    td,
    th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;

      &.green {
        background: rgb(29, 228, 29);
      }

      &.red {
        background: rgb(238, 52, 52);
      }
    }

    tr:nth-child(even) {
      background-color: #dddddd;
    }
  }
}
</style>
