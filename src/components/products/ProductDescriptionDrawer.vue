<template>
    <div class="drawer-background" :class="{show: active}" @click="$emit('close-product-drawer')">
        <div class="drawer" :class="{show: active}">

            <div v-if="product" class="product-details">
                <div class="card-button-container">
                    <button class="drawer-close btn-danger" @click="$emit('close-product-drawer')">
                        x
                    </button>
    
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <img :src="product.img_path" class="card-img-top" alt="...">
                            <h5 class="card-title mt-2">{{product.name}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${{product.price.toFixed(2)}}</h6>
                            <p class="card-text">{{product.description}}</p>
                        </div>
                    </div>
                </div>

                <hr>
                <div class="cart-total" v-if="product_total">
                    <h3>In Cart: <span>{{product_total}}</span></h3>
                </div>

                <div class="button-container">
                    <button class="btn btn-danger remove" @click="removeFromCart()">Remove</button>
                    <button class="btn btn-success add" @click="addToCart()">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['product', 'active'],
        methods: {
            addToCart () {
                this.$store.commit('addToCart', this.product)
            },
            removeFromCart () {
                this.$store.commit('removeFromCart', this.product)
            }
        },
        computed: {
            product_total() {
                return this.$store.getters.productQuantity(this.product)
            }
        },
    }
</script>

<style lang="scss">
    .card-button-container {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    .drawer-background {
        width: 100%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(124, 124, 124, 0.55);
        z-index: 100;
        display: none;
        transition: display 1s;

        &.show {
            display: block;
        }
    }

    .drawer {
        width: 95vw;
        height: 100vh;
        background-color: white;
        position: fixed;
        top: 0;
        left: -105vw;
        padding: 15px;
        transition: left .5s;
        z-index: 101;
        overflow-y: scroll;

        &.show {
            left: 0;
        }
    }

    .drawer-close {
        font-size: 1rem;
        padding: 2px;
        border-radius: 50%;
        right: 10px;
        border: 2px solid gray;
        color: gray;
        width: 30px;
        height: 30px;
        margin: 10px;
        float: right;
        cursor: pointer;

        &:hover {
            background-color: lightgray;
        }
    }

    .product-details {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        p.description {
            padding: 20px;
            line-height: 1.5rem;
        }

        .button-container {
            button {
                width: 150px;
                border: none;
                padding: 10px;
                border-radius: 5px;
                margin: 0 5px 0 5px;
                cursor: pointer;
            }
        }
    }

    .cart-total {

        span {
            font-weight: bold;
            color: #42b983;
        }
    }

    @media (min-width: 500px) {
        .drawer {
            width: 450px;
        }
    }
</style>