<template>
  <div>
    <b-container class="min-vh-100 d-flex flex-column" style="background-color: var(--background-color);">
    <b-row>
      <b-col cols="1"/>
      <b-col>
        <h1 style="margin-top: 4.25rem;">Login</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="1"/>
      <b-col cols="10">
        <h4 style="margin-top: 2rem; margin-bottom: 1rem;">Bitte melde dich an</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="1"/>
        <b-col >
          <b-input style="margin-bottom: 0.5rem" type="text" placeholder="Benutzername" v-model="user"/>
        </b-col>
      <b-col cols="1"/>
    </b-row>
    <b-row>
      <b-col cols="1"/>
        <b-col>
          <b-input type="password" placeholder="Passwort" :state="pwd.length === 0 ? null : pwdValid" v-model="pwd"/>
        </b-col>
      <b-col cols="1"/>
    </b-row>
    <b-row>
      <b-col cols="1"/>
        <b-col>
          <b-button  variant="primary" style="width: 100%; margin-top: 2rem" @click="login">Anmelden</b-button>
        </b-col>
      <b-col cols="1"/>
    </b-row>
  </b-container>
  </div>
</template>

<script>
// import RoundedButton from '../components/RoundedButton';

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
      console.log('logging in…')
      // authotizes user from the backend
      this.axios.post('auth/login', {
        username: this.user,
        pwd: this.pwd
      })
        .then(( res ) => {
          if (res.status !== 200) return this.toast('Es ist ein Fehler aufgetreten', 'Ungültige Login-Daten', 'danger');
          localStorage.setItem('token', res.data.token);
          this.$store.state.loggedIn = true;
          this.$store.state.preName = res.data.preName;
          this.$store.state.lastName = res.data.lastName;
          localStorage.setItem('preName', res.data.preName);
          localStorage.setItem('lastName', res.data.lastName);
          this.$router.push("/");
        })
        .catch((/*err*/) => {
          this.toast('Es ist ein Fehler aufgetreten', 'Ungültige Login-Daten', 'danger')
        });
    },
  },
  computed: {
    pwdValid() {
      return this.pwd.length > 6;
    }
  },
  components: {
  }
}
</script>

<style
    RoundedButton>
</style>