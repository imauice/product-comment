import axios from "axios"
import { useUserStore } from '@/stores/user'

export default class User {

    constructor(context) {
        this.context = context
        this.url = import.meta.env.VITE_APP_BASEURL;
        this.userservice = useUserStore();
        this.token = this.userservice.token;
    }

    //greeting api
    async greeting() {

        let data = null;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${this.url}/greeting`,
            headers: {}
        };

        await axios.request(config)
            .then((response) => {
                data = JSON.stringify(response.data);
            })
            .catch((error) => {
                data = error.message;
            });

        return data;
    }

    async GetMe() {
        let data = null;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${this.url}/users/me`,
            headers: {
                'Authorization': this.token
            }
        };

        await axios.request(config)
            .then((response) => {
                data = response.data;
                this.userservice.setUser(data);
            })
            .catch((error) => {
                data = { message: "Get user error", error: error.message }
            });

        return data;
    }


    async Signin(SigninData) {

        let data;

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${this.url}/users/signin`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: SigninData
        };

        await axios.request(config)
            .then((response) => {
                data = response.data;
                this.userservice.setToken(`Bearer ${data.token}`);
            })
            .catch((error) => {
                data = { message: error.message, error: error }
            });

        return data;
    }

    async Signup(SignupData) {
        let data;

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${this.url}/users/signup`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: SignupData
        };

        await axios.request(config)
            .then((response) => {
                data = response.data;
            })
            .catch((error) => {
                data = { message: error.message, error: error.response.data }
            });

        return data;
    }

    //get profile
    async getProfile() {

        let data;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${this.url}/users/profile`,
            headers: {
                'Authorization': this.token
            }
        };

        await axios.request(config)
            .then((response) => {
                data = response.data;
            })
            .catch((error) => {
                data = { message: "Get profile failed", error: error.message }
            });

        return data;
    }

    //create profile
    async createProfile(formData) {
      
        let responseData;

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${this.url}/users/profile`,
            headers: {
                'Authorization': this.token,
               
            },
            data: formData
        };

        console.log(config);

        await axios.request(config)
            .then((response) => {
                responseData = response.data;
            })
            .catch((error) => {
                responseData = {message:"Create profile failed", error: error.message,data:error.response?.data};
            });
            
            return responseData;
    }
}