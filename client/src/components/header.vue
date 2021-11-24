<template>
  <div class="main-head">
    <v-toolbar dense>
      <v-img
        alt="Logo App"
        src="../assets/skip-rope.svg"
        style="max-width: 30px"
      />
      <v-toolbar-title class="app-name-style">SPORT APP</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list nav dense>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-spacer></v-spacer>
        <hr>

        <v-list-item
          v-for="out in logMeOut"
          :key="out.text"
          router
          class="logOut-container"
        >
        <a href @click="logOut()" id="log-out">
              <v-icon id="logOut-icon">mdi-logout</v-icon>
              <v-list-item-title>Logout</v-list-item-title>
        </a>
        </v-list-item>
          
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-file", text: "Profil", route: "/profil" },
        { icon: "mdi-email", text: "Challenge", route: "/challenge"},
      ],
      logMeOut: [{ icon : "mdi-logout", text: "Logout", action:this.logOut},]
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  },
};
</script>
<style>
* {
  font-family: "Open Sans", Arial, sans-serif;
}
.main-head {
  position: inherit;
}
.v-image.v-responsive.logo-header {
  position: absolute;
  margin-left: 10px;
}
.app-name-style {
  position: absolute;
  margin: 7px 0px 20px 40px;
  padding-top: 15px;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.3px;
  text-align: center;
  color: #777777;
}

.nav-item {
  list-style: none;
}

.logOut-container.v-list-item.theme--light {
  display: block;
  margin-top: 1rem;
}
#log-out {
  display: flex;
  text-decoration: none;
  color: #c30909;
}
#logOut-icon{
  color: #c30909;
}
</style>