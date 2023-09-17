<template>
    <div class="signup d-flex justify-content-center align-items-center text-light">
<div>

    <h1 class="display-6 mb-3">Signup</h1>
    <form>
        <label>username</label>
        <input v-model="username" type="text" class="form-control" style="max-width:15rem"/>
        <label>password</label>
        <input v-model="password" type="password" class="form-control" style="max-width:15rem"/>
        <label>email</label>
        <input v-model="email" type="email" class="form-control" style="max-width:15rem"/>
        <button class="btn btn-primary my-3" @click.prevent="SignUp">Sign Up</button>
    </form>
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
            const signupdata = {
               username: this.username,
               password: this.password,
               email: this.email
            }

            await this.userservice.Signup(signupdata).then(result=>{
                if(result){
                    this.$router.push('/signin')
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