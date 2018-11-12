var urlGetEmployee = "http://localhost:8000/employeeApi/employees/?limit=10";
var urlGetEmployeeByID = "http://localhost:8000/employeeApi/employees/";
var urlPostEmployee = "http://localhost:8000/employeeApi/employees/";
var urlEditEmployee = "http://localhost:8000/employeeApi/employees/";

Vue.use(VuejsDialog.main.default, {
  html: true,
  loader: false,
  okText: "Proceed",
  cancelText: "Cancel",
  animation: "bounce",
  message: "Some message"
});

var vue = new Vue({
  el: "#appVue",
  data: {
    tit_msg: "",
    body_msg: "",
    token: "",
    dataEmp: {},
    arrayEmp: [],
    cad: "",
    txtName: null,
    txtMail: null,
    datepicker: null,
    cmbGender: null,
    cmbRole: null
  },
  methods: {
    getEmployees: function() {
      this.token = sessionStorage.getItem("key");
      this.act = "A";

      var t = "Token " + sessionStorage.getItem("key");
      var postData = "";
      console.log("TOKEN RECEIVED: ", t);
      axios.defaults.headers.common["Authorization"] = t;

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          Authorization: t
        }
      };

      axios
        .get(urlGetEmployee, postData, axiosConfig)
        .then(res => {
          console.log("RESPONSE RECEIVED: ", res);
          this.dataEmp = res.data;

          this.cad = "";
          this.cad += "     <div class='content'>";
          this.cad += "<table class='table' >";
          this.cad += "   <tr>";
          this.cad += "     <th>Name</th>";
          this.cad += "     <th>Gender</th>";
          this.cad += "     <th>Email</th>";
          this.cad += "     <th>Star Date</th>";
          this.cad += "     <th>Role</th>";
          this.cad += "     <th> </th>";
          this.cad += "   </tr>";
          var a = 0;
          this.dataEmp.forEach(element => {
            a++;
            var aEmp = [
              element.name,
              element.gender,
              element.startDate,
              element.email,
              element.role
            ];
            this.arrayEmp[this.arrayEmp.length] = aEmp;
            this.cad += "<tr >".trim();
            this.cad += "<td>" + element.name + "</td>".trim();
            this.cad += "<td>" + element.gender + "</td>".trim();
            this.cad += "<td>" + element.startDate + "</td>".trim();
            this.cad += "<td>" + element.email + "</td>".trim();
            this.cad += "<td>" + element.role + "</td>".trim();
            this.cad +=
              "<td>" +
              "<img src='/static/www/Assets/images/edit.png' width='24px' height='24px' data-toggle='modal' data-target='#exampleModalCenter'  onclick='vue.getEmployeeByID(" +
              element.id +
              ")'  >&#32;&#32;" +
              "<img src='/static/www/Assets/images/delete.png' width='24px' height='24px' onclick='javascript:sendRemoveEmp(" +
              element.id +
              "" +
              ")'  >" +
              "</td>".trim();
            this.cad += "</tr>";
          });
          this.cad += " </table>";
          this.cad += "  </div>";
          this.cad += "  </center> ";
          this.cad += "</section>";

          fillTable(this.cad);
        })
        .catch(error => {
          console.log("AXIOS ERROR: ", error);
          if (error.response.status == 401) {
            this.tit_msg = "Exception";
            this.body_msg =
              "You do not have authorization to enter the site. Verify your username and password.";
            sessionStorage.setItem("key", "");
            window.location.href = "/login";
          } else {
            this.tit_msg = "Exception";
            this.body_msg = "Do you have internet ?. Ask the administrator.";
          }
          showMsg(this.body_msg);
        });
    }, //end getEmployees
    getEmployeeByID: function(id) {
      this.token = sessionStorage.getItem("key");

      var t = "Token " + sessionStorage.getItem("key");
      this.act = "U";
      this.wId = id;
      sessionStorage.setItem("id", id);

      var postData = "";
      console.log("TOKEN RECEIVED: ", t);
      axios.defaults.headers.common["Authorization"] = t;

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          Authorization: t
        }
      };

      console.log("GET ID: " + urlGetEmployeeByID + id);
      axios
        .get(urlGetEmployeeByID + id, postData, axiosConfig)
        .then(res => {
          console.log("RESPONSE RECEIVED BY ID: ", res);

          this.txtName = "";
          this.txtMail = "";
          this.datepicker = "";
          this.cmbGender = "";
          this.cmbRole = "";

          this.txtName = res.data.name;
          this.txtMail = res.data.email;

          var wStartDate = sessionStorage.getItem("startDate");

          if (wStartDate == null || wStartDate == "") {
            //this.datepicker = "";
            sessionStorage.setItem("startDate", "");
          } else {
            var n = wStartDate.indexOf("T");
            console.log("INDEXOF: " + n);
            console.log("SUBSTRING: " + wStartDate.substring(1, n));
            this.datepicker = wStartDate;
          }
          this.cmbGender = res.data.gender;
          this.cmbRole = res.data.role;
        })
        .catch(error => {
          console.log("AXIOS ERROR: ", error);
          if (error.response.status == 401) {
            this.tit_msg = "Exception";
            this.body_msg =
              "You do not have authorization to enter the site. Verify your username and password.";
            sessionStorage.setItem("key", "");
            //window.location.href = '/login';
          } else {
            this.tit_msg = "Exception";
            this.body_msg = "Do you have internet ?. Ask the administrator.";
          }
          showMsg(this.body_msg);
        });
    }, //end getEmployees
    editEmp: function(id) {
      console.log("EDIT EMP ID: " + sessionStorage.getItem("id"));

      if (this.txtName == null) {
        this.tit_msg = "Exception";
        this.body_msg = "The name is incorrect.";
        showMsg(this.body_msg);
        return;
      }
      if (this.txtMail == null) {
        this.tit_msg = "Exception";
        this.body_msg = "The E-Mail is incorrect.";
        showMsg(this.body_msg);
        return;
      }

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var res = re.test(this.txtMail);

      if (!res) {
        this.tit_msg = "Exception";
        this.body_msg = "The format E-Mail is incorrect.";
        showMsg(this.body_msg);
        return;
      }

      console.log("fecha:" + sessionStorage.getItem("startDate"));
      if (sessionStorage.getItem("startDate") == null) {
        this.tit_msg = "Exception";
        this.body_msg = "The Start date is incorrect.";
        showMsg(this.body_msg);
        return;
      }

      this.token = sessionStorage.getItem("key");

      var t = "Token " + sessionStorage.getItem("key");
      var postData = {
        name: this.txtName,
        gender: this.cmbGender,
        email: this.txtMail,
        startDate: sessionStorage.getItem("startDate"),
        role: this.cmbRole
      };
      console.log("DATA RECEIVED: ", postData);

      axios.defaults.headers.common["Authorization"] = t;

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          Authorization: t
        }
      };

      axios
        .put(
          urlEditEmployee + sessionStorage.getItem("id"),
          postData,
          axiosConfig
        )
        .then(res => {
          console.log("RESPONSE RECEIVED: ", res);
          sessionStorage.setItem("id", "0");
          this.$dialog
            .alert("Successful update data to employee!")
            .then(function(dialog) {});
          window.location.href = "/login/list";
        })
        .catch(error => {
          console.log("AXIOS ERROR: ", error);
          if (error.response.status == 401) {
            this.tit_msg = "Exception";
            this.body_msg =
              "You do not have authorization to enter the site. Verify your username and password.";
          } else {
            this.tit_msg = "Exception";
            this.body_msg = "Do you have internet ?. Ask the administrator.";
          }
          showMsg(this.body_msg);
        });
    },
    removeEmp: function(id) {
      this.token = sessionStorage.getItem("key");

      var t = "Token " + sessionStorage.getItem("key");
      var postData = {};
      console.log("TOKEN RECEIVED: ", t);
      axios.defaults.headers.common["Authorization"] = t;

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          Authorization: t
        }
      };

      urlEditEmployee += id;
      axios
        .delete(urlEditEmployee, postData, axiosConfig)
        .then(res => {
          console.log("RESPONSE RECEIVED: ", res);
          this.$dialog
            .alert("Successful delete employee !")
            .then(function(dialog) {
              window.location.href = "/login/list";
            });
        })
        .catch(error => {
          console.log("AXIOS ERROR: ", error);
          if (error.response.status == 401) {
            this.tit_msg = "Exception";
            this.body_msg =
              "You do not have authorization to enter the site. Verify your username and password.";
          } else if (error.response.status == 404) {
            this.body_msg = "The employee does not exist.";
          } else {
            this.tit_msg = "Exception";
            this.body_msg = "Do you have internet ?. Ask the administrator.";
          }
          showMsg(this.body_msg);
        });
    },
    addEmp: function() {
      console.log("ADD EMP ID: " + sessionStorage.getItem("id"));
      if (sessionStorage.getItem("id") != "0") {
        sessionStorage.setItem("act", "U");
        vue.editEmp(sessionStorage.getItem("id"));
        return;
      }
      console.log("XX:" + this.txtName);
      if (this.txtName == null) {
        this.tit_msg = "Exception";
        this.body_msg = "The name is incorrect.";
        showMsg(this.body_msg);
        return;
      }
      if (this.txtMail == null) {
        this.tit_msg = "Exception";
        this.body_msg = "The E-Mail is incorrect.";
        showMsg(this.body_msg);
        return;
      }

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var res = re.test(this.txtMail);

      if (!res) {
        this.tit_msg = "Exception";
        this.body_msg = "The format E-Mail is incorrect.";
        showMsg(this.body_msg);
        return;
      }

      console.log("fecha:" + sessionStorage.getItem("startDate"));
      if (sessionStorage.getItem("startDate") == null) {
        this.tit_msg = "Exception";
        this.body_msg = "The Start date is incorrect.";
        showMsg(this.body_msg);
        return;
      }

      this.token = sessionStorage.getItem("key");

      var t = "Token " + sessionStorage.getItem("key");
      var postData = {
        name: this.txtName,
        gender: this.cmbGender,
        email: this.txtMail,
        startDate: sessionStorage.getItem("startDate"),
        role: this.cmbRole
      };
      console.log("TOKEN RECEIVED: ", t);
      axios.defaults.headers.common["Authorization"] = t;

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          Authorization: t
        }
      };

      axios
        .post(urlPostEmployee, postData, axiosConfig)
        .then(res => {
          console.log("RESPONSE RECEIVED: ", res);
          sessionStorage.setItem("id", "0");
          this.$dialog
            .alert("Successful employee registration !")
            .then(function(dialog) {
              window.location.href = "/login/list";
            });
        })
        .catch(error => {
          console.log("AXIOS ERROR: ", error);
          this.tit_msg = "Exception";
          if (error.response.status == 401) {
            this.body_msg =
              "You do not have authorization to enter the site. Verify your username and password.";
          } else if (error.response.status == 404) {
            this.body_msg = "The employee does not exist.";
          } else {
            this.body_msg = "Do you have internet ?. Ask the administrator.";
          }
          showMsg(this.body_msg);
        });
    },
    iniState: function() {
      sessionStorage.setItem("id", "0");
    }
    // end methods
  },
  beforeMount() {
    this.getEmployees();
  }
}); //End Vue
