<template>
    <div class="container">
      <div class="Row">
        <div id="contentsWrapper">
          <div class="contents">
            <div class="col-12">
              <h1 class="clPink">新着イベント</h1>
            </div>
            <EventList />
          </div>
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
              <h1 class="clPink">サロンを検索</h1>
            </div>
            <Categories @doSearch="DoSearch"></Categories>
          </div>
        </div>
      </div>
</template>

<script>
import Categories from '@/components/Categories.vue'
import PickupSalon from '@/components/PickupSalon.vue'
import EventList from '@/components/EventList.vue'

export default {
  name: 'Top',
  components: {
    Categories,
    PickupSalon,
    EventList
  },
  data: function () {
    return {
      areaID: -1,
      prefID: -1
    }
  },
  methods: {
    DoSearch: function ( value ) {
      console.log(value)
    }
  }
}
</script>

<style>
</style>