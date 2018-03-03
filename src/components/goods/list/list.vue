<template>
    <div class="detail">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">购物商城</el-breadcrumb-item>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-button type="info" size="medium"  round><i class="el-icon-plus"></i> 新增</el-button>
            <el-button type="warning" size="medium"  round @click="all"><i class="el-icon-check" ></i> 全选</el-button>
            <el-button type="danger" size="medium" @click='delGoodlist'  round ><i class="el-icon-delete"  @click="openFullScreen2"></i> 删除</el-button>    
            <div class="demo-input-suffix">
                <el-input v-model="query.searchvalue"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    @blur="searchGood"
                    >
                </el-input>
            </div>
         </div>   
            <div class="table">
                  <el-table ref="multipleTable"  max-height="600" :data="tableData3" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection"   width="55"></el-table-column>
                    <el-table-column label="标题" width="300">
                        <template slot-scope="scope">
                                   <el-tooltip placement="right">
                                         <router-link style="color: #666;"  :to="{ name: 'goodsDetail' }">
                                               {{ scope.row.title }}  
                                        </router-link> 
                                         <div slot="content">
                                             <img width="100px" height="100px" :src="scope.row.imgurl" alt="" srcset="">
                                         </div>
                                    </el-tooltip>
                            </template>
                    </el-table-column>
                    <el-table-column prop="categoryname" label="所属类型" width="120"></el-table-column>
                    <el-table-column prop="stock_quantity" label="库存" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="market_price" label="市场价" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="sell_price" label="销售价" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="属性" show-overflow-tooltip>
                         <template slot-scope="scope">
                             <el-tooltip content="轮播图" placement="top">
                                   <i  :class="[{'active':scope.row.is_slide==1 ? true : false},'el-icon-picture']"></i>
                            </el-tooltip>
                              <el-tooltip content="置顶" placement="top">
                                   <i class="el-icon-upload" :class="[{'active':scope.row.is_top ==1? true : false},'el-icon-upload']"></i>
                            </el-tooltip>
                              <el-tooltip content="收藏" placement="top">
                                   <i  :class="['active','el-icon-star-on']"></i>
                            </el-tooltip>       
                        </template>    
                    </el-table-column>
                    <el-table-column prop="address" label="操作" show-overflow-tooltip>
                         <template slot-scope="scope">
                            <router-link  style="color: #666;"  :to="{ name: 'goodsDetail' }">修改</router-link>     
                        </template>    
                    </el-table-column>
                    </el-table>
        </div>
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.pageIndex"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="query.total">
        </el-pagination>
    </div>
</template>
<script>
export default {
    data() {
      return {
         query: {
                    pageIndex: 1,
                    pageSize: 2,
                    searchvalue: '',
                    total:0
        },  
        detailGoodlist:[],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: { 
        handleSizeChange(size){
            this.query.pageSize=size;
            this.getAllGoodList();
        },
        handleCurrentChange(currentPage){
            this.query.pageIndex=currentPage
            this.getAllGoodList();
        },
        all(){
            document.querySelector(".el-checkbox__inner").click();
            },
        delGoodlist(){
               if(this.detailGoodlist.length!==0){
                     var delId=this.detailGoodlist.map(v=>v.id).join(',')
                      this.$http.get(this.$api.gsDel+delId).then(()=>{
                      this.openFullScreen2();
                    })  
                }
        
        },
        searchGood(){
          this.getAllGoodList();
        },
        /* 加载 */
        openFullScreen2(){
           const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          this.getAllGoodList();
          loading.close();
           }, 1000);
        },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      /* 获取选中的内容 */
      handleSelectionChange(val) {
        this.detailGoodlist = val;
      },
      getAllGoodList(){
        let  {pageIndex,pageSize,searchvalue}=this.query;
        this.$http.get(this.$api.gsList,{ params: {pageIndex,pageSize,searchvalue}}).then((res)=>{
            this.tableData3=res.data.message;
            this.query.total=res.data.totalcount;
        })
      }
    },
    created(){
        this.getAllGoodList();
    }
  }
</script>

<style scoped lang="less">
    .search{
         margin-top: 20px;
         border: 1px solid #e5e5e5;
         padding: 10px;
        border-radius: 5px;
        .table{
            margin-top: 20px;
        }
        }
    .el-breadcrumb{
        padding: 10px;
        border-bottom: 2px solid #e5e5e5;
       
    }
    .demo-input-suffix{
        width: 15%;
        float: right;
    }
      [class^=el-icon].active { 
         color: #000; 
         font-weight: bold; 
      }

</style>