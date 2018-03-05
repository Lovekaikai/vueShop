<template>
    <div class="detail">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">购物商城</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/admin'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑内容</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="detail_table">

        <el-form ref="form" label-position="left"  :model="form"  label-width="90px" class="form1">
          <el-row :gutter="4">
            <el-col :span="10">
             <el-form-item label="内容标题">
                   <el-input v-model="form.title" ></el-input>
               </el-form-item>
           </el-col>
            <el-col  :span="10">
                  <el-form-item label="副标题" >
                     <el-input v-model="form.sub_title"></el-input>
                  </el-form-item>
           </el-col>
          </el-row>
           <el-row :gutter="2">
              <el-col :span="8">
              <el-form-item label="所属的类别" prop="category_id">
                   <el-select v-model="form.category_id" placeholder="请选择">
                    <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
                        <span>
                            <span v-if="item.class_layer != 1">|-</span> 
                            <span>{{ item.title }}</span>
                        </span>
                    </el-option>
                </el-select>
              </el-form-item>
              </el-col>   
              <el-col :span="4">
                  <el-form-item label="是否发布">
                        <el-switch v-model="form.status">
                        </el-switch> 
                    </el-form-item>
              </el-col>  
              <el-col :span="10">
                   <el-form-item label="推荐类型">
                     <el-tooltip content="轮播图" placement="top">
                        <el-switch v-model="form.is_slide">
                            </el-switch> 
                    </el-tooltip>
                       <el-tooltip content="置顶" placement="top" >
                        <el-switch
                         v-model="form.is_top"
                              >
                            </el-switch> 
                       </el-tooltip>

                       <el-tooltip content="收藏" placement="top">
                        <el-switch
                            v-model="form.is_hot"  >
                            </el-switch> 
                      </el-tooltip>
                      </el-form-item>
              </el-col>               
          </el-row>
            <el-row :gutter="50">
                <el-col :span="8">
          <el-upload
              action="http://localhost:8899/admin/article/uploadimg"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :file-list="form.imgList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
                </el-col>
              <el-col :span="8">
            <el-upload
              action="http://localhost:8899/admin/article/uploadfile"
              :on-success="handleFileUpload"
              :file-list="form.fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
             </el-col>
           </el-row>     
            <el-row :gutter="10" class="goodListMessage">
                <el-col :span="6">
                   <el-form-item label="商品货号" >
                     <el-input v-model="form.goods_no"></el-input>
                  </el-form-item>
                </el-col>  
                <el-col :span="6">
                   <el-form-item label="库存数量" >
                     <el-input v-model="form.stock_quantity"></el-input>
                  </el-form-item>
                </el-col>  
                <el-col :span="6">
                   <el-form-item label="市场价格" >
                     <el-input v-model="form.market_price"></el-input>
                  </el-form-item>
                </el-col>  
                <el-col :span="6">
                   <el-form-item label="销售价格" >
                     <el-input v-model="form.sell_price"></el-input>
                  </el-form-item>
                </el-col>  
            </el-row>
                <el-form-item label="内容摘要" >
                     <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      v-model="form.zhaiyao"></el-input>
                  </el-form-item>
            <template>
                <el-form-item label="详细信息" >
                    <quill-editor v-model="form.content"></quill-editor>
                </el-form-item>
            </template>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
</template>

<script>
   import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'
    export default {
    data() {
      return {
        id:this.$route.params.id,
        form: {},
        category:[]
      
      }
    },
    components: {
        quillEditor
    },
    methods: {
       getCategory() {
                this.$http.get(this.$api.ctList + 'goods').then(res => {   
                    if(res.data.status == 0) {
                        console.log(res)
                        this.category = res.data.message;
                    }
                });
      },
      gsDetailAll(){
          let  id=this.id
          this.$http.get(this.$api.gsDetail+id).then((res)=>{
            this.form=res.data.message;
            this.form.category_id=+this.form.category_id
            console.log(this.form)
          })
      },
      gsEdit(){
          this.$http.post(this.$api.gsEdit + this.id, this.form).then(res => {    
                if(res.data.status == 0) {
                        this.$alert('数据修改成功');
            }
          });
      },
       onSubmit() {
         this.gsEdit();
      },
      handleFileUpload(res){
        this.form.fileList.push(res);
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(file) {

        this.form.imgList=[file]
      }
    },
    created(){
    this.gsDetailAll();
     this.getCategory();
      }

      // this.$http.
    }
</script>

<style scoped lang="less">
    .el-form{
      margin-top: 20px;
    }
    .goodListMessage{
      margin-top: 20px;
    }
</style>