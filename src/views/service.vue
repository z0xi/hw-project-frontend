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
        <el-image :src="demoImgUrl[serviceindex]" style="width: 360px; height: 200px;border-radius: 10px">
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
                <el-tag size="mini" v-if="o.verify.state=='1'" type="success" effect="dark">Authorized</el-tag>
                <el-tag size="mini" v-else type="info" effect="dark">Unauthorized</el-tag>
              </div>
            </div>
            <div class="text item">
              <div class="item_tag">
                <span>ServiceID:</span>
              </div>
              <div class="item_desr">
                <span>{{ o.verify.serverid }}</span>
              </div>
            </div>
            <div class="text item">
              <div class="item_tag">
                <span>ServiceName:</span>
              </div>
              <div class="item_desr">
                <span>{{ o.verify.server }}</span>
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
                >Show</el-button>
              </div>
            </div>
            <div class="text item">
              <div class="slecter">
                <el-select size="medium" v-model="selectCertID[serviceindex]" placeholder="Select Cert" @click.native="selectCert(serviceindex)">
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
                >Create Claim</el-button>
              </div>
            </div>
            <el-dialog title="Create Claim" :visible.sync="dialogFormVisible">
              <el-form>
                <el-form-item v-for="(key, index) in Object.keys(claim)" :key="index" label-width="100px">
                  <span slot="label">{{ key }}</span>
                  <el-input v-model="claim[key]" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click.native="createClaim(serviceindex)">Request Service</el-button>
              </div>
            </el-dialog>
            <el-dialog title="Requested Attribute Set" :visible.sync="requestDialogVisible">
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
      ['https://zyss.eduour.cn/Uploads/Images/Content/catid1/2018-08/5b7a348beb7fd.png',
        'https://ts1.cn.mm.bing.net/th/id/R-C.fa538277af392f7b916bc16e88fcfa09?rik=WDrDCzk25Gao5Q&riu=http%3a%2f%2fimg1.mydrivers.com%2fimg%2f20200308%2f32a1fadb342045d69c0104dd8eae9eef.jpg&ehk=hYhoq%2fuK%2fd9qjTrM718Llb0RUa%2bUzy8w2Lv2tNqiAgA%3d&risl=&pid=ImgRaw&r=0',
        'https://zyss.eduour.cn/Uploads/Images/Content/catid1/2018-08/5b7a348beb7fd.png',
        'https://zyss.eduour.cn/Uploads/Images/Content/catid1/2018-08/5b7a348beb7fd.png'],
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
  margin: 10px;
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
  margin-left: 40%;
  //min-height: 10px;
  text-align:center;
  font-family: "Times New Roman";

  color:#008080;
}
.text {
  width: 100%;
  font-size: 20px;
  font-family: "Serif";
  color: #000c21;
}
</style>
