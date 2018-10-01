<template>
    <div class="login-page">

        <!-- background -->
        <div width="100%" height="100%" class="background-svg">
            <svg width="100%" height="100%">
                <defs>
                    <linearGradient id="lg01" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:rgb(255,20,100); stop-opacity:1"/>
                        <stop offset="100%" style="stop-color:rgb(10,100,100); stop-opacity:1"/>
                    </linearGradient>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#lg01)">
                <animate attributeType="CSS" attributeName="opacity"
                            from="0.9" to="1" dur="5s" repeatCount="1">
                </rect>
            </svg>
        </div>

        <div class="login-box">
            <div class="login-box-title">
                <center><h3> Login </h3></center>
            </div>
            <div class="login-box-body">
                <input placeholder="Password" v-model="Password" />
                <button class="button-positive" @click="login()"> Login </button>
                <button class="button-positive-strong" @click="changePage('register')"> Register </button>
            </div>
        </div>
        
    </div>
</template>

<script>

import {mapState} from 'vuex'

export default {

    data() {
        return {
            stored: {
                password: '',
            },
            watch: [],
        };
    },

    computed: {
        ...mapState({
            session: state => session,
            system: state => system,
        }),
      Password: {
          get() {
              return this.stored.password;
          },
          set(value) {
              this.stored.password = value;
          },
      },
    },
    
    methods: {
        login() {
            this.$store.commit('TryLogin', { password: this.stored.password, callback: (reply) => {
                if (reply.code == 200) {
                    this.$store.commit('SaveSession', { session: reply.session });
                }
            }})
        },
        changePage(name) {
            this.$store.commit('UpdatePage', { page: name });
        }
    },

}

</script>


<style>
.body {
  margin: 0;
  padding: 0;
}

.background-svg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.login-box {
  position: relative;
  width: 400px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.5); 
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.5); 
  top: 200px;
  left: 35%;
}

.login-box-title {
  position: relative;
  color: white;
  top: 10px;
  font-family: monospace;
  font-size: 30px;
}

.button-positive {
  font-weight: 900;
  text-transform: uppercase;
  background-color: rgba(74, 186, 44, 0.7);
}

.button-positive:focus {
  background-color: rgba(74, 186, 44, 0.9);
  transition: all 1s ease 0s;
}

.button-positive-strong {
  font-weight: 900;
  text-transform: uppercase;
  background-color: rgba(74, 250, 44, 0.7);
}

.button-positive-strong:focus {
  background-color: rgba(74, 250, 44, 1);
  transition: all 1s ease 0s;
}

.login-box-body {
  margin-top: 30px;
}
.login-box-body button {
  position: relative;
  top: 50px;
  margin: 20px;
  width: 30%;
  height: 50px;
  left: 0;
  border: none;
  color: white;
  border-radius: 10px;
}

.login-box input {
  position: relative;
  top: 30px;
  width: 80%;
  padding: 10px;
  height: 80px;
  left: 0px;
  font-size: 16px;
  color: white;
  border: none;
  background-color: rgba(255,255,255,0.5); 
  box-shadow: 2px 2px 12px 2px rgba(255,255,255,0.5); 
}

.login-box-body input:focus {
  color: rgba(4,4,4,0.8); 
  background-color: rgba(255,255,255,0.8); 
  transition: all 1s ease 0s;
}

.login-box input::placeholder {
   color: white;
  font-style: italic;
}
</style>
