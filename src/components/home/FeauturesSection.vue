<template>
    <section class="relative mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <!-- DIVIDER -->
        <div class="absolute top-0 left-5 right-5 h-px bg-zinc-800 lg:left-8 lg:right-8"></div>

        <!-- HEADER -->
        <div class="mb-12">
            <p class="text-[10px] uppercase tracking-[0.35em] text-white/40">Why Convertly</p>

            <h2 class="mt-3 text-2xl md:text-3xl font-bold uppercase tracking-[0.15em]">Built For Simplicity</h2>

            <p class="mt-4 max-w-xl text-sm leading-6 text-white/50">
                Convert files quickly with a simple, secure, and user-friendly experience.
            </p>
        </div>

        <!-- FEATURES GRID -->

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
                icon="lucide:zap"
                title="Fast Conversion"
                description="Process your files quickly with optimized conversion tools."
            />

            <FeatureCard
                icon="lucide:shield-check"
                title="Private & Secure"
                description="Your files are handled safely without unnecessary accounts."
            />

            <FeatureCard
                icon="lucide:badge-check"
                title="Free Forever"
                description="Access essential conversion tools without any subscription."
            />

            <FeatureCard
                icon="lucide:files"
                title="Multiple Formats"
                description="Support documents, images, and different file types."
            />

            <FeatureCard
                icon="lucide:monitor-smartphone"
                title="Works Everywhere"
                description="Use Convertly on desktop, tablet, and mobile devices."
            />

            <FeatureCard
                icon="lucide:smile"
                title="Simple Experience"
                description="Clean interface designed for everyone."
            />
        </div>
    </section>
</template>

<script setup>
    import FeatureCard from "../FeatureCard.vue";
</script>
