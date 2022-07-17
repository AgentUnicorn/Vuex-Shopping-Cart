import { createStore } from 'vuex'

// firebase imports
import {auth} from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    cart: []
  },
  getters: {
    productQuantity: state => product => {
      const item = state.cart.find(i=> i.id === product.id)

      if (item) return item.quantity
      else return null
    },
    cartItems: state => {
      return state.cart
    },
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
  mutations: {
    //#region User
    setUser (state, payload) {
      state.user = payload
      console.log('User: ', state.user)
    },
    setAuthIsReady (state) {
      state.authIsReady = true
    },
    //#endregion

    //#region Cart
    addToCart (state, product) {
      let item = state.cart.find(i=> i.id === product.id)

      if (item) {
        item.quantity++
      } else {
        state.cart.push({...product, quantity: 1})
      }

      updateLocalStorage(state.cart)
    },
    removeFromCart (state, product) {
      let item = state.cart.find(i=> i.id === product.id)

      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          state.cart.splice(state.cart.indexOf(item), 1)
          // state.cart = state.cart.filter(i=> i.id !== product.id)
        }
      }

      updateLocalStorage(state.cart)
    },
    updateCartFromLocalStorage (state) {
      const cart = localStorage.getItem('cart')

      if (cart) {
        state.cart = JSON.parse(cart)
      }
    },
    
    //#endregion
  },
  actions: {
    //#region User
    async signUp(context, {email, password}) {
      console.log('Signup (action)')

      //async code
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response) {
        context.commit('setUser', response.user)
      } else {
        throw new Error('Could not complete signup')
      }
    },
    async logIn(context, {email, password}) {
      console.log('Login (action)')

      //async code
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        context.commit('setUser', response.user)
      } else {
        throw new Error('Could not complete login')
      }
    },
    async logOut(context) {
      console.log('Logout (action)')

      //async code
      await signOut(auth)
      context.commit('setUser', null)
    }
    //#endregion
  },
  modules: {
  }
})

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)

  // Run this func only once
  unsub()
})

export default store