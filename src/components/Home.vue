<template>
    <div>
        <div v-if="ready">
            <Login v-if="!logged && sector=='login'"></Login>
            <Main v-if="logged && sector=='main'"></Main>
            <Orders v-if="logged && sector=='orders'"></Orders>
            <Register v-if="!logged && sector=='register'"></Register>
        <div>
    </div>
</template>

<script>

import Main from './Main'
import Login from './Login'
import Orders from './Orders'
import Register from './Register'

import {mapState} from 'vuex'

export default {

    data() {
        return {
            ready: false,
            logged: false,
            sector: 'login',
            watch: [],
        };
    },

    computed: {
        ...mapState({
            session: state => session,
            system: state => system,
        })
    },

    components: {
        Login,
        Main,
        Orders,
        Register,
    },

    methods: {

    },

    created() {
        //reset previous session
        this.$store.commit('ClearCookieSession');
        this.$store.commit('UpdatePage', { page:'login' });

        //sector watcher
        this.watch.push(setInterval(()=>{
            if (this.system.page != this.sector) {
                this.sector = this.system.page;
                console.log('Sector updated');
            }
        },1000));

        //session watcher
        this.watch.push(setInterval(()=>{
            if (this.session.session && !this.logged) {
                this.logged = true;
                this.$store.commit('UpdatePage', { page:'main' });
            } else if (!this.session.session && this.logged) {
                this.logged = false;
                this.$store.commit('UpdatePage', { page:'login' });
            }
        },1000));

        this.ready = true;
    }
}

</script>

<style>

</style>