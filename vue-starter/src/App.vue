<script>
import { RouterView } from 'vue-router'
import TopNavbar from "@/components/navbar/TopNavbar.vue";
import Loader from "@/components/Loader.vue";
import User from "@/services/user";


export default {
  components: {
    TopNavbar,
    Loader
  },
  setup() {
    const userservice = new User();

    const socket = new WebSocket('ws://localhost:8080');

    return { userservice,socket }
  },
  data (){
    return {
      loading:true,
    }
  },
  created(){
    this.socket.addEventListener('message',(event)=>{
      console.log(event.data)
    })
  },
  async mounted() {
    await this.userservice.greeting().then(result=>{
      if(result){
        this.loading = false;
      }
    });
  },
  methods:{
    sendGreeting(){
      this.socket.addEventListener('message',(event)=>{
        this.socket.send('hi server');
      })
    }
  }
}

</script>

<template>
  <div v-if="!loading">
    <TopNavbar />
    <RouterView />
    <div class="text-center" > 

      <button class="btn btn-primary" @click ="sendGreeting">Send greeting</button>
    </div>
  </div>
  <div v-else class="loader">
    <Loader/>
  </div>
</template>

<style scoped>
.loader{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
