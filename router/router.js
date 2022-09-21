import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from '../views/Main.vue'
// import User from '../views/User.vue'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}
const routes = [{
        path: '/',
        name: 'Main',
        // component: Main
        redirect: '/home',
        component: () =>
            import ('../views/Main.vue'),
        children: []
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login/login.vue')
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
export default router