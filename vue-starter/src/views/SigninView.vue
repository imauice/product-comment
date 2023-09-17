<template>
    <div >
        <div class="signin-panel d-flex justify-content-center w-100 align-items-center mt-3">
            <div class="text-light">
                
                <h1 class="display-6 mb-3">Sign In</h1>
                <form>

                    <input v-model="username" type="text" style="max-width:15rem" class="form-control mb-2"
                    placeholder="Username" />
                    <input v-model="password" type="password" style="max-width:15rem" class="form-control" placeholder="Password" />
                    <button class="btn btn-primary my-3" @click.prevent="SignIn">Signin</button>
                    <button class="btn btn-link mx-2 text-light" @click.prevent="$router.push('/signup')">signup</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import User from "@/services/user";

export default {
    setup() {
        const userservice = new User();
        return { userservice }
    },
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        async SignIn() {

            const logindata = {
                username: this.username,
                password: this.password
            }

            await this.userservice.Signin(logindata).then(result => {
                if (result) {
                    this.$router.push('/profile');
                }
            })
        }
    }

}
</script>
<style scoped>

.card{
  padding: 5rem;
   
}

.signin-panel{
    min-height: 70vh;
}

</style>