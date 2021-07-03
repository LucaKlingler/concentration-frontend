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
            <p class="title">Erstelle einen Account</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p class="text-left">Vorname</p>
            <b-input style="margin-bottom: 1rem;" type="text" class="input" v-model="preName"/>
          </b-col>
          <b-col>
            <p class="text-left">Nachname</p>
            <b-input style="margin-bottom: 1rem;" type="text" class="input" v-model="lastName"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-left">
            <p>Benutzername</p>
            <b-input type="text" v-model="user"  class="input"/>
          </b-col>
          <b-col class="text-left">
            <p>Passwort</p>
            <b-input type="password" v-model="pwd" class="input"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button class="confirmButton" variant="primary"
            @click="register">Registrieren</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p class="register">
              Du hast schon einen Account?
              <router-link to="/login">Jetzt anmelden</router-link>
            </p>
          </b-col>
        </b-row>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import sha512 from 'js-sha512';
// import RoundedButton from '../components/RoundedButton';
import WindowControls from '../components/WindowControls.vue';

export default {
  name: 'Start',
  data() {
    return {
      user: '',
      pwd: '',
      preName: '',
      lastName: '',
    };
  },
  methods: {
    async register() {
      // authotizes user from the backend
      const hashStr = `${this.user}:${this.preName}:${this.lastName}`;
      const hash = await sha512(hashStr);
      this.axios.post('auth/signup', {
        username: this.user,
        pwd: this.pwd,
        preName: this.preName,
        lastName: this.lastName,
        role: 'student',
        hash,
      })
        .then((res) => {
          if (res.status !== 200) return this.toast('Es ist ein Fehler aufgetreten', 'Der Nutzername ist bereits vergeben', 'danger');
          localStorage.setItem('token', res.data.token);
          this.$store.state.loggedIn = true;
          this.$store.state.preName = res.data.preName;
          this.$store.state.lastName = res.data.lastName;
          localStorage.setItem('preName', res.data.preName);
          localStorage.setItem('lastName', res.data.lastName);
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
    mailValid() {
      const regex = RegExp(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/);
      return regex.test(this.$store.state.mailTo);
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
