<template>
  <div class="main">
    <div class="header">
      <v-img alt="Logo App" src="../assets/skip-rope.svg" class="logo-header" />
      <p class="app-name">SPORT APP</p>
    </div>
    <div class="gridRegister">
      <div class="textRegister">
        <h1 class="register-title">
          Mets tes ami(e)s au défi et tentes le Corona Challange
        </h1>
        <div>
          <ul>
            <li class="icon-li">
              <v-icon left class="icon-li-style"> mdi-human </v-icon>
              <p class="icon-text">
                Viens tester tes capacitées et affrontes le challange à toi seul
              </p>
            </li>
            <li class="icon-li">
              <v-icon left class="icon-li-style"> mdi-human-queue </v-icon>
              <p class="icon-text">
                Invites tes ami(e)s et affrontez vous au cours d'épreuves
                épiques
              </p>
            </li>
            <li class="icon-li">
              <v-icon left class="icon-li-style"> mdi-timer </v-icon>
              <p class="icon-text">
                En solo ou en équipe établis de nouveau records et deviens un
                champion
              </p>
            </li>
          </ul>
        </div>
        <p class="disclaimer">
          En vous inscrivant, vous recevrez un e-mails de confirmation et des
          newsletters. Vous pourrez vous désabonner de ce service dans les
          paramètres à tout moment.
        </p>
        <p class="disclaimer">
          La participation à ce challenge peut engendrer un maximum de fun.
        </p>
      </div>
      <div>
        <v-card>
          <v-form ref="form" class="register-form" lazy-validation>
            <v-img
              alt="Logo App"
              src="../assets/skip-rope.svg"
              style="width: 50px; display: inline-block"
            />
            <h3 class="card-title">Inscrits toi</h3>
            <v-text-field
              v-model="user.name"
              :counter="20"
              label="Nom D'utilisateur"
              :rules="rules.nameRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.email"
              label="E-mail"
              :rules="rules.emailRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="rules.passwordRules"
              label="Mot de passe"
              @click:append="show1 = !show1"
              required
            ></v-text-field>
            <button type="button" class="register-btn" @click="validate">
              S'inscrire
            </button>
          </v-form>
        </v-card>
      </div>
    </div>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn snackbarText v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
// import axios from "axios";
import User from "../models/user";
export default {
  name: "Register",
  data() {
    return {
      show1: false,
      // user: {
      //   name: "",
      //   email: "",
      //   password: "",
      // },
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
      rules: {
        nameRules: [
          (v) => !!v || "Un Nom d'utilisateur est requis",
          (v) =>
            (v && v.length < 20) ||
            "Votre Nom d'utilisateur ne peut pas faire plus de 20 caractères",
        ],
        emailRules: [
          (v) => !!v || "Un E-mail d'utilisateur est requis",
          (v) => /.+@.+\..+/.test(v) || "Votre email doit etre valide",
        ],
        passwordRules: [
          (v) => !!v || "Le champs Mot De Passe est obligatoire",
          (v) =>
            (v && v.length >= 8) ||
            "Votre mot de passe ne peut pas faire moins de 8 caractères",
        ],
      },
      snackbar: false,
      snackbarText: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.message = "";
      this.submitted = true;
      // if (this.user.password.length >= 8 && this.user.email && this.user.username) {

      this.$store.dispatch("auth/register", this.user).then(() => {
        this.$router.push("/");
      });

      // axios
      //   .post("/api/user/register", this.user)
      //   .then((res) => {
      //     console.log(res.data);
      //     this.$router.push("/");
      //   })
      //   .catch(() => {
      //     this.snackbar = true;
      //     this.snackbarText = "Mot de passe ou E-Mail invalide.";
      //   });
      // } else {
      //   this.snackbar = true;
      //   this.snackbarText = "Mot de passe ou E-Mail invalide.";
      // }
    },
  },
};
</script>

<style>
* {
  font-family: "Open Sans", Arial, sans-serif;
}
.main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
body {
  background-color: #f2f8fdd1;
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
.gridRegister {
  display: grid;
  grid-template-columns: 500px 500px;
  grid-column-gap: 50px;
  justify-content: center;
  margin-top: 100px;
}
.register-title {
  font-size: 22px;
  color: #777;
  padding-bottom: 40px;
  font-weight: 300;
  padding-top: 5px;
  line-height: 26px;
}
.textRegister {
  margin-top: 50px;
  text-align: initial;
  display: inline-block;
  width: 400px;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0px 40px;
  color: #777;
}
.icon-text {
  font-weight: 300;
  font-size: 18px;
}
.icon-li {
  display: flex;
  padding: 10px 0;
}
.icon-li-style {
  flex: 0 0 70px;
}
.v-icon.icon-li-style.v-icon--left {
  font-size: 50px;
  display: inline;
  color: #7d7d7dad;
}
.disclaimer {
  margin-top: 30px;
  font-size: 16px;
  font-weight: 200;
  letter-spacing: -0.25px;
  color: #777;
}
.register-form {
  width: 100%;
  margin-top: 50px;
  padding: 80px 30px 30px 30px;
}
.card-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: #2c2c2cc7;
  font-weight: 300;
}
.register-btn {
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #3f9adb;
  background-color: #3f9adb;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 4px;
  outline: none;
  margin-top: 30px;
}
</style>