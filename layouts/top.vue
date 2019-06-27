<template>
  <div>
    <a-form
      class="loginFrom"
      style="float: right;"
      layout="inline"
      :form="form"
      v-show="loginShow"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
          'userName',
          {rules: [{ required: true, message: 'Please input your username!' }]}
        ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          {rules: [{ required: true, message: 'Please input your Password!' }]}
        ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">登陆</a-button>
      </a-form-item>
    </a-form>
    <div>
      <a-button class="loginFrom checkOutButton" v-show="!loginShow" @click="checkOut">退出登陆</a-button>
    </div>
  </div>
</template>

<script>
import { $v } from "~/assets/js/common/Ajax";
import { LEMONBOX } from "~/assets/js/common/const";
import { fail } from "assert";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this),
      loginShow: true
    };
  },
  created(){
    !sessionStorage.getItem('loginFail')&&sessionStorage.setItem('loginFail','fail')
    if(sessionStorage.getItem('loginFail')!='fail'){ 
      this.loginShow = false
    }
  },
  mounted() {
  },
  methods: {
    
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          $v.get(
            LEMONBOX + "/api/v1/login",
            { username: values.userName, password: values.password },
            d => {
              if (d.status == "success") {
                this.loginShow = false;
                sessionStorage.setItem('loginFail','sussess')
              }
            }
          );
        }
      });
    },
    checkOut() {
      $v.get(LEMONBOX + "/api/v1/logout", "", res => {
        this.$message.success("已退出登陆");
        this.loginShow = true;
        sessionStorage.setItem('loginFail','fail')
      }).then((d)=>{
        console.log(d)
      })
    }
  }
};
</script>

<style >
.loginFrom {
  float: right;
  margin-top: 12px;
}
.checkOutButton {
  margin-right: 15px;
}
</style>
