<template>
    <div>

        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
        >
        </quill-editor>
        <Button type="primary" @click="subComm">发布</Button>
        <Button type="primary" @click="reset">重置</Button>
    </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor'

    export default {
        props:['id'],
        data () {
            return {
                content: '',
                editorOption: {
                    // some quill options

                },
                filt:{
                    newsId:"",
                    content:""
                }
            }
        },
        components:{
            quillEditor
        },
        // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({ editor, html, text }) {
                console.log('editor change!', editor, html, text)
                this.content = html
            },
            subComm(){
                this.filt.content=this.content;
                this.filt.newsId = this.id
                this.filt.date = new Date().getTime();
//                this.filt.title =
//                console.log(this.filt)
                this.$http.post("http://localhost:3000/comment/data",this.filt)
                    .then((res)=>{
                    console.log(res)
                this.count = true
                this.$emit("hideComm",{isHide:false,isCount:true})
                })
            },
            reset(){

            }
        },
        // get the current quill instace object.
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted() {
            // you can use current editor object to do something(quill methods)
            console.log('this is current quill instance object', this.editor)
        }
    }
</script>
<style>

</style>