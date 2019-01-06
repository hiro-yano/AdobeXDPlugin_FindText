// setTimeoutとclearTimeoutを定義しないとエラーになるため、書いておきます
global.setTimeout = function (fn) { fn() };
global.clearTimeout = function () { };

const { Artboard, Text } = require("scenegraph");
const Vue = require("vue").default;
const App = require('./App.vue').default;

function createDialog(id = "dialog") {
    document.body.innerHTML = `<dialog id="${id}"><div id="container"></div></dialog>`;
    let dialog = document.getElementById(id);
    new Vue({
        el: "#container",
        components: { App },
        render(h) {
            return h(App, { props: { dialog } });
        },
    });

    return dialog;
}

function findText(children, searchedText) {
    children.forEach(elm => {
        if(elm instanceof Text && elm.text.search(searchedText)>=0){
            console.log("・"+ elm.text);
        }
        else{
            findText(elm.children, searchedText) 
        } 
    });
}
// エントリポイントとなるメソッドです
async function showReplaceDialog(selection, root) {
    const dialog = createDialog();
    const result = await dialog.showModal();
    if (result) {
        console.log("*".repeat(30))
        console.log("Searched Text:" + result[0]);
        console.log()
        root.children.forEach(elm => {
            if (elm instanceof Artboard) {
                console.log("===== Artboard :" + elm.name + " =====")
                findText(elm.children, new RegExp(result[0], 'g'));
                console.log("================" + "=".repeat(elm.name.length * 2) + "=====")
                console.log()
            }
        });
        console.log("*".repeat(30))
    }
}

// manifest.jsonで指定したコマンドIDとファンクションを紐づけます
module.exports = {
    commands: {
        showReplaceDialog
    }
};