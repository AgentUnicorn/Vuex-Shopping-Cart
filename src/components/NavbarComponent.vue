<template>
    <nav class="navbar navbar-expand-lg navbar-custom">
        <div class="container-fluid">
            <template v-if="authIsReady">
                <a class="navbar-brand">
                    <router-link :class="{ active: $route.name === 'Home' }" to="/">Home</router-link>    
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" v-if="user">
                        <li class="nav-item">
                            <a class="nav-link">
                                <router-link :class="{ active: $route.name === 'Cart' }" to="/cart">Cart</router-link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">
                                <span>Logged in as {{user.email}}</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-danger" @click="handleLogOut">Log out</a>
                        </li>                
                    </ul>
                    <ul class="navbar-nav" v-if="!user">
                        <li class="nav-item">
                            <a class="nav-link">
                                <router-link to="/signup">Sign Up</router-link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"><router-link to="/signin">Sign In</router-link></a>
                        </li>                
                    </ul>
                </div>
            </template>
        </div>
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