<script setup>
import {useRoute} from "vue-router";
import {useUser} from "../composition/useUser.js";
import AppLoading from "../components/AppLoading.vue";
import {fechaAString} from "../helpers/date.js";
import AppLabel from "../components/AppLabel.vue";
import AppButton from "../components/AppButton.vue";
import AppTextarea from "../components/AppTextarea.vue";
import {useAuth} from "../composition/useAuth.js";
import {onUnmounted, ref, watch} from "vue";
import {sendPrivateMessage, subscribeToPrivateChat} from "../services/private-chats.js";

const route = useRoute();
const {user: otherUser, loading} = useUser(route.params.id);
const {user: authUser} = useAuth();
const {handleSubmit, fields, formLoading} = usePrivateChatForm(authUser, otherUser);
const {messages, loading: loadingMessages} = usePrivateChat(authUser, otherUser);

function usePrivateChat(authUser, otherUser) {
    const loading = ref(true);
    const messages = ref([]);

    let unsubscribe = () => {};

    watch(otherUser, newOtherUser => {
        if(newOtherUser.id != null) {
            setSubscription();
        }
    });

    async function setSubscription() {
        unsubscribe = await subscribeToPrivateChat(
            authUser.value.id,
            otherUser.value.id,
            newMessages => {
                messages.value = newMessages;
                loading.value = false;
            }
        );
    }
    onUnmounted(() => {
        unsubscribe();
    });

    return {
        loading,
        messages,
    }
}

function usePrivateChatForm(authUser, otherUser) {
    const formLoading = ref(false);
    const fields = ref({
        message: '',
    });

    async function handleSubmit() {
        formLoading.value = true;

        // TODO: Capturar errores.
        await sendPrivateMessage(authUser.value.id, otherUser.value.id, fields.value.message);
        formLoading.value = false;
        fields.value.message = '';
    }

    return {
        formLoading,
        fields,
        handleSubmit,
    }
}
</script>

<template>
    <AppLoading :loading="loading">
        <h1 class="mb-4 text-4xl">Chat privado con {{ otherUser.email }}</h1>

        <div class="mb-3">
            <AppLoading :loading="loadingMessages">
                <ul>
                    <li
                        v-for="message in messages"
                        class="mb-3"
                    >
                        <b>
                            <template v-if="message.userId !== authUser.id">
                                <router-link
                                    :to="`/usuario/${message.userId}`"
                                    class="text-blue-400 underline"
                                >{{ message.userId }}</router-link>
                            </template>
                            <template v-else>
                                {{ message.userId }}
                            </template>
                            dijo:
                        </b>
                        {{ message.message }}
                        <div
                            v-if="message.created_at"
                            class="text-sm"
                        >{{ fechaAString(message.created_at) }}</div>
                    </li>
                </ul>
            </AppLoading>
        </div>
        <div class="mb-2">
            <form
                action="#"
                method="post"
                id="form-message"
                @submit.prevent="handleSubmit"
            >
                <div class="mb-3">
                    <AppLabel for="message">Mensaje</AppLabel>
                    <AppTextarea
                        id="message"
                        v-model="fields.message"
                    ></AppTextarea>
                </div>
                <AppButton/>
            </form>

            <div
                v-if="formLoading"
                class="mb-3"
            >Enviando mensaje...</div>
        </div>
    </AppLoading>
</template>