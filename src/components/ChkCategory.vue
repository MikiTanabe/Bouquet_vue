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
            mapCategoryData: []
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