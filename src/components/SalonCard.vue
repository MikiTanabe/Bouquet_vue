<template>
        <div class="col-10">
            <div class="h-100">
                <div class="col-12 h-75 mb-2 cut1">
                    <img :src="salonImg1" class="img1 img-fluid">
                </div>
                <div class="d-flex align-items-end mb-4 col-12">
                    <div class="col-4" v-if="booImg2">
                        <img :src="salonImg2" class="img-fluid">
                    </div>
                    <div class="col-7">
                        <div class="menuTitle">
                            <p class="m-auto">メニュー</p>
                        </div>
                        <div class="menu p-3">
                            <p class="m-auto">{{ strMenu }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 mb-5">
                    <p class="lead clSkyblue">{{ catchPhrase }}</p>
                    <p>{{ caption }}</p>
                </div>
                <div class="navi">
                    <p class="mb-4">
                        <span class="h2 mr-1" style="color: dimgray">{{ salonName }}</span>
                    </p>
                    <div class="area col-10 col-xs-10 col-sm-6 col-md-4 col-xl-2">
                        <p class="m-auto">{{ prefecture }}<span v-if="station!=''"> {{station}}<span v-if="station.slice(-1)!='駅'">駅</span></span></p>
                    </div>
                    <p class="small" v-if="areaDetail!=''">
                        地域詳細: {{ areaDetail }}
                    </p>
                </div>
                <div class="mb-4" v-if="booBooking">
                    <h6 class="underbar col-md-6 col-xs-12">予約方法</h6>
                    <p>{{ bookingRole }}</p>
                </div>
            </div>
        </div>
</template>

<script>
import { getSalonDataSid  } from '@/js/Data'

export default {
    name: 'SalonCard',
    data () {
        return {
            userID: '',
            salonImg1: '',
            salonImg2: '',
            booImg2: false,
            url: '#test',
            areaDetail: '',
            catchPhrase: '',
            bookingRole: '',
            caption: '',
            strMenu: '',
            salonName: '',
            station: '',
            prefecture: '',
            sid: '',
            booBooking: false
        }
    },
    props: {
        prpSid: {
            type: String,
            default: 'sample'
        },
        prpPrev: {
            type: Boolean,
            default: false
        },
        prpMapSalon: {
            type: Map,
            default: () => new Map()
        }
    },
    computed: {
        cmpSid: function() {
            return this.prpSid
        },
        cmpPrev: function() {
            return this.prpPrev
        },
        cmpMapSalon: function() {
            return this.prpMapSalon
        }
    },
    methods: {
        getSalonData: function () {
            getSalonDataSid(this.cmpSid).then(mapSalonData => {
                //this.salonImg = 'https://firebasestorage.googleapis.com/v0/b/bouquet-e3ec0.appspot.com/o/salon-Image%2FsalonSampleImg.jpg?alt=media&token=9da95006-9dc8-437c-aec4-c21e6c2b4116'
                //this.salonImg2 = 'https://firebasestorage.googleapis.com/v0/b/bouquet-e3ec0.appspot.com/o/salon-Image%2FsalonSampleImg2.jpg?alt=media&token=2a5aae44-8dc5-447d-8365-24bc9820a376'
                if(mapSalonData.get('img1Url') != ''){
                    this.booImg1 = true
                    this.salonImg1 = mapSalonData.get('img1Url')
                }
                if(mapSalonData.get('img2Url') != ''){
                    this.booImg2 = true
                    this.salonImg2 = mapSalonData.get('img2Url')
                }
                if(mapSalonData.get('areaDetail') != ''){
                    this.booAreaDetail = true
                    this.areaDetail = mapSalonData.get('areaDetail')
                }
                this.catchPhrase = mapSalonData.get('catchPhrase')
                if(mapSalonData.get('booking') != ''){
                    this.booBooking = true
                    this.bookingRole = mapSalonData.get('booking')
                }
                this.caption = '　' + mapSalonData.get('caption')
                this.strMenu = this.makeStrMenu(mapSalonData.get('menu'))
                this.salonName = mapSalonData.get('salonName')
                this.station = mapSalonData.get('station')
                this.prefecture = mapSalonData.get('prefecture')
            })
        },
        makeStrMenu: function (arrMenu){
            var strMenu = ''
            arrMenu.forEach(menu => {
                strMenu += menu + '／'
            })
            return strMenu.slice(0, -1)
        },
        setPrevData: function () {
            if(this.cmpMapSalon.get('img1Url') != ''){
                this.booImg1 = true
                this.salonImg1 = this.cmpMapSalon.get('img1Url')
            }
            if(this.cmpMapSalon.get('img2Url') != ''){
                this.booImg2 = true
                this.salonImg2 = this.cmpMapSalon.get('img2Url')
            }
            this.areaDetail = this.cmpMapSalon.get('subArea')
            this.catchPhrase = this.cmpMapSalon.get('catchPhrase')
            if(this.cmpMapSalon.get('booking') != ''){
                this.booBooking = true
                this.bookingRole = this.cmpMapSalon.get('booking')
            }
            this.caption = '　' + this.cmpMapSalon.get('introduction')
            var arrMenu = []
            this.cmpMapSalon.get('features').get('Activity').forEach(feature => {
                arrMenu.push(feature)
            })
            this.cmpMapSalon.get('features').get('Color').forEach(feature => {
                arrMenu.push(feature)
            })
            this.cmpMapSalon.get('features').get('Frame').forEach(feature => {
                arrMenu.push(feature)
            })
            this.cmpMapSalon.get('features').get('Image').forEach(feature => {
                arrMenu.push(feature)
            })
            this.cmpMapSalon.get('features').get('Other').forEach(feature => {
                   arrMenu.push(feature)
            })
            this.strMenu = this.makeStrMenu(arrMenu)
            this.salonName = this.cmpMapSalon.get('name')
            this.station = this.cmpMapSalon.get('station')
            this.prefecture = this.cmpMapSalon.get('prefecture')['name']
        }
    },
    created () {
        
    },
    mounted () {
        this.sid = this.cmpSid
        this.cmpPrev? this.setPrevData(): this.getSalonData()
    }
}
</script>

<style scoped>
    .flexContainer {
        display: flex;
        flex-wrap: nowrap;
        width: 200px;
    }

    .cut1 {
        position: relative;
    }

    .img1 {
    
    }

    .area {
        border: solid black 1px;
        text-align: center;
    }

    .clSkyblue {
        color: skyblue;
    }

    .underbar {
        border-bottom: solid black 1px;
    }

    .flexChild {
        white-space: wrap;
    }

    .menu {
        position: relative;
        white-space: pre-wrap;
        background-color: azure;
        border-radius: 0 4px 4px 4px;
        color: ＃111;
        width: 100%;
        border: 2px solid powderblue;
        z-index: -2;
    }

    .menuTitle {
        position: relative;
        display: inline-block;
        top: 2px;
        padding: 5px 10px;
        border-left: solid 2px powderblue;
        border-top: solid 2px powderblue;
        box-sizing: border-box;
        background-color: azure;
        text-align: center;
        color: #111;
        border-radius: 2px 2px 0 0;
    }

    .menuTitle ::before {
        content: "";
        position: absolute;
        top: -2.55em;
        left: 2.55em;
        border: 40px solid transparent;
        border-bottom: 38px solid azure;
        z-index: -1;
    }

    .menuTitle ::after {
        content: "";
        position: absolute;
        top:-2.65em;
        left: 2.7em;
        /* margin-left: -17px; */
        border:40px solid transparent;
        border-bottom: 38px solid powderblue;
        z-index: -3;
    }
</style>