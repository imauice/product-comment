import axios from "axios"
import { useUserStore } from '@/stores/user'
export default class Product {

    constructor(context) {
        this.context = context
        this.url = import.meta.env.VITE_APP_BASEURL;
        this.userservice = useUserStore();
        this.token = this.userservice.token;
    }

    //get product
    async getProduct() {

        let data = null;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${this.url}/products`,
            headers: {}
        };

        await axios.request(config)
            .then((response) => {
                data = response.data;
            })
            .catch((error) => {
                data = { message: "Get product fail", error: error.message,data:error.response.data }
            });

        return data;

    };

    //create product
    async createProduct(formData) {

        let data;

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${this.url}/products`,
            headers: {
                'Authorization': this.token,
              
            },
            data: formData
        };

        await axios.request(config)
            .then((response) => {
                data = response.data;
            })
            .catch((error) => {
                data={message:"Create project failed",error:error.message,data:error.response.data}
            });

            return data;
    };

    //comment
    async commentProduct(id, comment) {

        let responseData;

        const data = {
            comment: comment
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${this.url}/products/${id}/comment`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            data: data
        };

        await axios.request(config)
            .then((response) => {
                responseData = response.data;
            })
            .catch((error) => {
                responseData = { message: "comment failed", error: error.message, data: error.response.data }
            });

        return responseData;
    };
}