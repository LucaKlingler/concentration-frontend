<template>
  <div class="puzzle d-flex flex-column">
    <p class="text">
      Bitte löse folgende
      <br>
      <b class="challengeText">Rechenaufgabe:</b>
    </p>
    <div class="flex-grow-1">
      <div class="challengeWrapper">
        <div class="challengeOverlay" v-if="showWrong">
          <img class="challengeImageCheckmark" src="@/assets/cross.svg" alt="" srcset="">
        </div>
        <div>
          <div class="challenge">{{instructions}}</div>
          <b-input class="challengeInput" v-model="input" placeholder="Deine Lösung"/>
        </div>
      </div>
    </div>
    <b-button :class="{ confirmButton: true,
      confirmButtonDisabled: input.length === 0, 'flex-grow-1': true }"
      @click="checkSolution">
      bestätigen
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'Calculation',
  data() {
    return {
      instructions: 'Generiere Aufgabe... Bitte warten',
      input: '',
      solution: 0,
      startTime: Date.now(),
      failedCaptchas: [],
      showWrong: false,
    };
  },
  props: {
    notificationTs: String,
  },
  created() {
    this.createChallenge();
  },
  methods: {
    createChallenge() {
      this.showWrong = false;
      this.input = '';
      const operatorRand = Math.random();
      const a = Math.round(Math.random() * 10);
      const b = Math.round(Math.random() * 10);

      // eslint-disable-next-line no-nested-ternary
      // const operator = operatorRand >= 0.75 ? '+'
      // : operatorRand >= 0.5 ? '-' : operatorRand >= 0.25 ? '*' : '/';
      // eslint-disable-next-line no-nested-ternary
      const operator = operatorRand >= 0.66 ? '+' : operatorRand >= 0.33 ? '-' : '*';
      this.instructions = `${a} ${operator} ${b}`;

      switch (operator) {
        case '+':
          this.solution = a + b;
          break;
        case '-':
          this.solution = a - b;
          break;
        case '*':
          this.solution = a * b;
          break;
        /*
        case '/':
          this.solution = a / b;
          break;
        */
        default:
          break;
      }
    },
    checkSolution() {
      if (this.input === this.solution.toString()) {
        this.axios.post('/recaptcha/verify', {
          notificationTime: this.notificationTs,
          startTime: this.startTime,
          endTime: Date.now(),
          failedCaptchas: this.failedCaptchas,
          fails: this.failedCaptchas.length,
        })
          .then((res) => {
            this.$router.push({
              path: '/result',
              query: {
                startTs: this.notificationTs,
                clickedTs: this.startTime,
                totalTime: res.data,
              },
            });
          }).catch(() => console.log());
      } else {
        this.failedCaptchas.push(Date.now());
        this.showWrong = true;
        setTimeout(() => {
          this.createChallenge();
        }, 1000);
      }
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

.challengeWrapper {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  background-color: white;
}

.challengeOverlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.5);
}

.challengeImageCheckmark {
  margin: 25%;
  width: 50%;
  height: 50%;
}

.challenge {
  padding-top: 3rem;
  font-size: 42pt;
  text-align: center;
}

.challengeInput {
  width: 80%;
  margin: 10%;
  margin-top: 20rem;
  border: none;
  font-size: 28pt;
  font-weight: 300;
  padding: 0px;
  border-radius: 0px;
  border-bottom: 2px solid black;
}
.challengeInput:focus {
  outline: 0;
}
</style>
