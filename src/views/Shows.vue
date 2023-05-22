<script setup>
import { getDataFirestore } from "../services/show.js";
import { ref, onMounted } from "vue";
import AppButton from "../components/AppButton.vue";

const shows = ref([]);

onMounted(async () => {
  shows.value = await getDataFirestore();
});
</script>
<template>
  <!-- Sección de Shows -->
  <section class="container py-5">
    <h1 class="text-center mb-4 dm-font">Nuestros Shows</h1>
    <article class="row"
    >
      <div class="col-md-4 mb-4"     
      v-for="show in shows">
        <div class="card">
          <img :src="`/src/resources/imgs/${show.image}.png`" class="card-img-top img-card" :alt="show.title" />
          <div class="card-body">
            <h2 class="card-title">{{ show.title }}</h2>
            <p class="card-text">{{ show.description }}</p>
            <p class="card-text">Precio: ${{ show.price }}</p>
            <AppButton>Adquirir</AppButton>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
