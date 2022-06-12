<template>
    <div class="bg-light" style="z-index: -100">
        <el-row :gutter="20" align="center">
            <el-col :span="4" :offset="1">
                <img src="../../assets/images/JNUlogo.png" alt="" class="footer-img">
            </el-col>
            <el-col :span="16" :offset="2">
                <el-row type="flex" justify="center" :gutter="50">
                    <el-col  class="vertical-center ">
                        <router-link to="#" class="link-style"> <p>关于我们</p></router-link>
                    </el-col>
                    <el-col  class="vertical-center ">
                        <router-link to="#" class="link-style" ><p>隐私策略</p></router-link>
                    </el-col>
                    <el-col  class="vertical-center ">
                        <router-link to="#" class="link-style"><p>帮助中心</p></router-link>
                    </el-col>
                </el-row>
                <el-row>
                    <p>Region Copyright © 2022 JNU All Rights Reserved.</p>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .bg-light {
        background-color: #f5f6fa;
    }

    .vertical-center {
        margin-top: 40px;
    }
    .link-style{
        text-decoration: none;
        color: black;
    }
    .link-style:hover{
        color: #9419a0;
        font-weight: bolder;
    }
    .footer-img{
        width: 150px;height: 150px;
    }
</style>
