import { createRouter, createWebHashHistory } from 'vue-router'
import {subscribeToAuth, getAdmin} from "../services/auth.js";
import {auth} from "../services/firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import Chat from '../views/Chat.vue'
import Shows from '../views/Shows.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import UserProfile from '../views/UserProfile.vue'
import PrivateChat from '../views/PrivateChat.vue'
import Admin from '../views/Admin.vue'


const routes = [
    { path: '/',                 component: Home },
    { path: '/shows',            component: Shows },
    { path: '/chat',             component: Chat,         meta: { requiresAuth: true, }},
    { path: '/login',            component: Login },
    { path: '/register',         component: Register },
    { path: '/profile',          component: Profile,      meta: { requiresAuth: true, }},
    { path: '/usuario/:id',      component: UserProfile,  meta: { requiresAuth: true, }},
    { path: '/usuario/:id/chat', component: PrivateChat,  meta: { requiresAuth: true, }},
    { path: '/admin',            component: Admin,        meta: { requiresAdmin: true, requiresAuth: true}}

]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

// let user = {
//     id: null,
//     email: null,
// }
// subscribeToAuth(newUser => user = newUser);
router.beforeEach( async (to, from) => {
    onAuthStateChanged(auth, async (user)=>{
        if (user){
            const userData = await getAdmin (user.uid);
            if(userData.admin){
                console.log("sos un usuario")
            }else{

                if(to.meta.requiresAdmin){
                    console.log("no sos un admin")
                    router.push("/");
                }
            }
        }else{
            if(to.meta.requiresAuth){
                console.log("no estas registrado, que haces aca?")
                router.push("/login");
            }
        }
    })

});



export default router