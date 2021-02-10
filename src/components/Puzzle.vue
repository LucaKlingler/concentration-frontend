<template>
  <div>
    <h1>Bitte wähle alle {{challenge}} {{category}} aus. Übrig: {{amount}}</h1>
    <table>
        <!-- generieren von "size" Reihen -->
        <tr v-for="i in size" :key="i"> 
          <!-- generieren von "size" Spalten -->
          <td v-for="u in size" :key="u" 
          :class="{ right: pictures[(i-1)*size+(u-1)].img.includes(category) &&
          pictures[(i-1)*size+(u-1)].clicked,
          wrong: !pictures[(i-1)*size+(u-1)].img.includes(category) &&
          pictures[(i-1)*size+(u-1)].clicked }">
            <!-- hinzufügen der entsprechenden Bilder -->
            <img width="100%" height="100%"
            :src="require(`@/assets/pictures${pictures[(i-1)*size+(u-1)].img}`)"
            @click="captchaClick(pictures[(i-1)*size+(u-1)])"
            v-show="!pictures[(i-1)*size+(u-1)].clicked">
          </td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: 'Puzzle',
  data() {
    return {
      size: undefined,
      challenge: undefined,
      failedCaptchas: [],
      pictures: [],
      category: '',
      amount: 0,
      startTime: Date.now(),
    };
  },
  props: {
    notificationTs: String,
  },
  methods: {
    captchaClick(picture) {
      //Bild als geklickt kennzeichnen
      this.pictures[picture.i].clicked = true;
      this.pictures[picture.i].clickedTs = Date.now();
      //Wenn richtig, score verändern ansonsten neues Captcha & Fail saven
      if (picture.img.includes(this.category)) {
        this.amount -= 1;
      } else {
        this.failedCaptchas.push(this.pictures);
        this.createCaptcha();
      }
      //Wenn alle richtig geklickt, an Backend senden
      if (this.amount === 0) {
        this.axios.post('/recaptcha/verify', {
          pictures: this.pictures,
          failedCaptchas: this.failedCaptchas,
          fails: this.failedCaptchas.length,
          category: this.category,
          amount: this.amount,
          notificationTime: this.notificationTs,
          startTime: this.startTime,
          endTime: Date.now(),
          size: this.size,
          challenge: this.challenge,
        })
          .then((res) => {
            alert(res.data);
            window.close();
          }).catch(() => console.log());
      }
    },
    //Kreiert Captcha aus zufälligen Bildern
    createCaptcha() {
      this.pictures = [];
      this.category = '';
      this.amount = 0;
      const picturesReq = require.context(
        '@/assets/pictures',
        true,
        /^.*\.jpg$/,
      );
      const picturesList = picturesReq.keys();
      for (let i = 0; i < this.size ** 2; i += 1) {
        const rand = Math.floor(Math.random() * picturesList.length);
        const img = picturesList[rand].slice(1, picturesList[rand].length);
        this.pictures.push({
          img, i, clicked: false,
        });
      }
      const randCat = Math.floor(Math.random() * this.pictures.length);
      const randFile = this.pictures[randCat].img.split('/');
      // eslint-disable-next-line prefer-destructuring
      this.category = randFile[1];
      this.amount = this.pictures.filter((pic) => pic.img.includes(this.category)).length;
      if (this.amount !== this.challenge) {
        console.log('not three challenges. recreating');
        this.createCaptcha();
      }
    },
  },
  mounted() {
    //Abruf der Größe des Captchas aus der Datenbank
    this.axios.get('/recaptcha/getChallenge').then((res) => {
      this.size = res.data.size;
      this.challenge = res.data.challenge;
      this.createCaptcha();
    });
  },
};

</script>

<style scoped>
td {
  height: 150px;
  width: 150px;
}
.right {
  background-color: green;
}
.wrong {
  background-color: red;
}
</style>
