<template>
    <div class="detail">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">购物商城</el-breadcrumb-item>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-button type="info" size="medium"  round><i class="el-icon-plus"></i> 新增</el-button>
            <el-button type="warning" size="medium"  round><i class="el-icon-check"></i> 全选</el-button>
            <el-button type="danger" size="medium"  round><i class="el-icon-delete"></i> 删除</el-button>    
            <div class="demo-input-suffix">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    >
                </el-input>
            </div>
         </div>   
            <div class="table">
                  <el-table ref="multipleTable"  max-height="600" :data="tableData3" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection"   width="55"></el-table-column>
                    <el-table-column label="标题" width="300">
                        <template slot-scope="scope">
                                   <router-link style="color: #666;" v-popover:popover1 :to="{ name: 'goodsDetail' }">
                                       {{ scope.row.title }}  
                                    </router-link> 
                            </template>
                    </el-table-column>
                    <el-table-column prop="categoryname" label="所属类型" width="120"></el-table-column>
                    <el-table-column prop="stock_quantity" label="库存" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="market_price" label="市场价" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="sell_price" label="销售价" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="属性" show-overflow-tooltip>
                         <template slot-scope="scope">三个图标</template>    
                    </el-table-column>
                    <el-table-column prop="address" label="操作" show-overflow-tooltip>
                         <template slot-scope="scope">
                            <router-link  style="color: #666;"  :to="{ name: 'goodsDetail' }">修改</router-link>     
                        </template>    
                    </el-table-column>
                    </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
         query: {
                    pageIndex: 1,
                    pageSize: 10,
                    searchvalue: '',
        },  
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
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created(){
        this.$http.get(this.$api.gsList,{ params: this.query }).then((res)=>{
            this.tableData3=res.data.message;
            console.log(res.data.message)
        })
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

</style>