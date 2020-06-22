<template>
    <div>
        <div class="category">
            <ul>
                <li v-for="category in arrColor" v-bind:key="category.text" class="flexCheckBoxContainer">
                    <label class="tight mr-3">
                        <input type="checkbox" v-model="category.done" />
                        <span v-bind:class="{'done': category.done}"> {{ category.text }}</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="category">
            <ul>
                <li v-for="category in arrFrame" v-bind:key="category.text" class="flexCheckBoxContainer">
                    <label class="tight mr-3">
                        <input type="checkbox" v-model="category.done" />
                        <span v-bind:class="{'done': category.done}"> {{ category.text }}</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="category">
            <ul>
                <li v-for="category in arrImage" v-bind:key="category.text" class="flexCheckBoxContainer">
                    <label class="tight mr-3">
                        <input type="checkbox" v-model="category.done" />
                        <span v-bind:class="{'done': category.done}"> {{ category.text }}</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="category">
            <ul>
                <li v-for="category in arrActivity" v-bind:key="category.text" class="flexCheckBoxContainer">
                    <label class="tight mr-3">
                        <input type="checkbox" v-model="category.done" />
                        <span v-bind:class="{'done': category.done}"> {{ category.text }}</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="category">
            <ul>
                <li v-for="category in arrOthers" v-bind:key="category.text" class="flexCheckBoxContainer">
                    <label class="tight mr-3">
                        <input type="checkbox" v-model="category.done" />
                        <span v-bind:class="{'done': category.done}"> {{ category.text }}</span>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/firestore'

export default {
    name: 'ChkCategory',
    data () {
        return {
            arrColor: [],
            arrFrame: [],
            arrImage: [],
            arrActivity: [],
            arrOthers: [],
            mapCategoryData: {},
            mapBlnFeatures: {}
        }
    },
    props: {
        prpMapBlnFeatures: {
            type: Object,
            default: () => ({chkDef:'default'})
        }
    },
    computed: {
        chMapBlnFeatures: function () {
            return this.prpMapBlnFeatures
        }
    },
    watch: {
        chMapBlnFeatures: function ( newVal ) {
            this.mapBlnFeatures = newVal
            this.mapBlnFeatures['chkDef'] = 'got'
            this.SetBlnCategories( this.mapBlnFeatures )
            console.log('カテゴリー')
            console.log(this.arrColor)
        }
    },
    methods: {
        area_Changed: function () {
            this.arrPrefs.splice(0)
            if (this.area != '-1') {
                db.firestore().collection('subArea').doc(this.area.toString()).get().then(doc => {
                    let i = 0
                    doc.get('names').forEach ( value => {
                        var hashPref = []
                        hashPref['id'] = i
                        hashPref['name'] = value
                        this.arrPrefs.push(hashPref)
                        i++
                    })
                })
                this.prefecture = 0
            } else {
                this.prefecture = -1
            }
        },
        SetBlnCategories: function ( mapBln ) {
            if ( mapBln['chkDef'] == 'got' ) {
                Object.keys( mapBln ).forEach( key => {
                    if( key == 'chkDef' ) {
                        return
                    } else {
                        mapBln[ key ].forEach( value => {
                            var wkArray = []
                            if ( key == 'Color') {
                                this.arrColor.forEach( color => {
                                    if ( color[ 'text' ] == value ) {
                                        this.$set(color, 'done', true)
                                    }
                                    wkArray.push( color )
                                })
                                this.arrColor = wkArray
                            } else if ( key == 'Image') {
                                wkArray.splice(0)
                                this.arrImage.forEach( image => {
                                    if ( image[ 'text' ] == value ) {
                                        this.$set( image, 'done', true )
                                    }
                                    wkArray.push( image )
                                })
                                this.arrImage = wkArray
                            } else if ( key == 'Activity') {
                                wkArray.splice(0)
                                this.arrActivity.forEach( activity => {
                                    if ( activity[ 'text' ] == value ) {
                                        this.$set( activity, 'done', true )
                                    }
                                    wkArray.push( activity )
                                })
                                this.arrActivity = wkArray
                            } else if ( key == 'Frame') {
                                wkArray.splice(0)
                                this.arrFrame.forEach( frame => {
                                    if ( frame[ 'text' ] == value ) {
                                        this.$set( frame, 'done', true )
                                    }
                                    wkArray.push( frame )
                                })
                                this.arrFrame = wkArray
                            } else if ( key == 'Other') {
                                wkArray.splice(0)
                                this.arrOthers.forEach( other => {
                                    if ( other[ 'text' ] == value ) {
                                        this.$set( other, 'done', true )
                                    }
                                    wkArray.push( other )
                                })
                                this.arrOthers = wkArray
                            }
                        })
                    }
                })
            }
        },
        CallSubmit: function () {
            this.mapCategoryData['Color'] = this.arrColor
            this.mapCategoryData['Frame'] = this.arrFrame
            this.mapCategoryData['Image'] = this.arrImage
            this.mapCategoryData['Activity'] = this.arrActivity
            this.mapCategoryData['Other'] = this.arrOthers
            this.$emit( 'catchCategories', this.mapCategoryData)
        }
    },
    
    created () {
        /* カテゴリーの取得 */
        var docRef = db.firestore().collection('categories').doc('Category')
        docRef.get().then(doc => {
                doc.get('Color').forEach ( value => {
                    var chkCategory = []
                    chkCategory['done'] = false
                    chkCategory['text'] = value
                    this.arrColor.push(chkCategory)
                })
                doc.get('Frame').forEach ( value => {
                    var chkCategory = []
                    chkCategory['done'] = false
                    chkCategory['text'] = value
                    this.arrFrame.push(chkCategory)
                })
                doc.get('Image').forEach ( value => {
                    var chkCategory = []
                    chkCategory['done'] = false
                    chkCategory['text'] = value
                    this.arrImage.push(chkCategory)
                })
                doc.get('Activity').forEach ( value => {
                    var chkCategory = []
                    chkCategory['done'] = false
                    chkCategory['text'] = value
                    this.arrActivity.push(chkCategory)
                })
                doc.get('Other').forEach ( value => {
                    var chkCategory = []
                    chkCategory['done'] = false
                    chkCategory['text'] = value
                    this.arrOthers.push(chkCategory)
                })
        })
    }
}
</script>
<style scoped>
    .tight {
        margin: 0px;
        padding: 0px;
    }

    .flexCheckBoxContainer {
        display: inline-flex;
        align-items: flex-start;
        margin: 0px;
        padding: 0px;
    }

    ul {
        list-style: none;
    }

    .category {
        display: flex;
    }
</style>