<template>
  <el-row :gutter="30" style="margin-left: 9%; margin-right: 9%">
    <el-col
      v-if="entities.length == 0"
      style=""
    ><el-empty description="暂无数据" /></el-col>
    <el-col
      v-for="(o, serviceindex) in entities"
      :key="serviceindex"
      :span="8"
      class="card-col"
    >
      <el-card style="border-radius: 25px">
        <el-image :src="demoImgUrl">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
        <div style="padding: 10px">
          <div style="text-align: left; overflow: hidden">
            <div class="text item">
              <div class="item_tag">
                <span>Status:</span>
              </div>
              <div class="item_desr">
                <el-tag size="mini" v-if="o.verify.state=='1'" type="success" effect="dark">已授权</el-tag>
                <el-tag size="mini" v-else type="info" effect="dark">未授权</el-tag>
              </div>
            </div>
            <div class="text item">
              <div class="item_tag">
                <span>ServiceID:</span>
              </div>
              <div class="item_desr">
                <span>{{ o.verify.severid }}</span>
              </div>
            </div>
            <div class="text item">
              <div class="item_tag">
                <span>ServiceName:</span>
              </div>
              <div class="item_desr">
                <span>{{ o.verify.sever }}</span>
              </div>
            </div>
            <div class="text item" >
              <div class="item_tag">
                <span>AttributeSet:</span>
              </div>
              <div class="item_desr">
                <el-button
                  type="primary"
                  size="small"
                  class="button"
                  icon="el-icon-search"
                  @click="showRequest(o.verify.properties)"
                >查看要求</el-button>
              </div>
            </div>
            <div class="text item">
              <div class="slecter">
                <el-select size="medium" v-model="selectCertID[serviceindex]" placeholder="请选择" @click.native="selectCert(serviceindex)">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.key"
                    :value="item.key"
                  />
                </el-select>
              </div>
              <div class="item_desr">
                <el-button
                  type="primary"
                  size="medium"
                  class="button"
                  @click="showDialog(o,serviceindex)"
                >创建声明</el-button>
              </div>
            </div>
            <el-dialog title="创建申明" :visible.sync="dialogFormVisible">
              <el-form>
                <el-form-item v-for="(key, index) in Object.keys(claim)" :key="index" label-width="100px">
                  <span slot="label">{{ key }}</span>
                  <el-input v-model="claim[key]" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="createClaim(serviceindex)">请求服务</el-button>
              </div>
            </el-dialog>
            <el-dialog title="查看需要" :visible.sync="requestDialogVisible">
              <el-form>
                <el-form-item v-for="(key, rindex) in Object.keys(requestedClaim)" :key="rindex" label-width="100px">
                  <span slot="label">{{ key }}</span>
                  <el-input v-model="requestedClaim[key]" />
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
        </div>
        <!-- Form -->
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { requestLocalService } from '@/api/user'
import { getCertList, requestRemoteService, queryServiceList } from '@/api/user-remote'

export default {
  name: 'Servicelist',
  data() {
    return {
      entities: [],
      dialogFormVisible: false,
      requestDialogVisible: false,
      requestedClaim: {},
      claim: {},
      formLabelWidth: '120px',
      demoImgUrl:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp5.itc.cn%2Fimages01%2F20210506%2Fa8181137567e4fe99e49cf34fc968387.jpeg&refer=http%3A%2F%2Fp5.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651634552&t=a3d21b8e08faa20460acac5311874469',
      options: [],
      selectCertID: [1, 2, 3, 4],
      claimCertID: ''
    }
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.fetchServiceList()
  },
  methods: {
    showDialog(param, serviceindex) {
      param = param.verify.properties
      console.log(param)
      param = param.replace('{', '{"')
      param = param.replaceAll(':', '":"')
      param = param.replaceAll(',', '","')
      param = param.replace('}', '"}')
      this.claim = JSON.parse(param)
      console.log(this.claim)
      console.log(serviceindex)
      this.claimCertID = this.selectCertID[serviceindex]
      this.dialogFormVisible = true
    },
    showRequest(param) {
      param = param.replace('{', '{"')
      param = param.replaceAll(':', '":"')
      param = param.replaceAll(',', '","')
      param = param.replace('}', '"}')
      console.log(param)
      this.requestedClaim = JSON.parse(param)
      console.log(this.requestedClaim)
      this.requestDialogVisible = true
    },
    selectCert(index) {
      console.log(index)
      getCertList().then(response => {
        // console.log(response)
        this.selectCertID = []
        this.options = response.payload.resultList
        // this.selectCertID[index] =
      })
    },
    fetchServiceList() {
      queryServiceList().then(response => {
        console.log(response)
        this.entities = []
        this.entities = response.payload.list
        // for (const i in this.entities) {
        //   this.selectCertID.push(0)
        // }
      })
      // this.entities.push({
      //   'key': '10000',
      //   'verify': {
      //     'state': '1',
      //     'sever': 'HUAWEI',
      //     'properties': '{age:18}'
      //   }
      // })
      console.log(this.entities)
    },
    createClaim(index) {
      console.log(this.claim)
      // console.log(index)
      const param = new FormData()
      param.append('objects', JSON.stringify(this.claim))
      // console.log(param)
      requestLocalService(param).then(response => {
        console.log(response)
      })
      const remoteparam = new FormData()
      const str = []
      for (var k in this.claim) {
        str.push(k)
      }
      console.log(this.claimCertID)
      console.log(this.entities[index].key)
      console.log(str)
      remoteparam.append('key', this.entities[index].key)
      remoteparam.append('certid', this.selectCertID[index])
      remoteparam.append('paramset', str)

      requestRemoteService(remoteparam).then(response => {
        console.log(response)
      })
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 5px;
}
.item_tag{
  float:left;
  text-align:right;
}
.slecter{
  float:left;
  text-align:right;
  width: 150px;
}

.item_desr{
  //margin-left: 40%;
  min-height: 20px;
  text-align:right;
  font-family: "Times New Roman";

  color:#008080;
}
.text {
  width: 100%;
  font-size: 18px;
  font-family: "Serif";
  color: #000c21;
}
</style>
