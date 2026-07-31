<template>

  <div class="min-h-screen bg-black text-white">

    <Navbar />

    <main class="">

      <RouterView />

    </main>

    <Footer />

  </div>

</template>


<script setup>

import Navbar from "./components/layout/Navbar.vue"
import Footer from "./components/layout/Footer.vue"

</script>