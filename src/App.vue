<template>
    <div class="wrapper">
        <form @submit="onSubmit">
            <h1>テキスト検索</h1>
            <MyInput ref="searchedText" label="テキスト"></MyInput>

            <MyFooter @onClickCancel="onCancelHandler" @onClickExecution="onClickExecution"></MyFooter>
        </form>
    </div>
</template>
<script>
    import MyFooter from './MyFooter.vue';
    import MyInput from './MyInput.vue';
    export default {
        components: {
            MyFooter,
            MyInput,
        },
        props: {
            dialog: {
                type: Object,
                required: true,
            },
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();
            },
            onCancelHandler() {
                this.dialog.close();
            },
            onClickExecution() {
                this.dialog.close([this.$refs.searchedText.getValue()]);
            },
        },
    }
</script>
<style scoped>
    .wrapper {
        width: 300px;
    }

    .attention {
        color: #999;
        font-size: 12px;
    }
</style>