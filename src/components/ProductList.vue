<template>
  <!-- 画面全体のレイアウトコンテナ -->
<v-container >
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 幅を指定したカラム：モバイルで全幅、タブレットサイズ以上で幅6 -->
      <v-col cols="12" md="6">
        
        <!-- タイトル表示 -->
        <h2 class="text-h5 font-weight-bold text-center mb-4">
          販売チケット一覧
        </h2>

        <!-- 商品リストを表示する Vuetify のリストコンポーネント -->
        <v-list
          class=" text-center d-flex flex-column align-center"
          two-line
          dense
        >
          <!-- 商品データを1件ずつ表示 -->
          <v-list-item
            v-for="event in events"
            :key="event.event_id"
          >
            <!-- 商品情報を表示するブロック -->
            <v-list-item-content>
              
              <!-- 商品名 -->
              <v-list-item-title class=text-subtitle-1>{{ event.event_name }}@{{ event.place }}</v-list-item-title>
              
              <!-- 価格と数量を表示 -->
              <v-list-item-subtitle>
                {{ event.price }}円 / {{ event.maisuu }}枚
              </v-list-item-subtitle>
            </v-list-item-content>

            <!-- カート追加ボタンを表示 -->
            <v-list-item-action>
              <v-btn small color="primary" @click="addToCart(event)">
                追加
              </v-btn>
            </v-list-item-action>

          </v-list-item>
        </v-list>

        <!-- 合計金額を表示 -->
        <v-divider class="my-4"></v-divider>
        <p class="text-subtitle-1 font-weight-bold text-center">
          合計金額：{{ totalPrice }}円
        </p>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DataList',
  computed: {
    events() {
      // ストアのstateからproductsの中身を取得
      return this.$store.state.dataList
    },
    // ストアのgettersからtotalpriceの処理結果を取得
    totalPrice() {
      return this.$store.getters.totalPrice
    }
  },
   mounted() {
       this.$store.dispatch('readData');
  },
  methods: {
    // ストアのmutationのaddToCartを呼び出す処理
    addToCart(dataList) {
      this.$store.commit('addToCart', dataList)
    }
  }

}
</script>
