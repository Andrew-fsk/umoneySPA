<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Umoney</a>
                <button v-if="access_token" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link v-if="access_token" :to="{ name: 'user.edit' }" class="nav-link"
                                         active-class="active">Settings
                            </router-link>
                        </li>
                        <!--<li class="nav-item">
                            <router-link v-if="!access_token" :to="{ name: 'user.registration' }" class="nav-link"
                                         active-class="active">Registration
                            </router-link>
                        </li>-->
                    </ul>
                    <form class="ms-auto d-flex">
                        <a v-if="access_token" href="/logout" @click.prevent="logout" class="btn btn-outline-light" type="submit">Logout</a>
                    </form>
                </div>
            </div>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
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
                        this.$router.push({name: 'user.login'})
                    })
            }
        }
    }
</script>

<style scoped>

</style>
