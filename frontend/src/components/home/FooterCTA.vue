<template>
    <section class="relative mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <!-- DIVIDER -->
        <div class="absolute top-0 left-5 right-5 h-px bg-zinc-800 lg:left-8 lg:right-8"></div>

        <!-- CTA CARD -->

        <div
            class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-14 text-center sm:px-12"
        >
            <!-- Glow -->

            <div class="absolute inset-x-0 top-0 mx-auto h-32 max-w-md bg-white/5 blur-3xl"></div>

            <div class="relative">
                <p class="text-[10px] uppercase tracking-[0.35em] text-white/40">Start Converting</p>

                <h2 class="mt-4 text-3xl sm:text-4xl font-bold uppercase tracking-[0.15em] leading-tight">
                    Ready To Convert
                    <br />

                    <span class="text-white/40"> Your Files? </span>
                </h2>

                <p class="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/50">
                    Upload your files and experience fast, simple, and free conversion tools.
                </p>

                <!-- BUTTON -->

                <button
                    class="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-7 text-[10px] font-bold uppercase tracking-[0.15em] text-black transition hover:-translate-y-1"
                >
                    <Icon icon="lucide:upload-cloud" />

                    Start Converting
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { Icon } from "@iconify/vue";
</script>
