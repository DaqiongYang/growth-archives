(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-595d19a2"],{"4c5d":function(e,t,l){"use strict";var r=l("9cef"),a=l.n(r);a.a},"9cef":function(e,t,l){},b83c:function(e,t,l){"use strict";l.r(t);var r=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-card",{staticClass:"page"},[l("header",{attrs:{slot:"header"},slot:"header"},[e._v("\n        学校维度\n    ")]),l("el-form",{staticClass:"search",attrs:{size:"medium","label-width":"60px",inline:!0,model:e.formInline}},[l("el-form-item",{attrs:{label:"名称"}},[l("el-input",{attrs:{placeholder:"学校维度名称"},model:{value:e.formInline.name,callback:function(t){e.$set(e.formInline,"name",t)},expression:"formInline.name"}})],1),l("el-form-item",{attrs:{label:"类型"}},[l("el-select",{attrs:{placeholder:"国家维度"},model:{value:e.formInline.type,callback:function(t){e.$set(e.formInline,"type",t)},expression:"formInline.type"}},e._l(e.type,function(e){return l("el-option",{attrs:{label:e.name,value:e.id}})}))],1),l("el-form-item",[l("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1),l("div",{staticClass:"btn"},[l("el-button-group",[l("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("添加")]),l("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-edit"}},[e._v("编辑")])],1),l("el-button-group",[l("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-check"}},[e._v("启用")]),l("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-close"}},[e._v("禁用")])],1)],1),l("el-table",{staticClass:"table",attrs:{data:e.tableData,border:"",stripe:""}},[l("el-table-column",{attrs:{align:"center",type:"selection",width:"40"}}),l("el-table-column",{attrs:{align:"center",prop:"bh",label:"编号","min-width":"40",sortable:""}}),l("el-table-column",{attrs:{align:"center",prop:"order_on",label:"排序","min-width":"40",sortable:""}}),l("el-table-column",{attrs:{align:"center",prop:"name",label:"学校维度","min-width":"40"}}),l("el-table-column",{attrs:{align:"center",prop:"gjname",label:"国家维度","min-width":"40"}}),l("el-table-column",{attrs:{align:"center",prop:"jlfs",label:"记录方式","min-width":"50",sortable:""}}),l("el-table-column",{attrs:{align:"center",prop:"is_student_add",label:"是否允许学生添加","min-width":"40"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s("1"===t.row.is_student_add?"是":"否"))]}}])}),l("el-table-column",{attrs:{align:"center",prop:"growth",label:"成长值","min-width":"40",sortable:""}}),l("el-table-column",{attrs:{align:"center",prop:"status",label:"状态","min-width":"40",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-tag",{attrs:{type:"1"===t.row.status?"success":"info","disable-transitions":""}},[e._v(e._s("1"===t.row.status?"使用":"禁用"))])]}}])}),l("el-table-column",{attrs:{prop:"ms",label:"维度描述"}}),l("el-table-column",{attrs:{prop:"ckbz",label:"参考标准"}})],1),l("el-pagination",{staticClass:"pagination",attrs:{"current-page":1,"page-size":20,layout:"total, prev, pager, next, jumper",total:40},on:{"current-change":e.handleCurrentChange}}),l("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("header",{attrs:{slot:"title"},slot:"title"},[l("i",{staticClass:"el-icon-success"}),e._v("添加")]),l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[l("el-form-item",{attrs:{label:"维度名称",prop:"required"}},[l("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),l("el-form-item",{attrs:{label:"排序"}},[l("el-input-number",{attrs:{min:1},model:{value:e.ruleForm.orderOn,callback:function(t){e.$set(e.ruleForm,"orderOn",t)},expression:"ruleForm.orderOn"}})],1),l("el-form-item",{attrs:{label:"允许学生添加"}},[l("el-switch",{model:{value:e.ruleForm.isStudentAdd,callback:function(t){e.$set(e.ruleForm,"isStudentAdd",t)},expression:"ruleForm.isStudentAdd"}})],1),l("el-form-item",{attrs:{label:"国家维度",prop:"required"}},[l("el-select",{attrs:{placeholder:"请选择国家维度"},model:{value:e.ruleForm.dimensionalityId,callback:function(t){e.$set(e.ruleForm,"dimensionalityId",t)},expression:"ruleForm.dimensionalityId"}},e._l(e.type,function(e){return l("el-option",{attrs:{label:e.name,value:e.id}})}))],1),l("el-form-item",{attrs:{label:"记录方式",prop:"required"}},[l("el-radio-group",{model:{value:e.ruleForm.jlfs,callback:function(t){e.$set(e.ruleForm,"jlfs",t)},expression:"ruleForm.jlfs"}},[l("el-radio",{attrs:{label:"1"}},[e._v("点选")]),l("el-radio",{attrs:{label:"2"}},[e._v("录入")])],1)],1),l("el-form-item",{attrs:{label:"默认成长分值"}},[l("el-input-number",{model:{value:e.ruleForm.growth,callback:function(t){e.$set(e.ruleForm,"growth",t)},expression:"ruleForm.growth"}})],1),l("el-form-item",{attrs:{label:"维度描述",prop:"required"}},[l("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.ms,callback:function(t){e.$set(e.ruleForm,"ms",t)},expression:"ruleForm.ms"}})],1),l("el-form-item",{attrs:{label:"参考标准",prop:"required"}},[l("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.ckbz,callback:function(t){e.$set(e.ruleForm,"ckbz",t)},expression:"ruleForm.ckbz"}})],1)],1),l("footer",{attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确定")]),l("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")])],1)],1)],1)},a=[],o=(l("cadf"),l("551c"),l("097d"),{data:function(){return{formInline:{name:"",type:""},type:[],tableData:[],dialogVisible:!1,ruleForm:{name:"",dimensionalityId:"",orderOn:1,growth:0,isStudentAdd:!0,jlfs:"",ms:"",ckbz:""},rules:{name:[{required:!0,message:"不能为空",trigger:"blur"}]}}},created:function(){var e=this;this.$ajax.post("/dimensionality/main").then(function(t){e.type=t.data.data}),this.$ajax.post("/dimensionalitySchool/main").then(function(t){e.tableData=t.data.data.rows})},methods:{search:function(){console.log(this.formInline.type)},add:function(){this.dialogVisible=!0},handleCurrentChange:function(e){console.log("当前页: ".concat(e))},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.ruleForm.isStudentAdd?t.ruleForm.isStudentAdd="1":t.ruleForm.isStudentAdd="0",console.log(t.ruleForm),t.$ajax.post("/dimensionalitySchool/add",t.ruleForm).then(function(e){console.log(e)})})}}}),n=o,i=(l("4c5d"),l("2877")),s=Object(i["a"])(n,r,a,!1,null,null,null);s.options.__file="table.vue";t["default"]=s.exports}}]);
//# sourceMappingURL=chunk-595d19a2.84ddee67.js.map