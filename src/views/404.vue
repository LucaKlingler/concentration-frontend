<template>
  <div class="dbwrapper text">
    <b-container fluid>
      <b-row>
        <b-col>
          <div class="dbcontent">
            <!-- Einbinden eines "testpings" zur vereinfachten Entwicklung und Demonstration -->
            <h2>404 Page not found</h2>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: '404',
  components: {
  },
  data() {
    return {
      history: [],
    };
  },
  // updaten der Daten alle 10 Sekunden
};
</script>
<style scoped>
  .text {
    color: white;
  }
  .dbwrapper {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, #1C2A4D 0%, #000000 100%);
  }

  .dbcontent {
    height: 90vh;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }

  .dbboxwrapper
  {
    padding: 1rem;
  }
  .dbbox {
    padding: 1rem;
    background: #303A53;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .dbboxActive {
    border: 2px solid green;
  }

  .chart {
    height: 150px;
  }

  .cal {
    height: 250px;
    width: 100%;
  }

  .stoppen {
    color: red;
  }

  .starten {
    color: green;
  }
</style>
