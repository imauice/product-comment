<template>
    <div class="container">
        <div class="content">
            <div v-if="!profile">
                <div v-if="!create" class="text-center text-light">

                    <h4>คุณยังไม่ได้สร้างข้อมูลส่วนตัว</h4>

                    <button class="btn btn-primary mt-3 " style="max-width:10rem" @click="setCreate">สร้างเลย!</button>
                </div>
                <div v-else>
                    <!-- create form -->
                    <form class="text-light text-center">
                        <div class="text-center mb-3">

                            <label class="avatar" :style="`background-image:url(${preview ? preview : tempAvatar})`">
                                <input type="file" accept="image/png, image/jpeg" @change="setAvatar"
                                    style="display:none;" />
                            </label>
                        </div>
                        <label class="form-label">ชื่อเล่น</label>
                        <input type="text" class="form-control" />
                        <button class="btn btn-primary my-3">สร้างเลย!</button>

                        <span  v-if="warning!==''" class="d-block text-info">{{ warning }}</span>
                    </form>
                </div>
            </div>
            <div v-else>

            </div>
        </div>

    </div>
</template>
<script>

import User from "@/services/user";
import tempAvatar from "@/assets/images/1694862417620-750726734-avatar-2e5cccedf66e4c1894f649192615f6cb-512x512.jpeg"

export default {
    setup() {
        const userservice = new User();
        return { userservice };
    },
    data() {
        return {
            create: false,
            profile: null,
            name: '',
            avatar: null,
            preview: null,
            tempAvatar,
            warning:'',
        }
    },
    async mounted() {
        await this.getProfile();
    },
    methods: {
        setCreate() {
            this.create = true;
        },
        async getProfile() {
            this.userservice.getProfile().then(result => {
                console.log(result);
                if (result) {
                    console.log(result.data);
                    this.profile = result.data;
                } else {
                    this.profile = null;
                    this.create = false;
                }
            })
        },
        setAvatar(e) {
            this.preview = null;
            const file = e.target.files[0];

            if (file.size < 100 * 1000) {

                this.avatar = file;

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener("load", (event) => {
                    this.preview = event.target?.result;
                })

            }else {
                this.preview = null
                this.warning ="กรุณาโหลดรูปขนาดไม่เกิน 100kb"
            }
        },
        async createProfile() {
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('avatar', this.avatar);
        }
    }
}
</script>
<style>
.container {
    min-height: 70vh;
    align-items: center;
}

.content {
    display: flex;
    justify-content: center;
}

.avatar {
    cursor: pointer;
    width: 150px;
    height: 150px;
    background-size: contain;
    border-radius: 50%;
}
</style>