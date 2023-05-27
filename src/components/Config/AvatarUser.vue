<template>
    <v-row align-h="between">
        <v-col>
            <div class="d-flex">
                <div class="mt-3">

                    <img  v-if="state" :src="$filters.baseUrlPublic(avatar)" alt="" srcset="" class="rounded" width="100" height="100">
                    <img v-else :src="imagePreview" alt="" srcset="" class="rounded" width="100" height="100">
                    <input type="file" class="d-none"
                            id="image"
                            accept="image/*"
                            ref="avatar"
                            name="avatar"
                            @change="getImage($event)"
                          >
                    <a href @click.prevent="openFile()" class="edit-avatar">
                        <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" fill="#4855BB" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="1.5rem" height="1.5rem" viewBox="0 0 528.899 528.899" style="enable-background:new 0 0 528.899 528.899;"
                        xml:space="preserve" >
                            <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                            c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
                            C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
                            L27.473,390.597L0.3,512.69z"/>
                        </svg><br>
                    </a>
                    <div v-if="selectFile.avatar" class="mt-2">
                        {{selectFile.avatar.name}}
                        <v-button class="btn badge-light" @click="selectFile.avatar = ''" type="button">
                            <i class="fa fa-trash text-danger"></i>
                        </v-button>
                    </div>
                    <p class="font-weight-bold">Foto de perfil</p>
                </div>
            </div>
        </v-col>
    </v-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name:'AvatarUser',
    props:['avatar'],
    computed:{...mapState('user',['account'])},
    data() {
        return {
            inputName:false,
            state:true,
            headers:{"Accept": "form-data"},
            form:{
                name:''
            },
            selectFile:'',
            imagePreview:''
        }
    },
    methods: {
        openFile(){
            this.$refs.avatar.value = ''
            this.$refs.avatar.click()
        },
        getImage(e){
            console.log(e)
            let image = this.$refs.avatar.files[0]
            this.selectFile = image;
            this.form.name = this.selectFile.name

            // let reader = new FileReader()
            // reader.readAsDataURL(image);
            console.log(image)

            this.imagePreview = URL.createObjectURL(image)

            this.state = false
            this.setImage = false

        },
        upload(){
            const formData = new FormData();
            formData.append('name', 'a define')
            formData.append('email', 'a define')

            formData.append('avatar',  this.$refs.fileInput.files[0])

            console.log('UPLOAD')
            // const url = `${baseApiUrl}/${this.user.type}/avatar`
            // const auth = JSON.parse(localStorage.getItem(userKey))

        },
        setPresentation(){
            this.inputName = true
        }
    }
}
</script>
<style scoped>
.mouse-name{
    cursor:pointer;
}
.rounded:hover{
    opacity: 0.2;
}
.edit-avatar{
    cursor: pointer;
    margin-left: -57px;
    margin-right: 47px;
    opacity: 0;
}
.edit-avatar:hover{
    opacity: 1;
}
.custom-file{
    width: 70%;
    height: 2rem;
}
.custom-file-label{
    border: 1px solid #4855BB !important;
    border-radius: 0.5rem !important;
}
</style>>
