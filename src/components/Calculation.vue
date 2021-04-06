<template>
  <div>
    <h3>{{instructions}}</h3>
    <b-input v-model="input" placeholder="Deine Lösung"/>
    <b-button @click="checkSolution">Kontrollieren</b-button>
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
    };
  },
  props: {
    notificationTs: String,
  },
  created() {
    const operatorRand = Math.random();
    const a = Math.round(Math.random() * 10);
    const b = Math.round(Math.random() * 10);

    // eslint-disable-next-line no-nested-ternary
    const operator = operatorRand >= 0.75 ? '+' : operatorRand >= 0.5 ? '-' : operatorRand >= 0.25 ? '*' : '/';
    this.instructions = `Bitte löse folgende Rechenaufgabe: ${a} ${operator} ${b}`;

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
      case '/':
        this.solution = a / b;
        break;
      default:
        break;
    }
  },
  methods: {
    checkSolution() {
      if (this.input === this.solution.toString()) {
        alert('korrekt');
        this.axios.post('/recaptcha/verify', {
          notificationTime: this.notificationTs,
          startTime: this.startTime,
          endTime: Date.now(),
          failedCaptchas: this.failedCaptchas,
          fails: this.failedCaptchas.length,
        })
          .then((res) => {
            alert(res.data);
            window.close();
          }).catch(() => console.log());
      } else {
        this.failedCaptchas.push(Date.now());
        alert('Falsch! Bitte erneut probieren');
      }
    },
  },
};
</script>

<style>

</style>
