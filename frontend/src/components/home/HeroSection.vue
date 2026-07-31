<template>
    <section
        id="home"
        class="relative min-h-screen flex items-center overflow-hidden bg-black text-white border-b border-white/10"
    >
        <!-- CONTENT -->

        <div class="relative z-10 mx-auto max-w-6xl w-full px-5 py-20 lg:px-8">
            <div class="text-center">
                <!-- LABEL -->

                <p class="text-[10px] uppercase tracking-[0.35em] text-white/40">File Conversion Platform</p>

                <!-- TITLE -->

                <h1 class="mt-5 text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-[0.05em] leading-[1.05]">
                    Convert Your

                    <br />

                    <span class="text-white/40"> Files Easily </span>
                </h1>

                <!-- DESCRIPTION -->

                <p class="mx-auto mt-6 max-w-xl text-xs sm:text-sm md:text-base leading-7 text-white/50">
                    Simple, fast and private file conversion tools. Convert documents, images, and more without creating
                    an account.
                </p>

                <!-- ACTIONS -->

                <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <button @click="goTo('tools')"
                        class="flex h-11 items-center gap-2 rounded-xl bg-white px-7 text-[10px] font-bold uppercase tracking-[0.15em] text-black transition hover:-translate-y-1 hover:bg-zinc-100"
                    >
                        <Icon icon="ri:upload-cloud-2-line" class="text-sm" />

                        Start Converting
                    </button>
                </div>

                <!-- TRUST -->

                <div class="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4">
                    <div class="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                        <Icon icon="lucide:zap" class="text-white/70" />

                        Fast
                    </div>

                    <div class="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                        <Icon icon="ri:shield-check-line" class="text-white/70" />

                        Secure
                    </div>

                    <div class="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                        <Icon icon="ri:price-tag-3-line" class="text-white/70" />

                        Free
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { Icon } from "@iconify/vue";
    
const goTo = (section) => {
    const element = document.getElementById(section);

    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
        });
    }
};
</script>
