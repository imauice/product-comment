<template>
    <div class="signup d-flex justify-content-center align-items-center text-light">
<div>

    <h1 class="display-6 mb-3">Signup</h1>
    <label>username</label>
    <input v-model="username" type="text" class="form-control" style="max-width:15rem"/>
    <label>password</label>
    <input v-model="password" type="password" class="form-control" style="max-width:15rem"/>
    <label>email</label>
    <input v-model="email" type="email" class="form-control" style="max-width:15rem"/>
    <button class="btn btn-primary my-3" @click="SignUp">Sign Up</button>
</div>
</div>

</template>
<script>
import User from "@/services/user"

export default {
    setup(){
        const userservice = new User();
        return { userservice }
    },
    data(){
        return {
            username:'',
            password:'',
            email:''
        }
    },
    methods:{
        async SignUp(){
            const singupdata = {
               username: this.username,
               password: this.password,
               email: this.email
            }

            await this.userservice.Signup(singupdata).then(result=>{
                if(result){
                    console.log(result);
                }
            })
        }
    }
}
</script>
<style scoped>
.signup{
    min-height: 70vh;
}
</style>