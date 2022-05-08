<template>
    <div class="w-25">
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Your email">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Your password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Your password">
        </div>
        <p class="text-danger" v-if="error">{{error}}</p>
        <input @click.prevent="login" type="submit" class="btn btn-success btn-lg">
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                error: '',
            }
        },
        methods: {
            login() {
                axios.post('/api/auth/login', {email: this.email, password: this.password})
                .then(result => {
                    localStorage.setItem('access_token', result.data.access_token);
                    this.$router.push({name:'fruits.index'});
                }).catch(error => {
                    this.error = error.response.data.error;
                });
            }
        }
    }
</script>

<style scoped>

</style>
