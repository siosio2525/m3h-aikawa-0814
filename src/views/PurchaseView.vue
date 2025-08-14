<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 幅を指定したカラム：モバイルで全幅、タブレットサイズ以上で幅6 -->
      <v-col cols="12" md="6" class="text-center">
        
        <!-- タイトル表示 -->
        <h2 class="text-h5 font-weight-bold mb-4">チケット購入ページ</h2>

        <!-- 商品リストの説明文 -->
        <p class="text-subtitle-1 mb-2">カートに入っているチケット一覧：</p>

        <!-- カート内の商品を表示する Vuetify のリストコンポーネント -->
        <v-list dense class="mb-4" >
          <!-- 数量が1以上の商品だけを1件ずつ表示 -->
          <v-list-item
            v-for="event in events"
            :key="event.event_id"
          >
            <!-- 商品名と個数を中央揃えで表示 -->
            <v-list-item-content class="text-center">
              <v-list-item-title>
                {{ event.event_name }}@{{ event.place }} - {{ event.maisuu }}枚
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

<v-container>
  <v-form>
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
          
        >
        <!-- 時間あったら -->
          <v-text-field
            v-model="buyname"
            :counter="30"
            :rules="nameRules" 
            label="NAME"
            required
          ></v-text-field> 
        </v-col>

        <v-col
          cols="12"
          md="4"
        
        >
         <!-- 時間あったら -->
          <v-text-field
            v-model="tel"
              :counter="20"
            :rules="emailRules"
            label="TEL"
            required
          ></v-text-field> 
        </v-col>
      </v-row>
  </v-form>
</v-container>

        <!-- 合計金額の表示 -->
        <v-divider class="my-3"></v-divider>
        <p class="text-subtitle-1 font-weight-bold mb-4">
          合計金額：{{ totalPrice }}円
        </p>

        <!-- 購入ボタン：購入処理中はローディング表示、商品がない時は非活性 -->
        <v-btn
          color="success"
          @click="purchase"
          :loading="loading"
          :disabled="loading  || events.length === 0"
        >
          購入する
        </v-btn>

        <!-- 購入完了時に表示するポップアップメッセージ -->
        <v-alert
          v-if="showPopup"
          type="success"
          class="mt-6"
          border="left"
          colored-border
          elevation="2"
        >
          購入が完了しました！
        </v-alert>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PurchaseView',
   
  data() {
    return {
      loading: false,     // 購入処理中かどうかを表すフラグ
      showPopup: false,    // ポップアップ表示を管理するフラグ
      buyname: '',
      tel: '',
      valid: false, 
      nameRules:[],
      emailRules:[]
    }
  },


  computed: {
    // getterから合計金額を取得
    totalPrice() {
      return this.$store.getters.totalPrice
    },
     events() {
      // ストアのstateからproductsの中身を取得
      return this.$store.state.dataList.filter(event => event.maisuu > 0)
    },
  },
     mounted() {
       this.$store.dispatch('readData');
  },

  methods: {
    // 「購入する」ボタン押下時の処理
    async purchase() {
      this.loading = true                              // ボタンをローディング状態にする
      await this.$store.commit('setbuyinfo',{
        buyname: this.buyname,
        tel: this.tel
      }) ;
      
        await this.$store.dispatch('purchaseItems');// アクションを呼び出す（直下）
      await new Promise(resolve => setTimeout(resolve, 200));
            // 3秒後、商品数量を初期化処理を実行
            this.$store.commit('clearCart');
      this.loading = false                             // ローディング解除
      this.showPopup = true                            // ポップアップを表示

      // 2秒後にポップアップを非表示にする
      setTimeout(() => {
        this.showPopup = false
      }, 2000)
    }
  }
}
</script>