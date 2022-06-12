<template>
  <el-row :gutter="30" style="margin-left: 9%; margin-right: 9%">
    <el-col v-if="entities.length == 0" style=""
    ><el-empty description="暂无数据"></el-empty
    ></el-col>
    <el-col
      v-else
      :span="8"
      v-for="(o, index) in entities"
      :key="service"
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
            <h3>DID:<span class="asset-discription">{{ o.did }}</span></h3>
            <h3>Name:<span class="asset-discription">{{ o.name }}</span></h3>
            <h3>Request:<span class="asset-discription"></span></h3>
            <h5><span class="asset-discription">{{ o.request }}</span></h5>
          </div>
          <div class="bottom clearfix">
<!--            <el-button-->
<!--              type="success"-->
<!--              class="button"-->
<!--              @click.native="getIPFS(o.ipfs)"-->
<!--              icon="el-icon-search"-->
<!--            >IPFS</el-button-->
<!--            >-->
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button
              type="primary"
              class="button"
              @click="buyAsset(o.id)"
            >使用该服务</el-button
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
  name: 'Servicelist',
  data() {
    return {
      entities: [
        {
          did: "did:dns:example.com",
          name: "HUAWEI",
          url: "https://dam.whh.pw//api/asset/valid?id=example.com",
          request: "Subject:Computer Science",
        }
      ],
      demoImgUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp5.itc.cn%2Fimages01%2F20210506%2Fa8181137567e4fe99e49cf34fc968387.jpeg&refer=http%3A%2F%2Fp5.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651634552&t=a3d21b8e08faa20460acac5311874469",
      options: [{
        value: '选项1',
        label: '证书1'
      }, {
        value: '选项2',
        label: '证书2'
      }, {
        value: '选项3',
        label: '证书3'
      }],
      value: ''
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
