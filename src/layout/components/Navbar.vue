<template>
  <div class="nav-header">
    <!--    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->
    <el-menu
      :default-active="this.getActiveIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fdfbfb"
      text-color="#000"
      active-text-color="#000"
      router
      @select="handleSelect"
    >
      <el-menu-item index="/">
        <img
          src="../../assets/images/wormholeLogo.png"
          alt=""
          style="height: 55px; width: 55px"
        >
        Oracle-Demo
      </el-menu-item>
      <el-menu-item index="/certlist">CertificateList</el-menu-item>
      <el-menu-item index="/servicelist">ServiceList</el-menu-item>
      <el-upload
        ref="uploadplan"
        class="upload-demo"
        action=""
        style="margin:10px; float: right"
        accept=".json"
        :on-remove="handleRemove"
        :http-request="upload"
        :limit="1"
        :file-list="fileList"
      >
<!--        https://blog.csdn.net/zyynb/article/details/123223064-->
        <el-button size="small" type="primary">上传证书</el-button>
      </el-upload>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { getTest, requestLocalUpload } from '@/api/user'
import { requestRemoteUpload } from '@/api/user-remote'

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'getActiveIndex'
    ]),
    ...mapState(['activeIndex'])
  },
  data() {
    return {
      fileList: [],
      userID: '001'
    }
  },
  methods: {
    upload(param) {
      getTest().then(response => {
        console.log(response)
      })
      let formData = new FormData() // FormData对象，添加参数只能通过append('key', value)的形式添加
      // formData.append("id", this.tid); //添加id（这里是项目需要，根据个人情况选择是否添加）
      formData.append('credential', param.file) // 添加文件对象
      requestLocalUpload(formData).then(response => {
        console.log(response)
      })
      requestRemoteUpload(this.userID).then(response => {
        console.log(response)
      })
      this.fileList = []
    },
    handleRemove(file, fileList) {
      this.$message.warning('文件已移除')
      console.log(file, fileList)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
