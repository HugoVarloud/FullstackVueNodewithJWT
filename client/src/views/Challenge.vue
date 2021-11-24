<template>
  <div class="chalenge">
      <Header/>
    <h1>This is the Challenge</h1>
  </div>
</template>
<script>
import Header from "../components/header"
import axios from "axios";

export default {
    components: {
        Header
    },
  created() {
    let config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("auth-token")).token,
      },
    };
    // console.log(tokenHeader)
    try {
      axios.get("/api/challenge", config).then((res) => {
        // console.log(tokenHeader)
        console.log(res);
      });
    } catch (error) {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  },
};
</script>
