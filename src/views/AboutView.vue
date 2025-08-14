<!-- <template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul v-for="eventList in dataList.List" :key="eventList.event_id">    
     {{ eventList.event_name }} @ {{ eventList.place }}
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      eventList: []
    };
  },
  computed:{
   
  },

  methods:{
    
    

  }
}
</script> -->
<!-- <template>
  <div>
    <h1>購入履歴一覧</h1>
    <ul>
         <li v-for="r in events" :key="r.rireki_id">
        #{{ r.rireki_id }}
        (event_id: {{ r.event_id }}) /
        購入者: {{ r.buyname || '—' }} /
        枚数: {{ r.maisuu }} /
        日時: {{ formatDate(r.buydate) }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      events: []
    };
  },
  mounted() {
    axios
      .get('https://functionappkadai20250807104942.azurewebsites.net/api/SELECT_Rireki?') 
      .then((response) => {
        this.events = response.data.List;
      })
  }
};
</script> -->
<template>
  <div>
    <h1 class="text-h5 font-weight-bold text-center mt-4 mb-4">購入履歴一覧</h1>
    <ul
          class="text-center d-flex flex-column align-center"
          two-line
          dense>
      <li v-for="r in events" :key="r.rireki_id">
        履歴番号: {{ r.rireki_id }}
        (イベント番号: {{ r.event_id }}) /
        購入者: {{ r.buyname || '—' }} /
        電話番号: {{ r.tel }} /
        枚数: {{ r.maisuu }} /
        日時: {{ formatDate(r.buydate) }}/
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){ return { 
    events: [] 
  }
 },
  mounted(){
    axios.get('https://functionappkadai20250807104942.azurewebsites.net/api/SELECT_Rireki')
      .then(res => {
        // バックエンドがJSON文字列を返す場合に備えて両対応
        const rireki = (typeof res.data === 'string') ? JSON.parse(res.data) : res.data;
        this.events = rireki.List;
      })
  },
  methods:{       //test
    formatDate(v){
      // 文字列/Dateどちらでもローカル表示
      try { return new Date(v); } 
      catch { return v; }
    }
  }
}
</script>
