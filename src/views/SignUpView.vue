<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmit">
            <h3>Sign Up</h3>
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

            <button type="submit" class="btn btn-primary">Sign Up</button>
            <div v-if="error">{{error}}</div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
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
                await store.dispatch('signUp', {
                    email: email.value,
                    password: password.value
                })
                router.push('/signin')
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