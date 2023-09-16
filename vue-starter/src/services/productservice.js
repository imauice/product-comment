import axios from "axios"

export default class Product {

    constructor(context) {
        this.context = context
        this.token = localStorage.getItem('token');
        this.url = import.meta.env.VITE_APP_BASEURL;
    }

    //get product
    async getProduct() {

        let data = null;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:`${ this.url}/products`,
            headers: {}
        };

        await axios.request(config)
            .then((response) => {
                data = response.data;
            })
            .catch((error) => {
                data = { message: "Get product fail", error: error }
            });

        return data;

    }


}