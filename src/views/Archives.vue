<template>
    <div class="archives">
        <el-card shadow="hover">我的档案</el-card>
        <div class="content">
            <div class="left">
                <el-card shadow="hover" class="user-card">
                    <div class="user">
                        <img src="../assets/img/demo1.png"/>
                        <p>
                            <strong>{{user.studentName}}</strong><br/>
                            <span>{{user.className}}</span>
                        </p>
                    </div>
                    <div class="growth">我的成长值：<em>{{user.growths}}</em></div>
                    <div class="rank">
                        <span>
                            <em>{{user.bjRank}}名</em><br/>
                            班级排名
                        </span>
                        <span>
                            <em>{{user.bjRank}}名</em><br/>
                            年级排名
                        </span>
                    </div>
                </el-card>
                <el-card shadow="hover" class="data-card">
                    <header slot="header">我的资料
                        <el-button type="text" class="editor" @click="editor">{{dataBtnName}}</el-button>
                    </header>
                    <el-form label-width="70px" size="mini" disabled>
                        <el-form-item label="班主任">
                            <el-input v-model="dataForm.teachername+'老师'"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="dataForm" label-width="70px" size="mini" :disabled="dataFormDisabled">
                        <el-form-item label="我的理想">
                            <el-input v-model="dataForm.wdlx"></el-input>
                        </el-form-item>
                        <el-form-item label="兴趣爱好">
                            <el-input v-model="dataForm.xqah"></el-input>
                        </el-form-item>
                        <el-form-item label="我的特长">
                            <el-input v-model="dataForm.wdtc"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card shadow="hover" class="medal-card">
                    <header slot="header">我的奖章</header>
                    <ul>
                        <li v-for="i in medalList"><img :src="$proxy+imgUrl+i.jzsl"/><span>{{i.name}}</span></li>
                    </ul>
                </el-card>
            </div>
            <el-card shadow="hover" class="center">
                <header slot="header">
                    {{year}}学年
                    <div class="btn">
                        <el-button size="mini" @click="add">新增</el-button>
                        <el-button size="mini">导出</el-button>
                        <el-button size="mini" @click="detailShow=!detailShow">{{detailShow?'成长之树':'成长详情'}}</el-button>
                    </div>
                </header>
                <ul class="list" v-show="detailShow">
                    <li v-for="i in detailList">
                        <i v-if="i.jlfs==='1'" class="fa fa-thumbs-up green"></i>
                        <i v-else class="fa fa-book orange"></i>
                        <div class="main">
                            <p>{{i.title}}，成长值+{{i.growth}}；</p>
                            <time>{{i.givetime}}</time>
                            <div class="img">
                                <img v-for="j in i.imglist" :src="$proxy+imgUrl+j.url"/>
                            </div>
                        </div>
                    </li>
                </ul>
                <el-pagination style="margin-top: 20px" v-show="total>pageSize&&detailShow" background
                               @current-change="handleCurrentChange"
                               :current-page=pageNum
                               :page-size=pageSize
                               layout="total, prev, pager, next, jumper"
                               :total=total>
                </el-pagination>
                <div class="tree" v-show="!detailShow">
                    <img v-show="tree" :src="'tree/'+tree+'.png'"/>
                    <em>{{user.growths}}</em>
                    <div id="radar"></div>
                </div>
            </el-card>
            <div class="right">
                <el-card shadow="hover" class="evaluate-list">
                    <header slot="header">我的评价</header>
                    <ul>
                        <li v-for="i in evaluateList">
                            <el-button type="text" icon="el-icon-edit" @click="eva(i.id)">{{year}}第{{i.weekly}}周评价</el-button>
                        </li>
                    </ul>
                </el-card>
                <el-card shadow="hover" class="rank-list">
                    <header slot="header">
                        <span :class="{notActive:!classRankShow}" @click="classRankShow=!classRankShow">班级排名</span>
                        <span :class="{notActive:classRankShow}" @click="classRankShow=!classRankShow">年级排名</span></header>
                    <ul v-show="classRankShow">
                        <li v-for="(i,index) in classRankList">
                            <div class="main">
                                <em :style="{'background':i.color}">{{index+1}}</em>
                                <span>{{i.user_name}}<br/>{{i.classname}}</span>
                            </div>
                            <div class="value" :style="{'color':i.color}">+{{i.growths}}</div>
                        </li>
                    </ul>
                    <ul v-show="!classRankShow">
                        <li v-for="(i,index) in gradeRankList">
                            <div class="main">
                                <em :style="{'background':i.color}">{{index+1}}</em>
                                <span>{{i.user_name}}<br/>{{i.classname}}</span>
                            </div>
                            <div class="value" :style="{'color':i.color}">+{{i.growths}}</div>
                        </li>
                    </ul>
                </el-card>
            </div>
        </div>
        <!--新增弹窗-->
        <el-dialog :visible.sync="dialogVisible">
            <header slot="title">新增</header>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="获奖时间">
                    <el-date-picker v-model="ruleForm.archive_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="学校维度" prop="school">
                    <el-select v-model="ruleForm.dimensionality_school_id" placeholder="请选择学校维度" @change="schoolChange">
                        <el-option v-for="i in schoolList" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="等级">
                    <el-select v-model="ruleForm.grade_id" placeholder="请选择等级" @change="gradeChange">
                        <el-option v-for="i in gradeList" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成长值">
                    <el-input v-model="ruleForm.growth" disabled></el-input>
                </el-form-item>
                <el-form-item label="详细描述" prop="desc">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="附件">
                    <el-upload :action="$proxy+'/upload/uploadFile'" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="ruleForm.imglist">
                        <el-button size="mini" type="primary" icon="el-icon-upload">选择上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <footer slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </footer>
        </el-dialog>
        <!--评价弹窗-->
        <el-dialog class="table-edit" :visible.sync="dialogVisibleEva">
            <header slot="title">{{dialogName}}</header>
            <el-table class="table" :data="evaluationList" border stripe>
                <el-table-column align="center" prop="studentname" label="学生姓名" min-width="100"></el-table-column>
                <el-table-column align="center" prop="temp1" label="认真完成老师布置的作业" min-width="100">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.temp1"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="temp2" label="学习态度认真">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.temp2"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="temp3" label="积极参与班级组织的活动">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.temp3"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="other" label="其他表现" min-width="200">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.other"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <footer slot="footer">
                <el-button @click="dialogVisibleEva = false">取 消</el-button>
                <el-button type="primary" @click="submitFormEva()">确 定</el-button>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "Archives",
    data(){
      return{
        user:'',
        tree:'',
        dataBtnName:'编辑',
        dataForm:{
          teachername:'',//班主任
          wdlx:'',//我的理想
          xqah:'',//兴趣爱好
          wdtc:''//我的特长
        },
        dataFormDisabled:true,

        medalList:'',//奖章列表
        imgUrl:'/resource/showImg?path=',

        year:'',//学年
        // 新增弹框
        dialogVisible:false,
        schoolList:[],//学校维度列表
        gradeList:[],//等级列表
        ruleForm: {
          student_id:'',//学生id
          title: '',//标题
          archive_date:'',//获奖时间
          dimensionality_school_id: '',//学校维度id
          grade_id:'',//等级id
          growth: '',//成长值
          description:'',//详细描述
          archiveFile:'',//附件
        },
        archiveFileList:[],//附件所需结构
        fileList:[],//upload本身上传文件
        rules: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' },
          ],
          // school: [
          //   { required: true, message: '请选择学校维度', trigger: 'change' }
          // ],
          // desc: [
          //   { required: true, message: '请填写详细描述', trigger: 'blur' },
          // ],
        },

        //评价弹框
        dialogVisibleEva:false,//弹框是否显示
        dialogName:'',//弹框名
        evaluationList:[],//评价列表
        weeklyid:'',

        detailShow:false,//成长详情显示
        detailList:[],//成长详情列表
        pageSize:10,//
        pageNum:1,//当前页
        total:1,//总页数

        evaluateList:[],//评价列表

        classRankList:[],//班级列表
        classRankShow:true,
        gradeRankList:[],//年级列表

        radar:[],
        max:0
      }
    },
    // computed:{
    //   user() {//用户信息
    //     return this.$store.state.user;
    //   },
    // },
    // watch:{
    //   user(val){
    //     console.log(val.growths)
    //
    //   }
    // },
    created(){
      this.getStudentCard();

      //获取资料信息
      this.$ajax.post('/api/student/getInfo')
        .then(res => {
          this.dataForm=res.data.data;
        });
      //获取学年
      this.$ajax.post('/api/student/getXn')
        .then(res => {
          this.year=res.data.data.xn;
        });
      //获取成长详情
      this.getDetailList();
      //获取radar
      this.$ajax.post('/api/student/getstudentArchivesList')
        .then(res => {
          this.radar=res.data.data;
        })
        .then(()=>{
          this.drawRadar();
        });
      //获取奖章
      this.$ajax.post('/api/student/getstudentMedal')
        .then(res => {
          this.medalList=res.data.data;
        });
      //获取评价列表
      this.$ajax.post('/api/student/getEvaluateList')
        .then(res => {
          this.evaluateList=res.data.data;
        });
      //获取班级排行榜
      this.$ajax.post('/api/myClass/getBjRank')
        .then(res => {
          this.classRankList=res.data.data;
        });
      //获取年级排行榜
      this.$ajax.post('/api/myClass/getNjRank')
        .then(res => {
          this.gradeRankList=res.data.data;
        });
    },
    methods: {
      //获取学生卡（成长值、排名、班级和姓名）
      getStudentCard(){
        this.$ajax.post('/api/desktop/getInfo')
          .then(res => {
            this.user=res.data.data;
          })
          .then(()=>{
            this.getTreeUrl(this.user.growths)
          })
      },
      getTreeUrl(n){
        switch(true)
        {
          case n<=5:
            this.tree='1';
            break;
          case n>=6&&n<=10:
            this.tree='2';
            break;
          case n>=11&&n<=15:
            this.tree='3';
            break;
          case n>=16&&n<=20:
            this.tree='4';
            break;
          case n>=21&&n<=25:
            this.tree='5';
            break;
          case n>=26&&n<=30:
            this.tree='6';
            break;
          case n>=31&&n<=40:
            this.tree='7';
            break;
          case n>=41&&n<=50:
            this.tree='8';
            break;
          case n>=51&&n<=60:
            this.tree='9';
            break;
          case n>=61&&n<=70:
            this.tree='10';
            break;
          case n>=71&&n<=80:
            this.tree='11';
            break;
          case n>=81&&n<=90:
            this.tree='12';
            break;
          case n>=91&&n<=100:
            this.tree='13';
            break;
          case n>=101&&n<=115:
            this.tree='14';
            break;
          case n>=116&&n<=130:
            this.tree='15';
            break;
          case n>=131&&n<=145:
            this.tree='16';
            break;
          case n>=146&&n<=160:
            this.tree='17';
            break;
          case n>=161&&n<=180:
            this.tree='18';
            break;
          case n>=181&&n<=200:
            this.tree='19';
            break;
          case n>=201&&n<=220:
            this.tree='20';
            break;
          case n>=221&&n<=240:
            this.tree='21';
            break;
          case n>=241&&n<=270:
            this.tree='22';
            break;
          case n>=271&&n<=300:
            this.tree='23';
            break;
          case n>=301&&n<=340:
            this.tree='24';
            break;
          case n>=341&&n<=380:
            this.tree='25';
            break;
          case n>=381&&n<=430:
            this.tree='26';
            break;
          case n>=431&&n<=480:
            this.tree='27';
            break;
          case n>=481&&n<=550:
            this.tree='28';
            break;
          default:
            this.tree='29';
        }
      },
      eva(id){
        this.dialogVisibleEva=true;
        this.dialogName='评价';
        this.weeklyid=id;
        this.getEvaluationList();
      },
      //获取评价列表
      getEvaluationList(){
        this.$ajax.post('/api/processEvaluate/getEvaluationList',
          {weekly:this.weeklyid,roleId:'6'})
          .then(res=>{
            this.evaluationList=res.data.data.data;
            console.log(this.evaluationList);
          })
      },
      //提交评价表单
      submitFormEva() {
        let temp=JSON.stringify(this.evaluationList);
        this.$ajax.post('/api/processEvaluate/addEvaluation',
          {evaluation:temp,weekly:this.weeklyid,roleId:'6'})
          .then(res=>{
            this.dialogVisibleEva=false;
            this.$message.success(res.data.errmsg);
          })
      },
      editor() {
        if (this.dataBtnName === '编辑') {
          this.dataBtnName = '保存';
          this.dataFormDisabled = false;
        }
        else if (this.dataBtnName === '保存') {
          //ajax
          this.$ajax.post('/api/student/updateStudent', this.dataForm)
            .then(res => {
              this.dataBtnName = '编辑';
              this.dataFormDisabled = true;
              this.$message.success(res.data.errmsg);
            });
        }
      },
      drawRadar() {
        // 基于准备好的dom，初始化echarts实例
        let sexChart = this.$echarts.init(document.getElementById('radar'))
        this.$ajax.post('/api/student/getGrowthsMax')
          .then(res=>{
            this.max=res.data.data.max;
          })
          .then(()=>{
            // 绘制图表
            sexChart.setOption({
              // title: {
              //   text: '基础雷达图'
              // },
              radar: {
                name: {
                  textStyle: {
                    color: '#333',
                    fontSize: '12px'
                  },
                },
                nameGap: 2,
                // 设置雷达图中间射线的颜色
                axisLine: {
                  lineStyle: {
                    color: 'rgba(131,141,158,.1)',
                  },
                },
                indicator: [
                  {name: this.radar[0].name, max: this.max},
                  {name: this.radar[1].name, max: this.max},
                  {name: this.radar[2].name, max: this.max},
                  {name: this.radar[3].name, max: this.max},
                  {name: this.radar[4].name, max: this.max},
                ],
                radius: 50
              },
              series: [{
                type: 'radar',
                data: [
                  {
                    value: [this.radar[0].growths, this.radar[1].growths, this.radar[2].growths, this.radar[3].growths, this.radar[4].growths],
                    name: '',
                    itemStyle: {
                      normal: {
                        color: 'rgba(95,184,120,.3)',
                      }
                    }
                  },
                ],
              }]
            });
          })
      },
      getDetailList(){
        this.$ajax.post('/api/student/getstudentArchives',{pageSize:this.pageSize,pageNum:this.pageNum})
          .then(res=>{
            this.detailList=res.data.data.rows;
            this.total=res.data.data.records;
          });
      },
      //获取学校维度列表
      getSchoolList(){
        this.$ajax.post('/api/archives/getSchoolDimensionalityList')
          .then(res=>{
            this.schoolList=res.data.data;
          })
      },
      //学校维度改变
      schoolChange(){
        //置空等级列表和id
        this.gradeList=[];
        this.ruleForm.grade_id='';
        //获取成长值
        this.$ajax.post('/api/archives/getGrowth ',{dimensionality_school_id:this.ruleForm.dimensionality_school_id})
          .then(res=>{
            this.ruleForm.growth=res.data.data.growth;
          });
        //获取等级列表
        this.$ajax.post('/api/archives/getGradeList',{dimensionality_school_id:this.ruleForm.dimensionality_school_id})
          .then(res=>{
            this.gradeList=res.data.data;
          })
      },
      //等级改变
      gradeChange(){
        //获取成长值
        this.$ajax.post('/api/archives/getGrowth ',{grade_id:this.ruleForm.grade_id})
          .then(res=>{
            this.ruleForm.growth=res.data.data.growth;
          });
      },
      //清空数据
      clearForm(){
        this.ruleForm.student_id='';
        this.ruleForm.title='';
        this.ruleForm.archive_date='';
        this.ruleForm.dimensionality_school_id='';
        this.ruleForm.grade_id='';
        this.ruleForm.growth='';
        this.ruleForm.description='';
      },
      //添加
      add(){
        this.clearForm();
        this.dialogVisible=true;
        this.getSchoolList();
      },
      //图片上传
      //删除
      handleRemove(file,fileList){
        let path=file.url?file.url:file.response.path;
        this.$ajax.post('/resource/deleteFile',{path:path})
          .then(res=>{
            console.log(res.data.errmsg);
          });
        this.fileList=fileList;
      },
      //上传成功
      handleSuccess(res,file,fileList){
        console.log(res.data.errmsg);
        this.fileList=fileList;
      },
      //提交
      submitForm(formName) {
        let url='/api/archives/add';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for(let i=0;i<this.fileList.length;i++){
              if(this.fileList[i].response){
                this.archiveFileList.push({
                  url:this.fileList[i].response.path,
                  name:this.fileList[i].name
                });
              }
              else this.archiveFileList.push({
                url:this.fileList[i].url,
                name:this.fileList[i].name
              });
            }
            this.ruleForm.archiveFile=JSON.stringify(this.archiveFileList);
            this.$ajax.post(url,this.ruleForm)
              .then(res=>{
                this.getDetailList();
                this.getStudentCard();
                this.dialogVisible=false;
                this.$message.success(res.data.errmsg);
              })
          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //分页
      handleCurrentChange(val) {
        this.pageNum=val;
        this.getDetailList();
      },
    }
  }
</script>

<style lang="scss">
    .table-edit{
        .el-dialog{
            width: 1000px;
        }
        input{
            border: none;
        }
    }
    .archives{
        @extend %width;
        .content{
            @include flex(space-between,flex-start);
            .el-card{
                width: 100%;
                margin-top: 5px;
            }
            .left{
                width: 270px;
                //资料卡
                .data-card{
                    .el-button{
                        float: right;
                        padding: 3px 0;
                    }
                    .el-input.is-disabled .el-input__inner{
                        background: #fff;
                        color: #999;
                    }
                }
                //奖章卡
                .medal-card{
                    li{
                        @include flex;
                        margin-bottom: 15px;
                        img{
                            height: 30px;
                        }
                        span{
                            flex: 1;
                            font-size: 14px;
                            color: #333;
                            text-align: center;
                        }
                    }
                    li:last-child{
                        margin-bottom: 0;
                    }
                }
            }
            .center{
                flex: 1;
                margin: 5px 5px 0 5px;
                header{
                    @include flex(space-between);
                }
                ul.list{
                    li{
                        @include flex(flex-start,flex-start);
                        border-bottom: 1px #eee solid;
                        padding: 20px 0;
                        i{
                            font-size: 16px;
                            margin: 18px 20px 0 0;
                            &.green{
                                color:#67C23A;
                            }
                            &.orange{
                                color:#FFB800;
                            }
                        }
                        .main{
                            p{
                                font-size: 14px;
                                margin: 5px 0;
                            }
                            time{
                                font-size: 13px;
                                color: #666;
                            }
                            img{
                                height: 100px;
                                margin: 14px 14px 0 0;
                            }
                        }
                    }
                    :first-child{
                        padding-top: 0;
                    }
                }
                .tree{
                    position: relative;
                    width: 600px;
                    font-size: 0;
                    margin: 0 auto;
                    background: url("../assets/img/tree/bg.jpg") no-repeat;
                    background-size: cover;
                    img{
                        width: 100%;
                    }
                    em{
                        position: absolute;
                        bottom: 10px;
                        left: 0;
                        width: 100%;
                        font-size: 24px;
                        font-weight: bold;
                        text-align: center;
                    }
                    #radar{
                        position: absolute;
                        top: 160px;
                        right: 20px;
                        width: 180px;
                        height: 180px;
                    }
                }
            }
            .right{
                width: 270px;
                .evaluate-list{
                    li{
                        margin-bottom: 15px;
                        .el-button{
                            font-size: 14px;
                            padding: 0;
                        }
                    }
                    li:last-child{
                        margin-bottom: 0;
                    }
                }
                .rank-list{
                    header{
                        @include flex(space-between,flex-start);
                        span{
                            flex: 1;
                            cursor: pointer;
                            &.notActive{
                                color: #aaa;
                            }
                        }
                        :last-child{
                            text-align: right;
                            border-left:1px #eee solid;
                        }
                    }
                }
            }
        }
    }
</style>