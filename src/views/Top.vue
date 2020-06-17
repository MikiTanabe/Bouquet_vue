<template>
    <div class="container">
      <div class="Row">
        <div id="contentsWrapper">
          <div class="contents">
            <div class="col-12">
              <h1 class="clPink">Pick Up Salon</h1>
            </div>
            <div class="col-12">
              <PickupSalon />
            </div>
          </div>
        </div>
          <div class="contents">
            <div class="col-12">
              <h1 class="clPink">カテゴリー</h1>
            </div>
            <div class="categoryWrapper borderPink col-12 p-3 m-2">
              <div class="flexCategoryContainer">
                <div class="category">
                  <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" value="4Colors" id="4Colors">
                    <label class="form-check-label chkCategory col-1 col-md-3 col-sm-12" for="4Colors">4タイプパーソナルカラー診断</label>
                    <input type="checkbox" class="form-check-input" value="8Colors" id="8Colors">
                    <label class="form-check-label  chkCategory col-1 col-md-3 col-sm-12" for="8Colors">8タイプパーソナルカラー診断</label>
                    <input type="checkbox" class="form-check-input" value="16Colors" id ="16Colors">
                    <label class="form-check-label chkCategory col-1 col-md-3 col-sm-12" for="16Colors">16タイプパーソナルカラー診断</label>
                  </div>
                </div>
                <div class="category">
                  <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" value="Frames" id="Frames">
                    <label class="form-check-label chkCategory col-1 col-md-3 col-sm-12" for="Frames">骨格タイプ診断</label>
                    <input type="checkbox" class="form-check-input" value="PD" id="PD">
                    <label class="form-check-label chkCategory col-1 col-md-3 col-sm-12" for="PD">パーソナルデザイン診断</label>
                    <input type="checkbox" class="form-check-input" value="FaceTypes" id="FaceTypes">
                    <label class="form-check-label chkCategory col-1 col-md-3 col-sm-12" for="FaceTypes">顔タイプ診断</label>
                  </div>
                </div>
              </div>
                <div class="category">
                  <div class="form-group form-check col-12">
                    <input type="checkbox" class="form-check-input" value="Bridal" id="Bridal">
                    <label class="form-check-label chkCategory col-1 col-md-3 col-sm-12" for="Bridal">ブライダル</label>
                    <input type="checkbox" class="form-check-input" value="MakeLessonl" id="MakeLessonl">
                    <label class="form-check-label chkCategory col-1 col-md-3 col-sm-12" for="MakeLessonl">メイクレッスン</label>
                    <input type="checkbox" class="form-check-input" value="Shopping" id="Shopping">
                    <label class="form-check-label chkCategory col-1 col-md-3 col-sm-12" for="Shopping">お買い物同行</label>
                  </div>
                </div>
                <div class="category">
                  <div class="flexPlaceContainer">
                    <div class="form-group place">
                      <label for="areaSelection">地域</label>
                      <select class="form-control" id="areaSelection">
                        <option>北海道</option>
                        <option>東北</option>
                        <option>関東</option>
                        <option>中部</option>
                        <option>関西</option>
                        <option>中国</option>
                        <option>四国</option>
                        <option>九州・沖縄</option>
                      </select>
                     </div>
                    <div class="form-group place">
                      <label for="prefectureSelection">都道府県</label>
                      <select class="form-control" id="prefectureSelection">
                        <option>--選択なし--</option>
                        <option>北海道</option>
                      </select>
                    </div>
                  </div>
                </div>
                <SearchBox></SearchBox>
              </div> 
            </div>
          </div>
        </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
import PickupSalon from '@/components/PickupSalon.vue'

export default {
  name: 'Top',
  components: {
    SearchBox,
    PickupSalon
  }
}
</script>

<style>
</style>