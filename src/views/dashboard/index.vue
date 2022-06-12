<template>
  <el-row :gutter="30" style="margin-left: 9%; margin-right: 9%">
    <el-col v-if="entities.length == 0" style=""
    ><el-empty description="暂无数据"></el-empty
    ></el-col>
    <el-col
      v-else
      :span="8"
      v-for="(o, index) in entities"
      :key="index"
      class="card-col"
    >
      <el-card style="border-radius: 25px">
        <el-image :src="demoImgUrl">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div style="padding: 10px">
          <div style="text-align: left; overflow: hidden">
            <h4>DID:<span class="asset-discription">{{ o.did }}</span></h4>
            <h4>ID:<span class="asset-discription">{{ o.id }}</span></h4>
            <h4>Name:<span class="asset-discription">{{ o.name }}</span></h4>
            <h4>Owner:<span class="asset-discription">{{ o.owner }}</span></h4>
            <h4>Price:<span class="asset-discription">{{ o.price ? o.price : "N/A" }}</span></h4>
            <h4>IPFShash:<span class="asset-discription">{{ o.ipfs }}</span></h4>
          </div>
          <div class="bottom clearfix">
            <el-button
              type="success"
              class="button"
              @click.native="getIPFS(o.ipfs)"
              icon="el-icon-search"
            >IPFS</el-button
            >
            <el-button
              type="primary"
              class="button"
              @click="buyAsset(o.id)"
            >购买它</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      entities: [
        {
          did: "did:dns:example.com",
          id: "0x0698a219f013cd9d3b6a5c2b6f633d4ae07282cf",
          name: "example.com domain",
          owner: "0x8db58193c03fe7e5d2d2ab9bf1c80f847c706743",
          price: null,
          url: "https://dam.whh.pw//api/asset/valid?id=example.com",
          ipfs: "QmTaq2X243Wn3vAydoEjPHeFccLBYGYR9LEuYcnN7CQDKv",
        }
      ],
      demoImgUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp5.itc.cn%2Fimages01%2F20210506%2Fa8181137567e4fe99e49cf34fc968387.jpeg&refer=http%3A%2F%2Fp5.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651634552&t=a3d21b8e08faa20460acac5311874469",
    }
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    getIPFS(hash) {
      var ipfsAddr = 'https://ipfs.io/ipfs/' + hash
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
