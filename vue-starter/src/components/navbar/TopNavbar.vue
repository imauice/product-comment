<template>
    <div>
        <div class="nav">
           
                <RouterLink class="nav-item" v-for="(item,index) in menu" :key="index" :to="`${item.to}`">{{ item.name }}</RouterLink>
          
        </div>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
export default {
    data(){
        return {
            menu: [
                {
                    name:"Home",
                    to:"/"
                },
                {
                    name:"Signin",
                    to:"/signin"
                },
                {
                    name:"Signup",
                    to:"/signup"
                },
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
    margin: 0.5rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    text-decoration: none;
    color: white;
}

.nav-item:hover{
    background-color: white;
    color:black;
    border-radius: 1.5rem;
}

</style>
