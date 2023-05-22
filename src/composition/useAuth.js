import {onMounted, onUnmounted, ref} from "vue";
import {subscribeToAuth} from "../services/auth.js";

export function useAuth() {
    const user = ref({
        id: null,
        email: null,
    });
    let unsubscribe = () => {}

    onMounted(() => {
        unsubscribe = subscribeToAuth(newUser => user.value = newUser);
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        user,
    }
}
