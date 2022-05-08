<template>
    <div class="w-25">
        <div class="mb-3">
            <label for="name" class="form-label">Your name</label>
            <input v-model="name" type="text" name="name" class="form-control" id="name" placeholder="Your name">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="email" type="email" name="email" class="form-control" id="email" placeholder="Your email">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Your password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Your password">
        </div>
        <div class="mb-3">
            <label for="password_confirmation" class="form-label">Confirm password</label>
            <input v-model="password_confirmation" type="password" class="form-control" id="password_confirmation" placeholder="Confirm password">
        </div>
        <p class="text-danger" v-if="error">{{error}}</p>
        <input @click.prevent="store" type="submit" class="btn btn-success btn-lg">
    </div>
</template>

<script>
    export default {
        name: "Registration",

        data() {
            return {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                error: '',
            }
        },

        mounted() {
            localStorage.getItem('access_token')
        },

        methods: {
            store() {
                axios.post('/api/users', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                }).then( result => {
                    localStorage.setItem('access_token', result.data.access_token);
                    this.$router.push({name : 'fruits.index'});
                }).catch(error => {
                    this.error = error.response.data.message;
                });
            }
        }
    }
</script>

<style scoped>

</style>
