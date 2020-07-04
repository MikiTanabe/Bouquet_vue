<template>
    <div class="myPageContents">
        <h2>マイページトップ</h2>
        <div class="myPageContentchild">
          <AlertBar :prpBlnLink="false" :prpStrMessage="strMessage" />
        </div>
        <div class="myPageContentchild">
          <h4>参加予定のイベント</h4>
          <table class="table table-sm">
             <thead class="thead-light">
               <tr>
                <th>タイトル</th>
                <th>日付</th>
                <th>概要</th>
                <th>主催</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-success"><td>第3回イメコン会議</td><td>2020-07-10</td><td>Youtubeで人気のイメージコンサルタントがオンライン会議をします</td><td>あ / Bouquet</td></tr>
              <tr><td>懇親会</td><td>2020-07-30</td><td>名古屋のイメコンが集まります</td><td>hanako / ohanaStudio</td></tr>
            </tbody>
          </table>
          <router-link to="myeventinfo">イベントの管理</router-link>
        </div>
        <div class="myPageContentchild">
          <h4>マイサロン</h4>
          <div class="salon col-8">
            <div class="flexSalonContainer borderPink">
              <div class="salonImg">
                <img src="@/img/salon-no-image.jpg" class="img-fluid">
              </div>
              <div class="salonInfo">
                <table class="table table-sm">
                  <tbody>
                    <tr><td class="table-info">サロン名</td><td>Bouquet</td></tr>
                    <tr><td class="table-info">コンサルティング内容</td><td>4タイプパーソナルカラー診断/骨格タイプ診断</td></tr>
                    <tr><td class="table-info">地域</td><td>愛知県  名古屋市守山区</td></tr>
                  </tbody>
                </table>
                <router-link to="mysalonInfo">サロン情報の編集</router-link>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import AlertBar from '@/components/AlertBar'
export default {
    name: 'MyPageTop',
    data () {
      return {
        strMessage: '新しいメッセージがあります'
      }
    },
    components: {
      AlertBar
    }
}
</script>

<style scoped>
    h2 {
        font-size: 130%;
    }

    h3 {
        font-size: 110%;
    }

    h4 {
        font-size: 100%;
    }

    .myPageContents {
        margin-left: 20px;
    }

    .myPageContentchild {
        padding-bottom: 10px;
    }

    .flexSalonContainer {
        display: flex;
        align-items: flex-start;
    }

    .salonInfo {
        margin: 0px 10px;
    }

    .borderPink {
        border: 1px solid;
        border-color: pink;
        padding: 5px;
    }
</style>