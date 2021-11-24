<template>
  <div class="profil">
    <Header />
    <h1>This is the Dashboard</h1>
    <p>{{ userName }}</p>
  </div>
</template>
<script>
import Header from "../components/header";
import axios from "axios";

export default {
  data() {
    return {
      userName: "",
    };
  },
  components: {
    Header,
  },
  async created() {
    let accessToken = JSON.parse(localStorage.getItem("auth-token"));
    let config = {
      headers: {
        "auth-token": accessToken.token,
      },
    };
    try {
      await axios.get("/api/profil", config).then((res) => {
        console.log("user info: ", res);
        this.userName = res.data.name;
      });
    } catch {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  },
  updated() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
};
</script>
