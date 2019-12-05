<template>
  <div class="home">
    <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="用户名" prop="user"></el-table-column>
      <el-table-column label="密码" prop="pwd"></el-table-column>
      <el-table-column align="right">
        <template slot="header">操作</template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="limit"
      @current-change="change"
    ></el-pagination>

    <!-- Form -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      limit: 2,
      total: 0,
      dialogFormVisible: false,
      form: {
        user: "",
        pwd: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //删除
    handleDelete(row) {
      this.$http
        .get("/api/del", { params: { id: row.id } })
        .then(({ data }) => {
          if (data.code == 0) {
            alert(data.msg);
            this.getData();
          } else {
            alert(data.msg);
          }
        });
    },
    //封装公共的渲染视图
    getData() {
      this.$http
        .get("/api/list", {
          params: { pageNum: this.pageNum, limit: this.limit }
        })
        .then(({ data }) => {
          if (data.code == 1) {
            this.tableData = data.data;
            this.total = data.sum;
          } else {
            alert("数据为空");
          }
        });
    },
    change(index) {
      this.pageNum = index;
      this.getData();
    },
    //添加
    addFn() {
      if (this.form.user && this.form.pwd) {
        let url = "";
        if (this.form.id || this.form.id===0) {
          url = "/api/update";
        } else {
          url = "/api/add";
        }

        this.$http.post(url, { ...this.form }).then(({ data }) => {
          if (data.code == 1) {
            alert(data.msg);
            this.getData();
          } else {
            alert(data.msg);
          }
          this.dialogFormVisible = false;
          this.form = {
            user: "",
            pwd: "",
            id: ""
          };
        });
      } else {
        alert("参数不够");
      }
    },
    //编辑
    handleEdit(row) {
      // console.log(row.id);
      this.dialogFormVisible = true;
      this.form = {
        ...row
      };
    }
  }
};
</script>
