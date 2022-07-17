<template>
    <div class="card" style="width: 18rem;">
        <img :src="product.img_path" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ productname }}</h5>
            <h5 class="price">Price: ${{ product.price.toFixed(2) }}</h5>
            <p class="card-text">{{ description }}.</p>
            <p class="text-muted">{{ product.category }}</p>

            <button class="view-product-button" @click="$emit('view-product', product)">View</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['product'],
    computed: {
        description() {
            return this.product.description.substring(0, 150) + '...';
        },
        productname() {
            return this.product.brand + ' ' + this.product.name;
        }
    }
}
</script>

<style lang="scss">
.card {
    width: 80%;
    margin: 10%;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 5px gray;
    text-align: left;

    h5.price {
        color: gray
    }

    p.text-muted {
        color: gray;
    }

}

button.view-product-button {
    padding: 10px;
    background-color: #00bcd4;
    border: none;
    color: #fff;
    font-weight: bold;
    font-size: 1.15rem;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
}

@media (min-width: 500px) {
    .card {
        width: 350px;
        margin: 10px;
    }
}
</style>