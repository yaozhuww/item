import user from "../view/user/user.vue";
import cate from "../view/cate/cate.vue";
import news from "../view/news/news.vue";
import upload from "../view/upload/upload.vue";
export const routes = [
    {path:"/user",component:user},
    {path:"/cate",component:cate},
    {path:"/news",component:news},
    {path:"/upload",component:upload}
];