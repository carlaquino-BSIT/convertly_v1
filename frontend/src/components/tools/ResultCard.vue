<template>
    <div v-if="fileUrl" class="rounded-2xl border border-white/10 bg-white/[0.02] p-5 animate-[fadeIn_.3s_ease]">
        <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10">
                <Icon icon="lucide:file-check" class="text-xl text-white/80" />
            </div>

            <div>
                <p class="text-sm font-medium text-white">Conversion Complete</p>

                <p class="mt-1 text-xs text-white/40">{{ fileName }}</p>
            </div>
        </div>
        <a :href="fileUrl" :download="fileName"
            class="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-[10px] font-bold uppercase tracking-[0.15em] text-black transition hover:-translate-y-1">
            <Icon icon="lucide:download" />
            Download File
        </a>
        <button @click="$emit('reset')"
            class="mt-3 flex h-10 w-full items-center justify-center rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 transition hover:border-white/30 hover:text-white">
            Start New Conversion
        </button>

    </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
    fileUrl: {
        type: String,
        default: null,
    },

    fileName: {
        type: String,
        default: "converted-file",
    },
});

const emit = defineEmits([
    "reset"
])
</script>


<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
