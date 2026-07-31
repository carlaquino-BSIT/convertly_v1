<template>
    <div
        @click="goToTool"
        class="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-1"
    >
        <p class="text-[10px] uppercase tracking-[0.3em] text-white/40">Tool</p>

        <div class="mt-4 flex items-center justify-between">
            <h3 class="text-xl font-semibold">{{ title }}</h3>

            <Icon icon="lucide:arrow-up-right" class="text-white/30 transition group-hover:text-white" />
        </div>

        <p class="mt-3 text-sm leading-6 text-white/50">{{ description }}</p>

        <div class="mt-5 text-[10px] uppercase tracking-[0.25em] text-white/30 transition group-hover:text-white/70">
            Open Tool
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { Icon } from "@iconify/vue";

    const router = useRouter();

    const props = defineProps({
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        path: {
            type: String,
            required: true,
        },
    });

    const goToTool = () => {
        router.push(props.path);
    };
</script>
