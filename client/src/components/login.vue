<template>
  <div class="main">
    <div class="header">
      <v-img alt="Logo App" src="../assets/skip-rope.svg" class="logo-header" />
      <p class="app-name">SPORT APP</p>
    </div>
    <div class="gridLogin">
      <div>
        <v-card class="login-card">
          <v-form class="login-form" ref="form" v-model="valid" lazy-validation>
            <v-img
              alt="Logo App"
              src="../assets/skip-rope.svg"
              class="logo-card"
            />
            <h1 class="connect">Se Connecter</h1>
            <v-text-field
              v-model="user.email"
              :rules="rules.emailRules"
              label="Mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :rules="rules.password"
              label="Mot De Passe"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              required
            ></v-text-field>

            <button class="login-btn" type="button" @click="validate">
              Se Connecter
            </button>
            <div class="already-register">
              Pas encore membre?
              <router-link to="inscription">Inscrivez-vous</router-link>
            </div>
          </v-form>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import User from "../models/user";
export default {
  name: "login",
  data() {
    return {
      show1: false,
      valid: true,
      // user: {
      //   email: "",
      //   password: "",
      // },
      user: new User("", ""),
      loading: false,
      message: "",
      rules: {
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        password: [
          (v) => !!v || "Un mot de passe est requis",
          (v) =>
            (v && v.length > 6) ||
            "Le mot de passe doit faire au moins 8 caractère",
        ],
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profil");
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.loading = true;

      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/profil");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }

      // try {
      //   axios
      //     .post("/api/user/login", this.user)
      //     .then((res) => {
      //       const token = res.data;
      //       // console.log(token);
      //       if (token) {
      //         localStorage.setItem("auth-token", JSON.stringify(token)); // store the token in localstorage
      //         this.$router.push("/Profil");
      //       }
      //       return res.data
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // } catch (e) {
      //   console.log(e);
      // }
    },
  },
};
</script>

<style>
body {
  background-color: #f2f8fdd1;
}
* {
  font-family: "Open Sans", Arial, sans-serif;
}
.header {
  position: relative;
}
.logo-header {
  width: 50px;
  height: 50px;
  margin-top: 10px;
}
.v-image.v-responsive.logo-header {
  position: absolute;
  margin-left: 10px;
}
.app-name {
  position: absolute;
  margin: 15px 0px 25px 70px;
  padding-top: 15px;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.3px;
  text-align: center;
  color: #777777;
}
.inscription {
  float: right;
  margin: 30px 10px 25px 10px;
  position: absolute;
}
.logo-card {
  width: 50px;
  height: 50px;
  margin: 0 auto 15px;
}
.connect {
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.3px;
  text-align: center;
  color: #777777;
}
.gridLogin {
  display: grid;
  justify-content: center;
}
.login-card {
  height: 500px;
  margin-top: 150px;
}
.login-form {
  width: 100%;
  padding: 80px 30px 30px 30px;
}
.login-btn {
  background-color: #3f9adb;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #3f9adb;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 4px;
  outline: none;
  margin-top: 30px;
}
.already-register {
  display: block;
  font-size: 14px;
  padding: 30px 50px 0;
  text-align: center;
}
</style>