"use strict";(self["webpackChunkvue_manage"]=self["webpackChunkvue_manage"]||[]).push([[881],{8881:function(e,t,r){r.r(t),r.d(t,{default:function(){return m}});var s=function(){var e=this,t=e._self._c;return t("el-form",{ref:"form",staticClass:"login-container",attrs:{model:e.form,"status-icon":"",rules:e.rules,"label-width":"100px"}},[t("h3",{staticClass:"login_title"},[e._v("系统登录")]),t("el-form-item",{staticClass:"username",attrs:{label:"用户名",prop:"username"}},[t("el-input",{attrs:{type:"input","auto-complete":"off",placeholder:"请输入账号"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),t("el-form-item",{staticClass:"username",attrs:{label:"密码",prop:"username"}},[t("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"请输入密码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.login.apply(null,arguments)}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),t("el-form-item",{staticClass:"login_item"},[t("el-button",{staticClass:"login_submit",attrs:{type:"primary"},on:{click:e.login}},[e._v("登录")])],1)],1)},n=[],o=r(8560),a={name:"MyLogin",data(){return{form:{},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,message:"用户名长度不能小于3位",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{login(){(0,o.r7)(this.form).then((({data:e})=>{console.log(e,"res"),2e4===e.code?(this.$store.commit("clearMenu"),this.$store.commit("setMenu",e.data.menu),this.$store.commit("setToken",e.data.token),this.$store.commit("addMenu",this.$router),this.$router.push({name:"home"})):this.$message.warning(e.data.message)}))}}},u=a,i=r(1001),l=(0,i.Z)(u,s,n,!1,null,"ed3f4d40",null),m=l.exports},8560:function(e,t,r){r.d(t,{Yu:function(){return m},r7:function(){return l},PR:function(){return c}});var s=r(6265),n=r.n(s),o={baseUrl:{dev:"/api/",pro:""}};const a=o.baseUrl.pro;class u{constructor(e){this.baseUrl=e}getInsideConfig(){const e={baseUrl:this.baseUrl,header:{}};return e}interceptors(e){e.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),e.interceptors.response.use((function(e){return console.log(e,"response"),e}),(function(e){return console.log(e,"error"),Promise.reject(e)}))}request(e){const t=n().create();return e={...this.getInsideConfig,...e},this.interceptors(t),t(e)}}var i=new u(a);const l=e=>i.request({url:"/permission/getMenu",methods:"get",data:e}),m=()=>i.request({url:"/home/getData"}),c=e=>i.request({url:"/user/getUser",method:"get",params:e})}}]);
//# sourceMappingURL=881.c763a5d2.js.map