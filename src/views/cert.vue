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
      <el-table-column label="证书状态">
        <template slot-scope="scope">{{
            scope.row.ipfs == null ? "无效" : "有效"
          }}</template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            class="button"
            icon="el-icon-search"
            size="mini"
            v-if="canOperate(scope)"
            @click="handleIPFS(scope)"
          >查看IPFS</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Footer></Footer>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Certlist',
  data() {
    return {
      tableData: [
        {
          did: "did:dns:example.com",
          name: "domain example.com",
          url: "https://dam.whh.pw//api/asset/valid?id=example.com",
          // ipfs: "QmTaq2X243Wn3vAydoEjPHeFccLBYGYR9LEuYcnN7CQDKv",
          ipfs: null,
          address: null,
        },
      ],
    };
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
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
      console.log(scope.row);
      var ipfsAddr = 'https://ipfs.io/ipfs/' + scope.row.ipfs
      console.log(ipfsAddr)
      window.open(ipfsAddr)
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
