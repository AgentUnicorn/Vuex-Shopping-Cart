<template>
  <div class="home">
    <ProductDescriptionDrawer 
      :product="product"
      :active="active.product_drawer"
      v-on:close-product-drawer="closeProductDrawer"
    />

    <div class="mt-2">
      <label for="input_text">Search: </label>
      <input type="text" id="input_text" v-model="input_search">
    </div>

    <div class="product-cards-container">
      <ProductSummaryCard
        v-for="product in filteredProducts.slice(min, max)" 
        :key="product.id"
        :product="product" 
        v-on:view-product="viewProduct($event)"
      />
    </div>

    <div class="page-btn-container">
      <button class="btn btn-primary" @click="previous">Previous</button>
      <button class="btn btn-primary" @click="next">Next</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
// import { computed } from '@vue/reactivity'

import ProductSummaryCard from '@/components/products/ProductSummaryCard.vue'
import ProductDescriptionDrawer from '@/components/products/ProductDescriptionDrawer.vue'

export default {
  created() {
    this.$store.dispatch('loadProduct')
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    // console.log(firebaseProducts)

    // Redirect to signin if no user is logged in
    if(!store.state.user) {
      router.push('/signin')
    }

    return {
      // products: computed(() => store.state.products),
    }
  },

  name: 'HomeView',
  components: {
    ProductSummaryCard,
    ProductDescriptionDrawer
  },
  data () {
    return {
      product: null,
      input_search: '',
      min: 0,
      max: 4,
      per_page: 4,
      active: {
        product_drawer: false
      }
    }
  },
  methods: {
    viewProduct (product) {
      this.product = product
      this.active.product_drawer = true
      console.log(this.product)
    },
    closeProductDrawer () {
      this.active.product_drawer = false
    },
    previous () {
      this.min -= this.per_page
      this.max -= this.per_page
    },
    next () {
      this.min += this.per_page
      this.max += this.per_page
    },
  },
  computed: {
    filteredProducts: function () {
        return this.$store.state.products.filter((element) => {
          let search_text = this.input_search.toLowerCase().trim().split(' ').join('-')
          return element.alias.includes(search_text)
        })
    }
  }
}

</script>

<style lang="scss">
  .product-cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  .page-btn-container {
    display: flex;
    max-width: 25vw;
    justify-content: space-between;
    margin: 20px auto 0;
  }
</style>
