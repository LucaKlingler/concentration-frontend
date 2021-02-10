<template>
  <div class="menu">
    <b-row>
      <b-col class="logo">
        <img src="@/assets/logo.svg"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p><b>Hallo Anna</b></p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="linkCol">
        <router-link class="link" to="/">
          <b-icon icon="pie-chart" />
          Startseite
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="linkCol">
        <router-link class="link" to="/calendar">
          <b-icon icon="calendar"/>
          Kalender
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="linkCol">
        <router-link class="link" to="/statistics">
          <b-icon icon="graph-up" />
          Statistiken
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="linkCol">
        <router-link class="link" to="/profile">
          <b-icon icon="person" />
          Profil
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="linkCol">
        <router-link class="link" to="/settings">
          <b-icon icon="gear" />
          Einstellungen
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="linkCol">
        <router-link class="link" to="/logout">
          <b-icon icon="box-arrow-left" />
          Ausloggen
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Menu',
};
</script>

<style scoped>
div {
  /*border: 2px solid grey;*/
}

.logo {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: left;
}

.linkCol {
  padding-left: 0px;
}

.link {
  padding-left: 15px;
  display: block;
  cursor: pointer;
  height: 44px;
  width: 100%;
  left: 0px;
  line-height: 44px;
  color: white;
  text-decoration: none;
}
.router-link-exact-active {
  background: linear-gradient(90deg, #6F6CFF 5.73%, rgba(111, 108, 255, 0) 90.62%);
}
</style>
