<script setup>
import AppButton from '../components/AppButton.vue';
import AppInput from '../components/AppInput.vue';
import AppLabel from '../components/AppLabel.vue';
import {register} from "../services/auth.js";
import {ref} from "vue";
import {useRouter} from "vue-router";


const {dataAuth, cargando, processRegister} = useRegister();

function useRegister() {
    const router = useRouter();
    const dataAuth = ref({
        email: '',
        password: '',
    });
    const cargando = ref(false);

    async function processRegister() {
        cargando.value = true;

        await register({
            ...dataAuth.value,
        });
        cargando.value = false;

        router.push('/profile');
    }

    return {
        dataAuth,
        cargando,
        processRegister,
    }
}
</script>

<template>
    <div id="register">
        <h1>Registrarse</h1>
    </div>
    <form action="#" method="post" @submit.prevent="processRegister">
        <div class="form-group">
            <AppLabel for="email">Email</AppLabel>
            <AppInput 
            type="email"
            name="email"
            id="email"
            v-model="dataAuth.email"
            />
        </div>
        <div class="form-group">
            <AppLabel for="password">Contraseña</AppLabel>
            <AppInput 
            id="password"
            type="password"
            name="password"
            v-model="dataAuth.password"
            />
        </div>
        <div class="form-group">
            <AppButton>Crear cuenta</AppButton>
        </div>
    </form>
</template>