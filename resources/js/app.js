/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('admin-lte');

import Vue from 'vue';
import VueRouter from 'vue-router';
import dashboard from './components/dashboard.vue';
import profile from './components/profile.vue';
import users from './components/users.vue';
Vue.use(VueRouter);
import Swal from 'sweetalert2'
window.Swal=Swal;
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

var toastrConfigs = {
    position: 'top center',
    showDuration: 1000,
    timeOut: 5000,
    closeButton: true,
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
}

Vue.use(CxltToastr,toastrConfigs)

//import { Form, HasError,AlertError} from 'vform';
import { Form} from 'vform'
window.Form= Form;
Vue.component('pagination', require('laravel-vue-pagination'));

let routes =[
    {path: "/dashboard", component:dashboard},
    {path: "/profile", component:profile},
    {path: "/users", component: users},
]
const router = new VueRouter({
        mode:'history',
        routes
    })
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
