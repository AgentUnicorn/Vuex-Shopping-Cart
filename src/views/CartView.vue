<template>
    <div class="cart-container">
        <h1>Your Cart</h1>

        <CartItemCart 
            v-for="product in products" 
            :key="product.id"
            :product="product"
        />

        <CartSummaryPaymentCard 
            :products="products"
        />
    </div>
</template>

<script>
    import CartItemCart from '@/components/cart/CartItemCart.vue'
    import CartSummaryPaymentCard from '@/components/cart/CartSummaryPaymentCard.vue'

    export default {
        components: {
            CartItemCart,
            CartSummaryPaymentCard
        },
        computed: {
            products() {
                return this.$store.getters.cartItems
            }
        }
    }
</script>

<style lang="scss">
.cart-item-card {
        width: 90%;
        margin: 5%;
        background-color: white;
        box-shadow: 0 0 5px gray;
        border-radius: 5px;
        padding: 10px;
        text-align: left;

        .header {
            display: flex;
            justify-content: space-around;
            align-items: center;

            h3 {
                font-weight: bold;
            }
        }
    }
.cart-container {
    padding: 20px;

    h1 {
        font-weight: bold;
        color: #42b983
    }
}
</style>