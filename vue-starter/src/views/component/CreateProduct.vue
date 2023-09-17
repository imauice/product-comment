<template>
    <div class="container ">
        <div class="product-content text-light text-center">

            <h2>สร้างสินค้าใหม่</h2>
            <div class="text-start">

                <label class="product-image my-3" 
                :style="`background-image:url(${preview?preview:null});
                        background-color:${preview?null:'rgb(255, 1, 179)'}
                `
                ">
                    <input type="file" accept="image/png,image/jpeg" style="display:none" @change="setImage" />
                    <p v-if="!preview">เลือกรูป</p>
                </label>
             
                <label class="form-label">ชื่อสินค้า</label>
                <input class="form-control" v-model="productName" type="text" />
                <label class="form-label">รายละเอียด</label>
                <textarea class="form-control" v-model="productDescription" />
            </div>
            <button class="btn btn-link text-light my-3" @click="$router.push('/')">ยกเลิก</button>
            <button class="btn btn-primary my-3 justify-self-cener" @click="createProduct">สร้างสินค้า</button>
            <p v-if="warning!==''" class="text-warning">{{ warning }}</p>
        </div>

    </div>
</template>

<script>
import Product from "@/services/productservice";

export default {
    setup() {
        const productService = new Product();
        return { productService };
    },
    data() {
        return {
            productImage: null,
            preview: null,
            productName: "",
            productDescription: "",
            warning:""
        }
    },
    methods: {
        setImage(e) {
            const file = e.target.files[0]
            if (file) {
                this.productImage = file;
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.addEventListener('load', (event) => {

                    this.preview = event.target?.result;

                })
            }
        },
        async createProduct() {
            if (this.productImage === null || this.productName === "" || this.productDescription === "") {
                this.warning = "กรุณาใส่ข้อมูลให้ครบถ้วน"
                return;
            }
            const formData = new FormData();
            formData.append('productName', this.productName);
            formData.append('productDescription', this.productDescription);
            formData.append('productImage', this.productImage);

            await this.productService.createProduct(formData).then(result => {
                console.log(result);
                if(result && result.message==='create product successfully'){
                    this.resetData();
                    this.$router.push('/')
                }else{
                    this.warning="สร้างรายการสินค้าไม่สำเร็จ"
                }
            })
        },
        resetData(){
            this.productImage=null;
            this.productName="",
            this.productDescription="",
            this.preview=null
        }
    }

}
</script>
<style scoped>
.product-content {
    min-width: 350px;
}

.product-image {
    cursor: pointer;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border: dashed 1px rgb(0, 238, 255);
    border-radius: 0.4rem;
    background-size: contain;
    background-repeat: no-repeat;
}

.btn-link {
    text-decoration: none;
}
</style>