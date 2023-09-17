<template>
    <div class="product-view">

        <div class="row content">
            <div class="col-12" v-for="(item, index) in products" :key="index">
                <div class="card px-3 py-3 mb-3">
                    <img class="mb-3" :src="baseUrl + item.imgUrl" style="width:100%" />

                    <h5>{{ item.productName }}</h5>
                    <p>
                        {{ item.productDescription }}
                    </p>
                    <!-- Button trigger modal -->
                    <div class="d-flex justify-content-end bg-light text-dark">
                        <div class="row w-100">
                            <div class="col align-items-center">
                                <!-- icon -->
                                <span class="material-symbols-outlined my-1">
                                    favorite
                                </span>
                            </div>
                            <div class="col text-end">
                                <button v-if="authState" type="button" class="btn btn-link btn-comment text-dark"
                                    data-bs-toggle="modal" data-bs-target=#chat @click="comment(item)">
                                    แสดงความคิดเห็น
                                </button>
                                <button v-else type="button" class="btn btn-link btn-comment text-dark"
                                    data-bs-toggle="modal" data-bs-target=#login @click="comment(item)">
                                    แสดงความคิดเห็น
                                </button>
                            </div>
                        </div>

                    </div>
                    <!-- end Button trigger moal -->
                    <div id="comment-section" v-if="item.comments.length > 0">

                        <p class="my-3">ความคิดเห็นล่าสุด</p>
                        <div class="comment">
                            <div v-for="(c, index) in item.comments.slice(item.comments.length-2)">
                                <div class="row w-100 mb-3">
                                    <div class="col-md-2">
                                        <div class="avatar"
                                            :style="`background-image:url('${baseUrl + c.userAvatar[0]?.url}')`">

                                        </div>
                                        <p>
                                            {{ c.userName[0] }}
                                        </p>
                                    </div>
                                    <div class="col-md-10 comment-item py-3">
                                        <p>

                                            {{ c.comment }}
                                        </p>
                                        <small class="text-sm text-secondary">
                                            {{ dateFormat(c.date) }}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade " id="chat" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div  class="modal-body modal-h">
                            <div v-if="selectedProduct.comments" v-for="(item, index) in selectedProduct.comments" :key="index">
                                <p>
                                    {{ item.comment }}
                                </p>
                                <p>
                                    {{ dateFormat(item.date) }}
                                </p>

                                <div class="avatar" :style="`background-image:url('${baseUrl + item.userAvatar[0]?.url}')`">

                                </div>

                            </div>
                            <small v-if="warning!==''" class="text-danger my-3">{{ warning }}</small>

                        </div>
                        <div class="modal-footer">
                            <input v-model="commentMessage" type="text" class="form-control" />
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="sendComment">ส่งความคิดเห็น</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal -->
            <!-- login modal -->
            <div class="modal fade " id="login" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">เข้าสู่ระบบ</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body modal-h d-flex flex-row justify-content-center align-items-center">
                            <div>

                                <label class="form-label">username</label>
                                <input v-model="username" type="text" class="form-control" />
                                <label class="form-label">password</label>
                                <input v-model="password" type="password" class="form-control" />
                                <button type="button" class="btn btn-primary my-3" data-bs-dismiss="modal"
                                    @click="signin">ลงชื่อเข้าใช้</button>
                                <button type="button" class="btn btn-link text-sm" data-bs-dismiss="modal"
                                    @click="$router.push('/signup')">สมัครสมาชิก</button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end login modal -->
        </div>
    </div>
</template>
<script>
import Product from "@/services/productservice";
import User from "@/services/user";
import { useUserStore } from "@/stores/user";

export default {
    setup() {
        const userStore = useUserStore();
        const productservice = new Product();
        const userservice = new User();

        const dateFormat = (date) => {
            return new Date(date).toLocaleDateString('th-TH', { day: '2-digit', month: "short", year: "2-digit" });
        }

        return { productservice, userservice,userStore, dateFormat }
    },
    data() {
        return {
            baseUrl: import.meta.env.VITE_APP_BASEURL,
            auth: false,
            products: [],
            selectedProduct: [],
            username: "",
            password: "",
            commentMessage:"",
            warning:""
        }
    },
    computed: {
        authState() {
            if (this.userStore.token) {
                return true;

            } else {
                return false;
            }
        }
    },
    async mounted() {

        await this.getProduct();

    },
    methods: {
        async getProduct() {
            await this.productservice.getProduct().then(result => {

                if (result && result.message === 'Get product successfully') {
                    this.products = result.data;
                }
            })
        },
        comment(data) {
            this.selectedProduct = data;
        },
        async sendComment(){
            console.log(this.selectedProduct._id[0]);
            console.log(this.commentMessage);
            await this.productservice.commentProduct(this.selectedProduct._id[0],this.commentMessage).then(result=>{
                if(result && result.message ==="created comment successfully"){
                    this.getProduct();
                 
                }else{
                    this.warning ="ไม่สามารถส่ง message ได้"
                }
            })
        },
        async signin() {
            const data = {
                username: this.username,
                password: this.password,
            }
            await this.userservice.Signin(data).then(result => {

                if (result && result.token) {

                    this.$router.push('/profile')
                }
            })
        }
    }
}
</script>

<style scoped>
.product-view {
    display: flex;
    justify-content: center;
    width: 100%
}

.content {
    max-width: 600px;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-size: contain;


}

.comment-item {
    background-color: rgb(221, 221, 221);
    border-radius: 0.5rem;
}

.btn-comment {
    font-size: smaller;
    text-decoration: none;
}

.modal-h {
    min-height: 70vh !important;
}
</style>