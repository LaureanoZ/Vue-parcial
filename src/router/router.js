import { createRouter, createWebHashHistory } from 'vue-router'
import {subscribeToAuth} from "../services/auth.js";
import Chat from '../views/Chat.vue'
import Shows from '../views/Shows.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import UserProfile from '../views/UserProfile.vue'
import PrivateChat from '../views/PrivateChat.vue'


const routes = [
    { path: '/',                 component: Home },
    { path: '/shows',            component: Shows },
    { path: '/chat',             component: Chat,  meta: { requiresAuth: true, }},
    { path: '/login',            component: Login },
    { path: '/register',         component: Register },
    { path: '/profile',          component: Profile,  meta: { requiresAuth: true, }},
    { path: '/usuario/:id',      component: UserProfile,  meta: { requiresAuth: true, }},
    { path: '/usuario/:id/chat', component: PrivateChat,  meta: { requiresAuth: true, }}

]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let user = {
    id: null,
    email: null,
}
subscribeToAuth(newUser => user = newUser);
router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && user.id === null) {
        return {path: '/login',}
    }
});

export default router