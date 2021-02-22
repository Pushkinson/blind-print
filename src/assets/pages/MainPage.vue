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
          <!--
            :color="isColored"
            :bpItem="myString"
             v-for="symbolItem in myString"
            :key="symbolItem.id"
                        v-for="contentItem in ITEM"
            :key="contentItem"
            :contentItem="item" -->
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
      // return this.inputs.length;
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











  // data() {
  //   return {
  //     randomIndex: 0,
  //     myString: 'Hello',
  //     isColored: true,
  //     currentSymbos: -1,
  //     customArray: rawData,
  //   }
  // },

  // components: {
  //   AppContent,
  // },

  // computed: {
  //   ...mapGetters([
  //     'ITEMS',
  //     // 'ITEM',
  //     'ITEM_VAL'
  //   ]),

  //   // s

  //    // this.ITEM.content.filte
  //   //   return Array.from(this.ITEM.content);

  //   item: function() {

  //     let item = [...rawData];

  //     return item;




  //     // return {};
  //   //   let arr = [];
  //   //   for (let i=0; i < this.ITEMS[this.randomIndex].content.length; i++) {
  //   //     arr.push({value: this.ITEMS[this.randomIndex].content[i], isColored: false });
  //   //   }
  //   // let arr = [];

  //   // this.ITEM.content.filte
  //   //   return Array.from(this.ITEM.content);

  //     // for (let i=0; i < this.ITEM_VAL; i++) {
  //     //   arr.push({value: this.ITEM.content[i], isColored: i <= this.currentSymbos });
  //     // }

  //     // return arr;


  //     // let arr = [];
  //     // for (let i=0; i < this.myString.length; i++) {
  //     //   arr.push({value: "" + this.myString[i], isColored: i <= this.currentSymbos });
  //     // }

  //     // return arr;

  //     // return console.log(rawDataItems);
  //     // return Array.from(this.myString);
  //     // return this.ITEMS[this.randomIndex].content;
  //   }
  // },

  // methods: {
  //   ...mapActions([
  //     'GET_ITEMS_FROM_API'
  //   ]),

  //   clickFunction() {
  //     // this.randomIndex = Math.floor( Math.random() * this.ITEMS.length );
  //   },

  //   onInput(e) {
  //     // let randVal = this.ITEM.content;

  //     console.log(String.fromCharCode(e.keyCode));
  //     // console.log(randVal);

  //   //   if (randVal[this.currentSymbos + 1] === String.fromCharCode(e.keyCode)) {
  //   //     this.currentSymbos += 1;
  //   }
  // },

  // mounted() {
  //   // let rawDataItems = this.ITEMS[this.randomIndex].content;
  //   this.GET_ITEMS_FROM_API();
  //   // let rawDataItems = this.randomItemByIndex();

  //   // this.myString = rawDataItems.content;
  //   // let randVal = this.ITEM.content;

  //   // window.addEventListener("keypress", e => {
  //   //   console.log(String.fromCharCode(e.keyCode));
  //   //   console.log(randVal);

  //   //   if (randVal[this.currentSymbos + 1] === String.fromCharCode(e.keyCode)) {
  //   //     this.currentSymbos += 1;
  //   //   }
  //   // });

  //   window.addEventListener("keypress", this.onInput);
  // }
}

</script>

<style lang="sass" scoped>
.main__content__text
  display: flex
  flex-wrap: wrap
</style>