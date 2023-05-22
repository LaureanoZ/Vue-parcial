<script setup>
import AppButton from "../components/AppButton.vue";
import AppTextarea from "../components/AppTextarea.vue";
import AppLabel from "../components/AppLabel.vue";
import AppInput from "../components/AppInput.vue";
</script>

<template>
   <header class="jumbotron jumbotron-fluid mt-5">
    <div class="container text-center">
      <h1 class="display-3 dm-font">¡Bienvenido a <span class="text-nowrap">Dos Magos!</span></h1>
      <p class="lead">Descubre el asombro de la magia en nuestros espectáculos únicos.</p>
      <router-link class="btn btn-primary btn-lg" to="/shows">Ver Shows</router-link>
    </div>
  </header>

  <section class="bg-light py-5">
    <div class="container text-center">
      <h2 class="mb-4">Galería</h2>
      <div class="row">
        <div class="col-md-4 mb-4">
          <img src="../resources/imgs/galeria-1.png" class="img-fluid" alt="Imagen 1">
        </div>
        <div class="col-md-4 mb-4">
          <img src="../resources/imgs/galeria-2.png" class="img-fluid" alt="Imagen 2">
        </div>
        <div class="col-md-4 mb-4">
          <img src="../resources/imgs/galeria-3.png" class="img-fluid" alt="Imagen 3">
        </div>
      </div>
    </div>
  </section>

  <section class="container py-5">
    <h2 class="text-center mb-4">Contáctanos</h2>
    <div class="row">
      <div class="col-md-6 mb-4">
        <form>
          <div class="form-group">
            <AppLabel for="nombre">Nombre</AppLabel>
            <AppInput type="text" class="form-control" id="nombre"/>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <AppInput type="email" class="form-control" id="email"/>
          </div>
          <div class="form-group">
            <AppLabel for="mensaje">Mensaje</AppLabel>
            <AppTextarea class="form-control" id="mensaje" rows="5"></AppTextarea>
          </div>
          <AppButton type="submit" class="btn btn-primary col-12 mt-2">Enviar</AppButton>
        </form>
      </div>
      <div class="col-md-6">
        <p>Para más información, contáctanos a través de los siguientes medios:</p>
        <ul class="list-unstyled">
          <li><strong>Teléfono:</strong> +123456789</li>
          <li><strong>Email:</strong> info@dosmagos.com</li>
          <li><strong>Dirección:</strong> Calle Principal, Ciudad Mágica</li>
        </ul>
      </div>
    </div>
  </section>

</template>