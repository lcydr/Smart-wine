<el-table-column label="操作" min-width="200">
    <template slot-scope="scope">
     <el-button @click="handleClick(scope.row)" type="text" size="small"
      >查看详情</el-button
     >
     <el-button type="text" size="small">修改</el-button>
     <el-button
      type="text"
      size="small"
      style="color: red"
      @click.native.prevent="deleteRow(scope.$index, tableData)"
      >删除</el-button
     >
    </template>
   </el-table-column>