<template>
    <div>
        <ul class="nav mb-3 nav-pills">
            <li class="nav-item">
                <router-link v-if="!access_token" :to="{ name: 'user.login' }" class="nav-link" active-class="active">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link v-if="!access_token" :to="{ name: 'user.registration' }" class="nav-link" active-class="active">registration</router-link>
            </li>
            <li class="nav-item">
                <a v-if="access_token" href="/logout" @click.prevent="logout" class="nav-link">Logout</a>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    import api from '../api';

    export default {
        name: "Index",
        data() {
            return {
                access_token: null
            }
        },

        mounted() {
            this.getAccessToken()
        },

        updated() {
            this.getAccessToken()
        },

        methods: {
            getAccessToken() {
                this.access_token = localStorage.getItem('access_token');
            },

            logout() {
              api.post('/api/auth/logout')
                  .then(result => {
                      localStorage.removeItem('access_token');
                      this.$router.push({name:'user.login'})
                  })
            }
        }
    }
</script>

<style scoped>

</style>
