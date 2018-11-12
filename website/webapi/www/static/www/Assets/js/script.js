var urlLogin = "http://localhost:8000/api-token-auth/";

Vue.use(VuejsDialog.main.default, {
  html: true,
  loader: false,
  okText: "OK",
  cancelText: "Cancel",
  animation: "bounce",
  message: "Some message"
});

var vue = new Vue({
  el: "#appVue",
  data: {
    username: "",
    password: "",
    tit_msg: "",
    body_msg: "",
    token: ""
  },
  methods: {
    sendLogin: function() {
      console.log("user: " + this.username);
      console.log("pwd: " + this.password);

      var postData = {
        username: this.username,
        password: this.password
      };

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }
      };

      axios
        .post(urlLogin, postData, axiosConfig)
        .then(res => {
          console.log("RESPONSE RECEIVED: ", res);
          console.log("RESPONSE RECEIVED DATA: ", res.data.token);
          this.token = res.data.token;
          sessionStorage.setItem("key", res.data.token);
          window.location.href = "/login/list";
        })
        .catch(error => {
          console.log("AXIOS ERROR: ", error);
          this.token = "";
          if (error.response.status == 400) {
            this.tit_msg = "Exception";
            this.body_msg =
              "You do not have authorization to enter the site. Verify your username and password.";
          } else {
            this.tit_msg = "Exception";
            this.body_msg = "Do you have internet ?. Ask the administrator.";
          }
          showMsg(this.body_msg);
        });
    } // end SendLogin
  } // end methods
}); //End Vue
