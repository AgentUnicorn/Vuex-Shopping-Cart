<template>
  <div class="home">
    <ProductDescriptionDrawer 
      :product="product"
      :active="active.product_drawer"
      v-on:close-product-drawer="closeProductDrawer"
    />


    <div class="product-cards-container">
      <ProductSummaryCard
        v-for="product in items" 
        :key="product.id"
        :product="product" 
        v-on:view-product="viewProduct($event)"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import items from '@/data/items.js'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'

import ProductSummaryCard from '@/components/products/ProductSummaryCard.vue'
import ProductDescriptionDrawer from '@/components/products/ProductDescriptionDrawer.vue'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    // Redirect to signin if no user is logged in
    if(!store.state.user) {
      router.push('/signin')
    }

    return {
      
    }
  },

  name: 'HomeView',
  components: {
    ProductSummaryCard,
    ProductDescriptionDrawer
  },
  data () {
    return {
      items: items,
      product: null,
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

</style>
