<template>
    <div class="mb-3">
        <div class="nav">
           
                <RouterLink class="nav-item" v-for="(item,index) in menuFilter" :key="index" :to="`${item.to}`">{{ item.name }}</RouterLink>
          
        </div>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import { useUserStore} from "@/stores/user";

export default {
    setup(){
        const userStore = useUserStore();
        return { userStore }
    },
    computed:{
        menuFilter(){
            if(this.userStore.token){
                return this.menu.filter(el=>el.auth === true || el.name ==="Home");
            }else{
                return this.menu.filter(el=>el.meta === "public" );
            }
        }
    },
    data(){
        return {
            menu: [
                {
                    name:"Home",
                    to:"/",
                    meta:"public"
                },
                {
                    name:"Signin",
                    to:"/signin",
                    meta:"public"
                },
                {
                    name:"Signup",
                    to:"/signup",
                    meta:"public"
                },
                {
                    name:"Profile",
                    to:"/profile",
                    auth:true
                },
                {
                    name:"Create Product",
                    to:"/create-product",
                    auth:true
                }
            ]
        }
    }
}
</script>

<style scoped>

.nav{
    margin: auto;
    margin-top: 1rem;
    display:flex;
    flex-direction: row;
    justify-content: center;
    padding: 0 1rem 0 1rem;
    background-color:dodgerblue;
    border-radius: 3rem;
    width: 100%;
    max-width: 550px;
    
}
.nav-item{
    padding: 0.5rem 1rem 0.5rem 1rem;
    text-decoration: none;
    color: white;
}

.nav-item:hover{
    background-color: white;
    color:black;
    border-radius: 1.5rem;
}

@media screen and (max-width: 450px) {
    
 
}
</style>
