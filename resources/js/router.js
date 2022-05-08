import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const route = new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/users/login', component: () => import ('./components/User/Login'),
            name: 'user.login'
        },
        {
            path: '/users/registration', component: () => import ('./components/User/Registration'),
            name: 'user.registration'
        }/*,
        {
            path: '*', component: () => import('./components/Index'),
            name: '404'
        }*/
    ]
});

route.beforeEach((to, from, next) => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
        if (to.name === 'user.login' || to.name === 'user.registration') {
            return next();
        } else {
            return next({name : 'user.login'})
        }
    }

    if (to.name === 'user.login' || to.name === 'user.registration' && access_token) {
        return next({name : 'fruits.index'})
    }
    return next();
});

export default route;
