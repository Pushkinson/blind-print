<template>
  <div class="main"
  >
    <div class="main__wrapper">
      <div class="main__header"></div>
      <div class="main__content">
        <div class="main__content__text">
          <app-content
            v-for="symbolItem in getTransformationData"
            :key="symbolItem.id"
            :symbolItem="symbolItem"
          />
          <div class="main__content_data">
            <div class="main__content_speed"></div>
            <div class="main__content_accuracy"></div>
            <div class="main__content__button-start button">
              <button
                @click="clickFunction"
              >click</button></div>
              <!--  -->
            <div class="main__content__button-refresh button"></div>
            <div class="speed">{{ calculateSpeed }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import AppContent from '../components/appContent';

export default {
  name: "MainPage",

  data() {
    return {
      rawData: '',
      currentSymbos: -1,
      inputs: [],
      timestamp: 0,
    }
  },

  components: {
    AppContent,
  },

  computed: {
    ...mapGetters([
      'ITEMS',
      'ITEM_VAL'
    ]),

    getTransformationData() {
      let arr = [];

      for (let i=0; i<this.rawData.length; i++) {
        arr.push({ "value": this.rawData[i], "isColored": this.currentSymbos >= i, "id": i})
      }

      return arr;
    },

    calculateSpeed() {
      let currentSpeed = 0;
      let currentAccuracy = 0;
      let prevTimestamp = this.timestamp - 1000*60;
      let currentTimestump = this.timestamp;

      for (let i = 0; i < this.inputs.length; i++) {
        if (this.inputs[i].timestamp <= currentTimestump && this.inputs[i].timestamp >= prevTimestamp) {
          currentSpeed += this.inputs[i].isCurrect ? 1 : 0;
        }

        currentAccuracy += this.inputs[i].isCurrect ? 1 : 0;
      }
      if (this.inputs.length !== 0) {
        currentAccuracy = Math.floor((currentAccuracy / this.inputs.length)*100).toFixed(1);
      } else {
        currentAccuracy = 100;
      }

      return {"speed": currentSpeed, "accuracy": currentAccuracy}
    }
  },

  methods: {
    ...mapActions([
      'GET_ITEMS_FROM_API'
    ]),

    onInput(e) {
      // Запустить таймер по клику

      this.timestamp = new Date().getTime();

      let boolIsCurrect = this.rawData[this.currentSymbos + 1] === String.fromCharCode(e.keyCode);

      if (boolIsCurrect) {
        this.currentSymbos += 1;
      }

    let timestamp = new Date();

    this.inputs.push({ "timestamp": timestamp.getTime(), "isCurrect": boolIsCurrect})
      // Если достигнут конец строки, остановить таймер
    },

    clickFunction() {
      this.GET_ITEMS_FROM_API();
    },

    countdown() {
      this.timestamp = new Date().getTime();
    }
  },

  mounted() {
    this.GET_ITEMS_FROM_API();

     window.addEventListener("keypress", this.onInput);

     setTimeout(this.countdown, 1);

  },

  watch: {
    ITEMS: function(value) {
      this.currentSymbos = -1;
      this.rawData = value.content;
      this.inputs = [];
      this.timestamp = new Date().getTime();
      // остановить таймер, когда данные получены
    }

  }
}

</script>

<style lang="sass" scoped>
.main__content__text
  display: flex
  flex-wrap: wrap
</style>