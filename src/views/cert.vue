<template>
  <div class="homepage">
    <h1 style="text-align: center;font-size: 30px">证书列表</h1>
    <el-table
      :data="tableData"
      style="margin-left: 20%; width: 80%"
      height="250"
    >
      <el-table-column fixed prop="did" label="所有者DID"> </el-table-column>
      <el-table-column prop="name" label="证书ID"> </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            class="button"
            icon="el-icon-search"
            size="mini"
            @click="handleIPFS(scope)"
          >查看证书</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="链上证书详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item v-for="(x, index) in certDatail" label-width="100px">
          <span slot="label">{{x.name}}:</span>
          <el-input v-model=x.value :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <Footer></Footer>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getCertList } from '@/api/user-remote'

export default {
  name: 'Certlist',
  data() {
    return {
      tableData: [
        {
          did: 'did:dns:example.com',
          name: 'domain example.com',
          url: 'https://dam.whh.pw//api/asset/valid?id=example.com',
          // ipfs: "QmTaq2X243Wn3vAydoEjPHeFccLBYGYR9LEuYcnN7CQDKv",
        },
        {
          did: 'did:dns:example.com',
          name: 'domain example.com',
          url: 'https://dam.whh.pw//api/asset/valid?id=example.com',
          // ipfs: "QmTaq2X243Wn3vAydoEjPHeFccLBYGYR9LEuYcnN7CQDKv",
        }
      ],
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
    // this.getList()
  },
  methods: {
    getList() {
      getCertList().then(response => {
        console.log(response)
      })
    },
    canOperate(scope) {
      console.log(scope.row.ipfs);
      return scope.row.ipfs == null;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == "/" || key == "#") {
        this.$store.commit("updateActiveIndex", "/index");
      } else {
        this.$store.commit("updateActiveIndex", key);
      }
    },
    handleIPFS(scope) {
      this.dialogFormVisible= true;
      console.log(scope.row);
      this.certDatail = [];
      let obj = scope.row;
      for (let k in obj){
        var attr ={
          name:'',
          value:''
        }
        attr.name = k;
        attr.value = obj[k];
        console.log(k)
        console.log(  obj[k])
        this.certDatail.push(attr);
      }
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
