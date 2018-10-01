<template>
    <div>
        <div width="100%" height="100%" class="background-svg">
            <svg width="100%" height="100%">
                <defs>
                    <linearGradient id="lg01" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:rgb(255,20,100); stop-opacity:1"/>
                        <stop offset="100%" style="stop-color:rgb(10,100,100); stop-opacity:1"/>
                    </linearGradient>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#lg01)"/>
            </svg>
        </div>
        <div v-if="ready" id="body-page" :class="preferences.theme">
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            currency:
            {
                pair:['ZCR','ZCR'],
                myOrders:[],
                availableOrders:[],
                history: {
                    asks: [],
                    bids: [],
                }
            },
            preferences: 
            {
                theme: 'theme-light',
            },
            ready: false,
        };

    },
    
    methods: {

    },

    created() {
        this.ready=true;
    }
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

#body {
  position: relative;
  width: 95%;
  height: 98%;
  border: none;
  border-radius: 10px;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 0;
  padding: 0;
}

.theme-light {
  background-image: linear-gradient(to bottom,rgb(255,255,255),rgb(210,210,210)); 
  box-shadow: 2px 2px 12px 2px rgba(250,250,250,0.9);
}

.theme-dark {
  background-image: linear-gradient(to bottom,rgb(30,25,30),rgb(45,45,45)); 
  box-shadow: 2px 2px 12px 2px rgba(20,20,20,0.9);
}


</style>