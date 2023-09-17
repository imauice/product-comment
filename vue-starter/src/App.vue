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
    return { userservice }
  },
  data (){
    return {
      loading:true,
    }
  },
  async mounted() {
    await this.userservice.greeting().then(result=>{
      if(result){
        this.loading = false;
      }
    });
  }
}

</script>

<template>
  <div v-if="!loading">
    <TopNavbar />
    <RouterView />
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
