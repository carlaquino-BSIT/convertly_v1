<template>
    <div
        class="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
    >
        <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
            <Icon :icon="icon" class="text-2xl text-white/70 transition group-hover:text-white" />
        </div>

        <h3 class="mt-6 text-lg font-semibold">{{ title }}</h3>

        <p class="mt-3 text-sm leading-6 text-white/50">{{ description }}</p>
    </div>
</template>

<script setup>
    import { Icon } from "@iconify/vue";

    defineProps({
        icon: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
    });
</script>
