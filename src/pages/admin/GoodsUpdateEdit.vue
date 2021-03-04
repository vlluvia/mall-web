<template>
  <div class="add-edit">
    <el-form ref="formName" :model="formName" label-width="140px">
      <el-form-item
        prop="goodsName"
        label="商品名称："
        :rules="{required: true, message: '不能为空', trigger: 'blur'}">
        <el-input v-model="formName.goodsName"></el-input>
      </el-form-item>
      <el-form-item
        prop="goodsName"
        label="城市："
        :rules="{required: true, message: '不能为空', trigger: 'blur'}">
        <el-select
          prop="goodsTypeId"
          v-model="formName.goodsTypeId"
          value=1
          placeholder="城市">
          <el-option v-for="(item,index) in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="goodsSrc"
        label="图片地址："
        :rules="{required: true, message: '不能为空', trigger: 'blur'}">
        <el-input v-model="formName.goodsSrc"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in formName.goodsDetail"
        :label="'规格详情 ' + index+'：'"
        :key="domain.key"
        :prop="'goodsDetail.' + index + '.goodsSizeName'"
        :rules="{
      required: true, message: '不能为空', trigger: 'blur'
    }"
      >
        <div style="width: 70%;margin: 5px">
          <p>名称：</p>
          <el-input v-model="domain.goodsSizeName"></el-input>
          <p>库存量</p>
          <el-input-number v-model="domain.goodsStack" controls-position="right" :min="1"></el-input-number>
          <p>价格</p>
          <el-input-number v-model="domain.goodsSizePrice" :precision="2" :step="0.1"></el-input-number>
          <el-button type="success" icon="el-icon-plus" style="margin-left: 50px;" circle
                     @click="addDomain"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click.prevent="removeDomain(domain)"></el-button>
        </div>

      </el-form-item>
      <el-form-item
        prop="goodsDesc"
        label="商品描述："
        :rules="{required: true, message: '不能为空', trigger: 'blur'}">
        <el-input type="textarea" v-model="formName.goodsDesc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formName')">立即跟新</el-button>
        <el-button @click="resetForm('formName')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {updateGoods, getAdminGoods} from '../../api/admin';
import {getGoodsTypeListClient} from '../../api/mall';
export default {
  name: "GoodsAddEdit",
  data() {
    return {
      formName: {
        id: 0,
        goodsName: '',
        goodsTypeId: 1,
        goodsSrc: '',
        goodsDesc: '',
        goodsDetail: [{
          goodsSizeName: '',
          goodsStack: 0,
          goodsSizePrice: 0.0
        }]
      },
      typeList: [
        // {name: '首页', id: 0},
        // {name: '北京', id: 1},
        // {name: '上海', id: 2},
        // {name: '杭州', id: 3},
        // {name: '深圳', id: 4}
      ],
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formName.id = this.$route.params.goodsId;
          const res = updateGoods(this.formName);
          res
            .then((data) => {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            })
            .catch((e) => {
              this.$message.error('添加失败');
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    removeDomain(item) {

      var index = this.formName.goodsDetail.indexOf(item)
      if (index !== 0) {
        this.formName.goodsDetail.splice(index, 1)
      }
    },
    addDomain() {
      this.formName.goodsDetail.push({
        goodsSizeName: '',
        goodsStack: 0,
        goodsSizePrice: 0.0,
        key: Date.now()
      });
    }, getGoodsType() {
      const res = getGoodsTypeListClient();
      res
        .then((data) => {
          this.typeList = data;
        })
        .catch((e) => {
          this.$message.error('商品获取失败');
        })
    }
  },
  mounted() {
    this.getGoodsType();
    if (this.$route.params.goodsId !== '0') {
      this.formName.id = this.$route.params.goodsId;
      const res = getAdminGoods(this.$route.params.goodsId);
      res
        .then((data) => {
          this.formName = data;
        })
        .catch((e) => {
          this.$message.error('添加失败');
        })
    }
  },
}
</script>

<style scoped>

</style>
