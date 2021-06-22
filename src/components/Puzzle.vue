<template>
  <div class="puzzle d-flex flex-column">
    <h1 v-if="false">Bitte wähle alle {{challenge}} {{category}} aus. Übrig: {{amount}}</h1>
    <p class="text">
      Wähle alle Quadrate mit
      <br>
      <b class="challengeText">{{category}}</b>
    </p>
    <div class="captchaWrapper" ref="captchaWrapper">
      <div class="captchaOverlay" v-if="showWrong">
        <img class="captchaImageCheckmark" src="@/assets/cross.svg" alt="" srcset="">
      </div>
      <table>
        <!-- generieren von "size" Reihen -->
        <tr v-for="i in size" :key="i">
          <!-- generieren von "size" Spalten -->
          <td v-for="u in size" :key="u"
          :style="{ width: imgSize, height: imgSize }"
          :class="{ right: pictures[(i-1)*size+(u-1)].img.includes(category) &&
          pictures[(i-1)*size+(u-1)].clicked && false,
          wrong: !pictures[(i-1)*size+(u-1)].img.includes(category) &&
          pictures[(i-1)*size+(u-1)].clicked && false }">
            <!-- hinzufügen der entsprechenden Bilder -->
            <div class="captchaImageWrapper">
              <div class="captchaImageOverlay" v-if="pictures[(i-1)*size+(u-1)].clicked">
                <img v-if="pictures[(i-1)*size+(u-1)].img.includes(category) &&
                pictures[(i-1)*size+(u-1)].clicked" class="captchaImageCheckmark"
                src="@/assets/checkmark.svg" alt="" srcset="">
                <img v-if="!pictures[(i-1)*size+(u-1)].img.includes(category) &&
                pictures[(i-1)*size+(u-1)].clicked" class="captchaImageCheckmark"
                src="@/assets/cross.svg" alt="" srcset="">
              </div>
              <img class="captchaImage"
              :src="require(`@/assets/pictures${pictures[(i-1)*size+(u-1)].img}`)"
              @click="captchaClick(pictures[(i-1)*size+(u-1)])"
              v-show="!pictures[(i-1)*size+(u-1)].clicked || true">
            </div>
          </td>
        </tr>
      </table>
    </div>
    <b-button :class="{ confirmButton: true,
      confirmButtonDisabled: !solved, 'flex-grow-1': true }"
      @click="solve">
      bestätigen
    </b-button>
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
      showWrong: false,
      solved: false,
    };
  },
  props: {
    notificationTs: String,
  },
  methods: {
    captchaClick(picture) {
      if (this.solved) return;
      // Bild als geklickt kennzeichnen
      this.pictures[picture.i].clicked = true;
      this.pictures[picture.i].clickedTs = Date.now();
      // Wenn richtig, score verändern ansonsten neues Captcha & Fail saven
      if (picture.img.includes(this.category)) {
        this.amount -= 1;
      } else {
        this.failedCaptchas.push(this.pictures);
        this.showWrong = true;
        setTimeout(() => {
          // this.createCaptcha();
        }, 1000);
      }
      // Wenn alle richtig geklickt, an Backend senden
      if (this.amount === 0) {
        this.solved = true;
      }
    },
    solve() {
      if (!this.solved) return;
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
    },
    // Kreiert Captcha aus zufälligen Bildern
    createCaptcha() {
      this.showWrong = false;
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
    // Abruf der Größe des Captchas aus der Datenbank
    this.axios.get('/recaptcha/getChallenge').then((res) => {
      this.size = res.data.size;
      this.challenge = res.data.challenge;
      this.createCaptcha();
    });
  },
  computed: {
    imgSize() {
      console.log(this.size, this.$refs.captchaWrapper.clientWidth / this.size);
      return `${this.$refs.captchaWrapper.clientWidth / this.size}px`;
    },
  },
};

</script>

<style scoped>

.puzzle {
  height: 100%;
}

.text {
  padding: 1.5rem;
}

.challengeText {
  font-size: 16pt;
}

.captchaWrapper {
  width: 100%;
  background-color: white;
  position: relative;
  display: block;
  margin: 1rem;
}

.captchaOverlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.5);
}

td {
  padding: 1rem;
}

.captchaImageWrapper {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.captchaImage {
  cursor: pointer;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.captchaImageOverlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.5);
}
.captchaImageCheckmark {
  margin: 25%;
  width: 50%;
  height: 50%;
}

.right {
  background-color: green;
}
.wrong {
  background-color: red;
}

.confirmButton {
  background-color: #716EFF;
  width: 100%;
  line-height: 100%;
  color: white;
  font-size: 18pt;
  font-weight: 700;
  cursor: pointer;
}

.confirmButtonDisabled {
  opacity: 0.7;
  cursor: not-allowed !important;
}
</style>
