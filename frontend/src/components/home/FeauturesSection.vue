<template>
    <section id="features" class="relative overflow-hidden border-b border-white/10 bg-black text-white">
        <div class="mx-auto max-w-6xl px-5 py-24 lg:px-8">
        

            <!-- HEADER -->

            <div class="max-w-3xl mb-12">
                <p class="text-[10px] uppercase tracking-[0.35em] text-white/40">Why Convertly</p>

                <h2 class="mt-5 text-3xl md:text-5xl font-bold uppercase tracking-[0.08em] leading-tight">
                    Built For

                    <br />

                    <span class="text-white/40"> Simplicity. </span>
                </h2>

                <p class="mt-8 text-sm md:text-base leading-8 text-white/50">
                    Convert files with a clean, fast, and reliable experience designed for everyday document tasks.
                </p>
            </div>

            <!-- FEATURES GRID -->

            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                    icon="lucide:zap"
                    title="Fast Conversion"
                    description="Quickly transform your files with efficient conversion processes."
                />

                <FeatureCard
                    icon="lucide:shield-check"
                    title="Private & Secure"
                    description="Your files are processed safely with privacy in mind."
                />

                <FeatureCard
                    icon="lucide:badge-check"
                    title="Free To Use"
                    description="Access essential conversion tools without subscriptions."
                />

                <FeatureCard
                    icon="lucide:files"
                    title="Multiple Formats"
                    description="Convert documents, images, and different file types easily."
                />

                <FeatureCard
                    icon="lucide:monitor-smartphone"
                    title="Every Device"
                    description="Enjoy a smooth experience across desktop, tablet, and mobile."
                />

                <FeatureCard
                    icon="lucide:sparkles"
                    title="Simple Interface"
                    description="A clean design that keeps file conversion effortless."
                />
            </div>
        </div>
    </section>
</template>

<script setup>
    import FeatureCard from "../FeatureCard.vue";
</script>
