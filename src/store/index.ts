import axios from 'axios'
import { createStore, Store } from 'vuex'

type User = {
  id: number
  name: string
  account: string
  balance: number
}

type Transaction = {
  id?: number
  fromAccount: string
  toAccount: string
  valueTransaction: number
  transactionDate: Date
  moneyFee: number
  percentFee: number
}

interface State {
  modal: boolean
  transactions: Array<Transaction>
  user: User
}

export const store: Store = createStore<State>({
  state() {
    return {
      modal: false,
      transactions: [],
      user: {
        name: '',
        account: '',
        balance: 0
      }
    }
  },
  mutations: {
    toggleModal(state: State, data?: boolean) {
      state.modal = data ?? !state.modal
    },
    addUser(state: State, data: User) {
      state.user = data
    },
    updateBalance(state: State, balance: number) {
      state.user.balance = balance
    },
    addTransaction(state: State, data: Transaction) {
      state.transactions = [...state.transactions, data]
    },
    addTransactions(state: State, data: Transaction[]) {
      state.transactions = data
    }
  },
  actions: {
    async signup(context: Store, data: User) {
      const response = await axios.post('http://localhost:8080/user', data)
      context.commit('addUser', response.data)

      return response.status === 201
    },
    async signIn(context: Store, data: string) {
      const response = await axios.get(`http://localhost:8080/user/account/${data}`)
      context.commit('addUser', response.data)

      return response.status === 200
    },
    async makeTransaction(context: Store, data: Transaction) {
      const response = await axios.post('http://localhost:8080/transaction', data)
      context.commit('addTransaction', response.data)

      return response.status === 201
    },
    async getAllTransactions(context: Store, account: number) {
      const response = await axios.get(`http://localhost:8080/transaction/${account}`)
      context.commit('addTransactions', response.data)

      return response.status === 200
    }
  }
})
