<template>
    <nav>
        <h1>Hello</h1>

        <template v-if="authIsReady">
            <div>
                <router-link :class="{ active: $route.name === 'Home' }" to="/">Home</router-link> |
            </div>

            <div v-if="user">
                <router-link :class="{ active: $route.name === 'Cart' }" to="/cart">Cart</router-link>
                <span>Logged in as {{user.email}}</span>
                <button @click="handleLogOut">Log out</button>
            </div>

            <div v-if="!user">
                <router-link to="/signup">Sign Up</router-link>
                <router-link to="/signin">Sign In</router-link>
            </div>
        </template>
    </nav>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from '@vue/reactivity'

export default {
    setup() {
        const store = useStore()
        const router = useRouter()

        const handleLogOut = () => {
            store.dispatch('logOut')
            router.push('/signin')
        }
        return {
            handleLogOut,
            user: computed(() => store.state.user),
            authIsReady: computed(() => store.state.authIsReady)
        }
    }
}
</script>