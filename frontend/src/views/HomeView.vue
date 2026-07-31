<template>
    <div class="min-h-screen bg-black text-white">


        <main class="pt-5">

            <HeroSection />
            <AboutSection />


            <ToolsSection />

            <FeaturesSection />

            <FAQSection />

            <FooterCTA />


        </main>

    </div>
</template>

<script setup>
import HeroSection from "../components/home/HeroSection.vue"
import AboutSection from "../components/home/AboutSection.vue"
import ToolsSection from "../components/home/ToolSection.vue"
import FeaturesSection from "../components/home/FeauturesSection.vue"
import FAQSection from "../components/home/FAQSection.vue"
import FooterCTA from "../components/home/FooterCTA.vue"



</script>