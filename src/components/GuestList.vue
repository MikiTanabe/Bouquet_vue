<template>
    <div>
        <ul class="guestlist col-12 d-flex align-item-start">
            <li class="guest text-wrap col-md-2 col-xs-6" v-for="(guest, index) in arrGuests" :key="index">
                <div>
                    <img :src="guest.profileImgUrl" class="img-fluid">
                    <p>{{ guest.consulName }} <span v-if="guest.blnSalon">/ {{ guest.salonName }}</span></p>
                </div> 
            </li>
        </ul>
    </div>
</template>

<script>
import { GetOneEventData, GetConsultantProfile, GetSalonData } from '@/js/Data'

export default {
    name: 'GuestList',
    data () {
        return {
            arrGuests: [],
            blnSalon: false
        }
    },
    props: {
        prpEvId: {
            type: String,
            default: 'sample'
        }
    },
    computed: {
        cmpEvId () {
            return this.prpEvId
        }
    },
    methods: {
        GetGuestsList: function () {
            GetOneEventData( this.prpEvId ).then( mapEvent => {
                for ( let i = 0; i < mapEvent[ 'join' ].length; i++ ){
                    var id = mapEvent[ 'join' ][ i ]
                    var mapGuest = {}
                    GetConsultantProfile( id ).then( mapUser => {
                        mapGuest = {
                            consulName: mapUser[ 'consulName' ],
                            profileImgUrl: mapUser[ 'profileImgUrl' ],
                            blnSalon: false
                        }
                        return mapGuest
                    }).then ( GetSalonData( id ).then( mapSalon => {
                        mapGuest[ 'salonId' ] = mapSalon[ 'salonId' ]
                        mapGuest[ 'salonName' ] = mapSalon[ 'name' ]
                        mapGuest[ 'blnSalon' ] = true
                        return mapGuest
                    })).then ( mapGuest => {
                        this.arrGuests.push( mapGuest )
                    }).catch ( error => {
                        this.arrGuests.push( mapGuest )
                        console.log('chatch the error', error )
                    })
                }
            })
        }
    },
    created () {
        this.GetGuestsList()
    }
}
</script>
<style scoped>
    .guestlist {
        overflow: scroll;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
    }

    .guest {
        display: inline-block;
        list-style: none;
    }
/*
    .guestlist{
        height: 300px;
        overflow: hidden;
        position: relative;
        width: 200px;
        &_body{
            color: #fff;
            height: 250px;
            left: 0;
            line-height: 250px;
            position: absolute;
            text-align: center;
            top: 0;
            width: 100%;
        }
        &_footer{
            align-items: center;
            display: flex;
            height: 50px;
            justify-content: space-between;
            position: absolute;
            top: 250px;
            width: 100%;
            &_dot{
                background-color: #abc2ce;
                border-radius: 50%;
                height: 6px;
                width: 6px;
                &.is-visible{
                    background-color: #7b94f9;
                }
            }
        }
    }

    .show-next-enter-active, .show-next-leave-active,
    .show-prev-enter-active, .show-prev-leave-active {
        transition: all .4s;
    }

    .show-next-enter, .show-prev-leave-to {
        transform: translateX(100%);
    }

    .show-next-leave-to, .show-prev-enter {
        transform: translateX(-100%);
    }
*/
</style>