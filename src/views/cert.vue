<template>
  <div class="homepage">
    <h1 style="text-align: center;font-size: 30px">证书列表</h1>
    <el-table
      :data="tableData"
      style="margin-left: 20%; width: 80%"
    >
      <!--      <el-table-column fixed prop="userid" label="所有者DID"> </el-table-column>-->
      <el-table-column prop="key" label="证书ID" />
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            class="button"
            icon="el-icon-search"
            size="mini"
            @click="selectCert(scope)"
          >Show</el-button>
          <el-button
            type="danger"
            class="button"
            size="mini"
            @click="deleteCert(scope)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="链上证书详情" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item v-for="(x, index) in certDatail" label-width="100px">
          <span slot="label">{{ x.name }}:</span>
          <el-input v-model="x.value" :disabled="true" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <Footer />
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getCertList, deleteCert } from '@/api/user-remote'

export default {
  name: 'Certlist',
  data() {
    return {
      // tableData: [
      //   {
      //     ca: {},
      //     key: 'domain example.com'
      //   },
      //   {
      //     ca: {},
      //     key: 'domain example.com'
      //   }
      // ],
      tableData: [],
      certDatail: [],
      dialogFormVisible: false
    }
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getCertList().then(response => {
        console.log(response.payload.resultList)
        this.tableData = response.payload.resultList
        // var temp = response.payload.resultList
        // for (const k in temp) {
        //   this.tableData.push(k.ca)
        // }
      })
    },
    canOperate(scope) {
      console.log(scope.row.ipfs)
      return scope.row.ipfs == null
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key == '/' || key == '#') {
        this.$store.commit('updateActiveIndex', '/index')
      } else {
        this.$store.commit('updateActiveIndex', key)
      }
    },
    selectCert(scope) {
      this.dialogFormVisible = true
      console.log(scope.row)
      this.certDatail = []
      const obj = scope.row.ca
      for (const k in obj) {
        var attr = {
          name: '',
          value: ''
        }
        attr.name = k
        attr.value = obj[k]
        console.log(k)
        console.log(obj[k])
        this.certDatail.push(attr)
      }
    },
    deleteCert(scope) {
      console.log(scope.row.key)
      this.$confirm('此操作将删除该证书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        deleteCert(scope.row.key).then(response => {
          console.log(response)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
