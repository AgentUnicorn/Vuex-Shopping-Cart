<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmit">
            <h3>Sign In</h3>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    aria-describedby="emailHelp"
                    name="email" 
                    v-model="email" 
                    required 
                >
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    name="password" 
                    v-model="password" 
                    required
                >
                <div id="passwordHelpBlock" class="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Sign In</button>
            <div v-if="error">{{error}}</div>
        </form>
    </div>
</template>

<script>
import {ref} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const error = ref(null)

        const store = useStore()
        const router = useRouter()

        const handleSubmit = async () => {
            try {
                await store.dispatch('logIn', {
                    email: email.value,
                    password: password.value
                })
                router.push('/')
            } catch (err) {
                error.value = err.message
            }
        }
        return {
            handleSubmit,
            email,
            password,
            error
        }
    }
}
</script>

<style lang="scss">
    .form-container {
        max-width: 500px;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 20px;
        text-align: left;
        margin: 20vh auto;
        background-color: white;

        h3 {
            text-align: center;
            font-size: 25px;
            font-weight: bold;
            color: #42b983
        }

        button {
            margin: 10px auto;
        }
    }
</style>