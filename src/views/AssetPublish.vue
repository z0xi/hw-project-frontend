<template>
  <div class="homepage">
    <div class="nav-header">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fdfbfb"
        text-color="#000"
        active-text-color="#000"
        router
      >
        <el-menu-item index="/">
          <img
            src="../../../did/src/assets/images/wormholeLogo.png"
            alt=""
            style="height: 55px; width: 55px"
          />
          DID-Asseets
        </el-menu-item>
        <el-menu-item index="/marketplace">MarketPlace</el-menu-item>
        <el-menu-item index="/assetpublish" style="float: right"
          >个人中心</el-menu-item
        >
      </el-menu>
    </div>

    <h1>我的资产</h1>

    <el-table
      :data="tableData"
      style="margin-left: 10%; width: 80%"
      height="250"
    >
      <el-table-column fixed prop="did" label="DID"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column label="状态"> 有效 </el-table-column>
      <el-table-column label="已上链">
        <template slot-scope="scope">{{
          scope.row.ipfs == null ? "否" : "是"
        }}</template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleRegitry(scope)"
            v-if="canOperate(scope)"
            >上链</el-button
          >
          <el-button
            size="mini"
            type="primary"
            v-else
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
import Footer from "../../../did/src/components/Footer";
import axios from "axios";
import Web3 from "web3";
export default {
  name: "Macketpalce",
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
  components: {
    Footer,
  },
  mounted: function () {
    const uri = "https://whh.buzz/api/asset/all";
    console.log("url: ", uri);
    var param={
      headers:{"Access-Control-Allow-Origin": "*",}
    }
    axios.get(uri,param).then((res) => {
      console.log("res data: ", res.data);
      this.tableData = res.data;
    });
  },
  methods: {
    // handleRegitry(scope) {
    //   const { ethereum } = window;
    //   axios.get("http://127.0.0.1:8888/registry").then((res) => {
    //     var abi = res.data;
    //     console.log("上链ABI：", abi);
    //     const web3 = new Web3(ethereum);
    //     const registryAddr = "0xbA1F26A9fea115388E19Cfbd410cbc2DB0487249";
    //     const assetContract = new web3.eth.Contract(abi, registryAddr);
    //     var options = {
    //       from: ethereum.selectedAddress,
    //     };
    //     console.log("scope.row:",scope.row);


    //     var params = [
    //       scope.row.did,
    //       ethereum.selectedAddress,
    //       scope.row.url,
    //       scope.row.name,
    //       "123",
    //     ];
    //     assetContract.methods
    //       // .create(scope.row.did,ethereum.selectedAddress,scope.row.url,scope.row.name,"123")
    //       .create(...params)
    //       .send(options)
    //       .then((res) =>
    //         this.$message({
    //           message: res.data,
    //           showClose: true,
    //           duration: 1000,
    //         })
    //       )
    //       .catch((err) => {
    //         this.$message.error(err);
    //       });
    //   });
    // },
    handleRegitry(scope) {
      console.log(scope);
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        //If it isn't installed we ask the user to click to install it
        console.log("connect");
        this.msg = "Connect";
        ethereum.request({ method: "eth_requestAccounts" });

        //上链
        axios.get("https://whh.buzz/Registry.json").then((res) => {
          var abi = res.data;
          console.log("上链ABI：", abi);
          const web3 = new Web3(ethereum);
          const registryAddr = "0xbA1F26A9fea115388E19Cfbd410cbc2DB0487249";
          const assetContract = new web3.eth.Contract(abi, registryAddr);
          var options = {
            from: ethereum.selectedAddress,
          };
          console.log("scope.row:",scope.row);

          var getIPFSUri = "https://whh.buzz/api/asset/did";
          var postParms = {
            did: scope.row.did,
            name: scope.row.name,
            url: scope.row.url,
          };
          var postHeader = {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          };
          var hash;
          // 获取IPFS地址
          axios
            .post(getIPFSUri, JSON.stringify(postParms), postHeader)
            .then((res) => {
              console.log("getIPFSHash: ",res);
              console.log("getIPFSHash: ",res.data);
              this.hash = res.data;
              return;
            })
            .catch((err) => {
              this.$message.error(err);
            });

          var params = [
            scope.row.did,
            ethereum.selectedAddress,
            scope.row.url,
            scope.row.name,
            hash,
          ];
          assetContract.methods
            .create(...params)
            .send(options)
            .then((res) =>
              this.$message({
                message: JSON.parse(res),
                showClose: true,
                duration: 1000,
              })
            )
            .catch((err) => {
              this.$message.error(err);
            });
        });
      }
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
      console.log(scope.row);
      var ipfsAddr = "https://ipfs.io/ipfs/" + scope.row.ipfs;
      console.log(ipfsAddr);
      window.open(ipfsAddr);
    },
  },
};
</script>

<style scoped>
</style>
