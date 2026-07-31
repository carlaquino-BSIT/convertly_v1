<template>
    <div v-if="pages.length" class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <button
            v-for="page in pages"
            :key="page.number"
            @click="togglePage(page.number)"
            class="overflow-hidden rounded-xl border bg-white/[0.02] transition"
            :class="
                selectedPages.includes(page.number)
                ?
                'border-white ring-1 ring-white'
                :
                'border-white/10 opacity-50'
            "
        >
            <img v-if="page.image" :src="page.image" class="h-40 w-full object-contain bg-white" />

            <div v-else class="flex h-40 items-center justify-center text-xs text-black bg-white/80">Loading...</div>

            <div class="py-3 text-[10px] uppercase tracking-[0.2em] text-white/50">Page {{ page.number }}</div>
        </button>
    </div>
</template>

<script setup>
    const props = defineProps({
        pages: {
            type: Array,
            default: () => [],
        },

        selectedPages: {
            type: Array,
            default: () => [],
        },
    });

    const emit = defineEmits(["update:selectedPages"]);

    const togglePage = (page) => {
        let updated = [...props.selectedPages];

        if (updated.includes(page)) {
            updated = updated.filter((item) => item !== page);
        } else {
            updated.push(page);
        }

        emit("update:selectedPages", updated);
    };
</script>
