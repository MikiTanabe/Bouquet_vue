<template>
    <div>
        <label for="address">メールアドレス</label>
        <input type="text" id="address" v-model="from">
        <label for="subject">題名</label>
        <input type="text" id="subject">
        <label for="text">本文</label>
        <input type="text" id="text">
        <button class="btn-primary" @click="ClickSend">送信</button>
    </div>
</template>
<script>
import { sendEmail } from '@/js/mail'

export default {
    name: 'ContactForm',
    data() {
        return {
            from: '',
            subject: '',
            text: '',
        }
    },
    methods: {
        ClickSend: function () {
            let mapMail = new Map([
                ['from', this.from],
                ['subject', this.subject],
                ['text', this.text]
            ])
            sendEmail(mapMail)
        }
    }
}

</script>
<style scoped>
</style>