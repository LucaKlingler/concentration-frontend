<template>
  <b-container fluid class="min-vh-100 d-flex flex-column text"
    style="background-color: var(--background-color);">
    <b-row class="menu">
      <b-col cols="1">
        <WindowControls/>
      </b-col>
    </b-row>
    <b-row class="flex-grow-1 d-flex justify-content-center">
      <div class="align-self-center text-center" style="width: 80vw;">
        <b-row>
          <b-col>
            <p class="title">Concentration</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p class="text-left">Benutzername</p>
            <b-input style="margin-bottom: 1rem;" type="text" class="input" v-model="user"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-left">
            <p>Passwort</p>
            <b-input type="password" v-model="pwd" class="input"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button class="confirmButton" variant="primary"
            @click="login">Anmelden</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p class="register">
              Du hast noch keinen Account?
              <router-link to="/register">Jetzt registrieren</router-link>
            </p>
          </b-col>
        </b-row>
      </div>
    </b-row>
  </b-container>
</template>

<script>
// import RoundedButton from '../components/RoundedButton';
import WindowControls from '../components/WindowControls.vue';

export default {
  name: 'Start',
  data() {
    return {
      user: '',
      pwd: '',
    };
  },
  methods: {
    login() {
      console.log('logging in…');
      // authotizes user from the backend
      this.axios.post('auth/login', {
        username: this.user,
        pwd: this.pwd,
      })
        .then((res) => {
          if (res.status !== 200) return this.toast('Es ist ein Fehler aufgetreten', 'Ungültige Login-Daten', 'danger');
          localStorage.setItem('token', res.data.token);
          this.$store.state.loggedIn = true;
          this.$store.state.preName = res.data.preName;
          this.$store.state.lastName = res.data.lastName;
          this.$store.state.role = res.data.role;
          localStorage.setItem('preName', res.data.preName);
          localStorage.setItem('lastName', res.data.lastName);
          localStorage.setItem('role', res.data.role);
          return this.$router.push('/');
        })
        .catch((/* err */) => {
          this.toast('Es ist ein Fehler aufgetreten', 'Ungültige Login-Daten', 'danger');
        });
    },
  },
  computed: {
    pwdValid() {
      return this.pwd.length > 6;
    },
  },
  components: {
    WindowControls,
  },
};
</script>

<style scoped>

.title {
  margin-bottom: 2rem;
  font-size: 26pt;
  font-weight: 600;
}

.register {
  font-size: 18pt;
  margin-top: 2rem;
}

.input {
  font-size: 26pt;
  margin-bottom: 2rem;
}

.confirmButton {
  height: 4rem;
  border-radius: 5px;
  line-height: 26pt;
}

</style>
