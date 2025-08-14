import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
         dataList: [],
         buyname: '',
         tel: ''
    },
    // 合計金額を計算するgetter
    getters: {
        totalPrice(state) {
            // state.dataList にある全商品の合計金額を計算
            return state.dataList.reduce((sum, event) => {
            // 各商品の「価格 × 数量」を加算していく    
            return sum + (event.price * event.maisuu);
            }, 0);
        }
    },
    
    // 商品をカートに追加するmutation（数量を1つ増やす）
    mutations: {
        addToCart(state, dataList) {

            // state.productsの中から、product.idと同じIDを持つ商品pを探し、見つかればitemに代入
            const event = state.dataList.find(p => p.event_id === dataList.event_id);

            // 該当商品の quantity を1つカウントアップ
            if (event) {
                event.maisuu++;
            }
        },
        // 商品の数量をリセットするmutation
        clearCart(state) {
            
            // state.products のすべての商品を1つずつ取り出して0にリセット
            state.dataList.forEach(event => {event.maisuu = 0;});
        },
        getList(state,dataList){
            state.dataList= dataList;
        },
        setbuyinfo(state,info) {
            state.buyname = info.buyname;
            state.tel = info.tel;
        }
    },

    // 商品購入処理をの非同期action
    actions: {
            // データベースからデータを取得する関数
    readData: async function({state,commit}) {
          if (state.dataList.length > 0) {
        return; //APIの再取得を防ぐ
      }
      //SELECT用のAPIを呼び出し      
      const response = await axios.get('https://functionappkadai20250807104942.azurewebsites.net/api/SELECT?');
         //結果リストを表示用配列に代入
     commit('getList',response.data.List);
        },


        // PromiseとsetTimeoutを使って3秒間待機
        async purchaseItems({state}) {

            console.log("送信データ:", state.buyname, state.tel); // ←ここで確認

      //  POSTメソッドで送るパラメーターを作成
       const eventsToPurchase = state.dataList.filter(e => e.maisuu > 0);  //test

  const requests = eventsToPurchase.map(item => {  //test
      console.log("送信するイベント情報:", item); //test
      const param = {
        event_id : item.event_id,
        buy_name : state.buyname,
        tel : state.tel,
        buy_date : new Date(),
        maisuu : item.maisuu
      };
       console.log("送信するイベント情報:", param);
      //INSERT用のAPIを呼び出し
    return axios.post('https://functionappkadai20250807104942.azurewebsites.net/api/INSERT',param)
});
    
    await Promise.all(requests)     //全部終わるまで待つ
},
    }   
})
