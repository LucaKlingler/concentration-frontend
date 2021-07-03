<template>
  <b-container fluid class="menu">
    <b-row>
      <b-col cols="2">
       <WindowControls/>
      </b-col>
      <b-col cols="1" class="menuItem">
        <router-link class="link" to="/">
          <b-icon class="menuIcon" icon="house" />
        </router-link>
      </b-col>
       <b-col v-if="false" cols="1" class="menuItem">
        <router-link class="link" to="/calendar">
          <b-icon class="menuIcon" icon="calendar"/>
        </router-link>
      </b-col>
      <b-col cols="1" class="menuItem">
        <router-link class="link" to="/statistics">
          <b-icon class="menuIcon" icon="bar-chart-line-fill" />
        </router-link>
      </b-col>
      <b-col v-if="false" cols="1" class="menuItem">
        <router-link class="link" to="/profile">
          <b-icon class="menuIcon" icon="person" />
        </router-link>
      </b-col>
      <b-col></b-col>
       <b-col cols="1" id="testping" class="menuItem"  v-if="$store.state.role === 'teacher'">
        <span @click="testPing" class="link">
          <b-icon class="menuIcon" icon="chat-right-text" />
        </span>
      </b-col>
      <b-tooltip target="testping" triggers="hover">Test-Ping</b-tooltip>
       <b-col cols="1" class="menuItem">
        <router-link class="link" to="/settings">
          <b-icon class="menuIcon" icon="gear" />
        </router-link>
      </b-col>
     <b-col cols="1" class="menuItem">
        <span class="link" to="#" @click="logout" >
          <b-icon class="menuIcon" icon="box-arrow-left" />
        </span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import WindowControls from '@/components/WindowControls.vue';

export default {
  name: 'NavBar',
  components: {
    WindowControls,
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
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

</style>
