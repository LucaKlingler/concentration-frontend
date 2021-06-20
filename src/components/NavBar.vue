<template>
  <div class="menu">
    <b-row>
      <b-col cols="1">
       <b-row class="wc-wrapper">
        <b-col cols="1">
         <div @click="window.close()" class="wc wc-close"></div>
        </b-col>
        <b-col cols="1">
          <div @click="window.minimize()" class="wc wc-min"></div>
        </b-col>
        <b-col cols="1">
          <div @click="window.maximize()" class="wc wc-max"></div>
        </b-col>
       </b-row>
      </b-col>
      <b-col cols="1" class="menuItem">
        <router-link class="link" to="/">
          <b-icon class="menuIcon" icon="house" />
        </router-link>
      </b-col>
       <b-col v-if="false" cols="1" class="menuItem">
        <router-link class="link" to="/calendar">
          <b-icon icon="calendar"/>
        </router-link>
      </b-col>
      <b-col cols="1" class="menuItem">
        <router-link class="link" to="/statistics">
          <b-icon icon="bar-chart-line-fill" />
        </router-link>
      </b-col>
      <b-col v-if="false" cols="1" class="menuItem">
        <router-link class="link" to="/profile">
          <b-icon icon="person" />
        </router-link>
      </b-col>
      <b-col></b-col>
       <b-col cols="1" class="menuItem">
        <router-link class="link" to="/settings">
          <b-icon icon="gear" />
        </router-link>
      </b-col>
     <b-col cols="1" class="menuItem">
        <span class="link" to="#" @click="logout" >
          <b-icon icon="box-arrow-left" />
        </span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>

.menu {
  -webkit-app-region: drag;
  background: black;
  width: 100vw;
}

.menuIcon {
  width: 1rem;
  height: 1rem;
}

.menuItem {
  padding: 0;
  width: 3.125rem;
  height: 3.125rem;
}

.link {
  display: block;
  width: 3.125rem;
  height: 3.125rem;
  line-height: 3.125rem;
  text-align: center;
  cursor: pointer;
  width: 100%;
  color: white;
  text-decoration: none;
}
.router-link-exact-active {
  background: #6F6CFF;
}

.wc-wrapper {
height: 3.125rem;
}

.wc {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  line-height: 3.125rem;
}
.wc-close {
  background-color: #F96057;
}
.wc-min {
  background-color: #F8CE52;
}
.wc-max {
  background-color: #5FCF65;
}
</style>
