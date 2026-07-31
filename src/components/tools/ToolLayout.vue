<template>
    <section class="min-h-screen bg-black px-5 pt-32 pb-24 text-white lg:px-8">
        <div class="mx-auto max-w-4xl">
            <!-- HEADER -->

            <div class="text-center">
                <p class="text-[10px] uppercase tracking-[0.35em] text-white/40">Convertly Tool</p>

                <h1 class="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.15em]">{{ title }}</h1>

                <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/50">{{ description }}</p>
            </div>

            <!-- TOOL BOX -->

            <div class="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <!-- SLOT FOR UPLOAD -->

                <slot name="upload"> </slot>
                <div class="mt-6">

                    <slot name="result"></slot>

                </div>

                <!-- DEFAULT ACTION -->

                <button @click="$emit('convert')" :disabled="loading"
                    class="mt-8 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-[10px] font-bold uppercase tracking-[0.15em] text-black transition hover:-translate-y-1 disabled:opacity-50">
                    <template v-if="!loading">
                        <Icon icon="lucide:wand-2" />

                        Convert File
                    </template>

                    <template v-else>
                        <Icon icon="lucide:loader-circle" class="animate-spin" />

                        Processing...
                    </template>
                </button>

            </div>

            <!-- SUPPORTED -->

            <div class="mt-8 text-center">
                <p class="text-[10px] uppercase tracking-[0.3em] text-white/30">Supported Formats</p>

                <div class="mt-4 flex flex-wrap justify-center gap-3">
                    <span v-for="format in formats" :key="format"
                        class="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-[10px] uppercase tracking-widest text-white/50">
                        {{ format }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({

    title: {
        type: String,
        required: true,
    },


    description: {
        type: String,
        required: true,
    },


    formats: {
        type: Array,
        default: () => [],
    },


    loading: {
        type: Boolean,
        default: false,
    }

});
</script>
