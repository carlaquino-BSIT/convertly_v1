<template>
    <div v-if="totalPages" class="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div class="flex items-center justify-between">
            <p class="text-[10px] uppercase tracking-[0.25em] text-white/40">Select Pages</p>

            <p class="text-[10px] text-white/40">{{ selectedPages.length }}/{{ totalPages }}</p>
        </div>

        <div class="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
            <button
                v-for="page in totalPages"
                :key="page"
                @click="togglePage(page)"
                class="flex h-12 items-center justify-center rounded-xl border text-xs transition"
                :class="
                    selectedPages.includes(page)
                    ?
                    'border-white bg-white text-black'
                    :
                    'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30'
                "
            >
                Page {{ page }}
            </button>
        </div>

        <button @click="selectAll" class="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white">
            Select All Pages
        </button>
    </div>
</template>

<script setup>
    import { computed } from "vue";

    const props = defineProps({
        totalPages: {
            type: Number,
            default: 0,
        },

        modelValue: {
            type: Array,
            default: () => [],
        },
    });

    const emit = defineEmits(["update:modelValue"]);

    const selectedPages = computed(() => {
        return props.modelValue;
    });

    const togglePage = (page) => {
        let pages = [...selectedPages.value];

        if (pages.includes(page)) {
            pages = pages.filter((item) => item !== page);
        } else {
            pages.push(page);
        }

        emit("update:modelValue", pages);
    };

    const selectAll = () => {
        const pages = [];

        for (let i = 1; i <= props.totalPages; i++) {
            pages.push(i);
        }

        emit("update:modelValue", pages);
    };
</script>
