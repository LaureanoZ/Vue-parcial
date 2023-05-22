<script setup>
import AppButton from "../components/AppButton.vue";
import AppTextarea from "../components/AppTextarea.vue";
import AppLabel from "../components/AppLabel.vue";
import {fechaAString} from "../helpers/date.js";
import {sendMessage, subscribeToChatMessages} from "../services/chat.js"
import {useAuth} from "../composition/useAuth.js";
import {onMounted, onUnmounted, ref} from "vue";


const {messages, cargando} = useChat();
const {handleSubmit, dataCarga, form, user} = useChatForm();
function useChat() {
    const cargando = ref(true);
    const messages = ref([]);
    let unsubscribe = () => {}

    onMounted(() => {
        unsubscribe = subscribeToChatMessages(newMessages => {
            cargando.value = false;
            messages.value = newMessages;
        });
    });

    // onUnmounted(() => {
    //     unsubscribe();
    // });

    return {
        cargando,
        messages,
    }
}


function useChatForm() {
    const form = ref({
        message: '',
    });
    const dataCarga = ref(false);
    const {user} = useAuth();

    function handleSubmit() {
        dataCarga.value = true;
        sendMessage({
            userId: user.value.id,
            displayName: user.value.email,
            message: form.value.message,
        })
            .then(() => {
                dataCarga.value = false;
                form.value.message = '';
            });
    }

    return {
        dataCarga,
        form,
        user,
        handleSubmit,
    }
}
</script>

<template>
      <div>

        <h1>chat</h1>
        <div class="row">
            <div class="col-6">
                <h2 class="my-5">Asistente Virtual</h2>
                <form
                action="#" 
                method="post"
                id="usuario"
                @submit.prevent="handleSubmit"
                >
                  <div class="row mb-3">
                    <div class="col">
                      <p class="mb-2">Email</p>
                      <p>{{ user.email }}</p>

                    </div>
                  </div>
                  <div class="mb-3">
                    <AppLabel for="mensaje">Mensaje</AppLabel>
                    <AppTextarea
                      class="form-control"
                      id="message"
                      name="mensaje"
                      v-model="form.message"
                    />
                  </div>
                  <AppButton></AppButton>
                </form>
                <div
                v-if="dataCarga"
                >
                <p>enviando...</p>
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                    <h3 class="col-12 mt-5">mensajes</h3>
                    <div id="chat">
                      <p v-if="cargando">cargando...</p>
                        <ul v-else>
                          <li v-for="message in messages">
                            <b>
                              ({{ fechaAString(message.date) }})
                              <template v-if="message.userId !== user.id">
                                <router-link :to="`/usuario/${message.userId}`">
                                  {{ message.displayName }}
                                </router-link> 
                              </template>
                              <template v-else>
                                {{ message.displayName }}
                              </template>
                                  dijo: </b>
                            {{ message.message }}
                          </li>
                        </ul>
                    </div>
                </div>
              </div>
            
        </div>
    
    <div id="output"></div>
  </div>
</template>