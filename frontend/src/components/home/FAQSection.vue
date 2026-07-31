<template>
    <section class="relative mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <!-- DIVIDER -->
        <div class="absolute top-0 left-5 right-5 h-px bg-zinc-800 lg:left-8 lg:right-8"></div>

        <!-- HEADER -->

        <div class="mb-12">
            <p class="text-[10px] uppercase tracking-[0.35em] text-white/40">FAQ</p>

            <h2 class="mt-3 text-2xl md:text-3xl font-bold uppercase tracking-[0.15em]">Frequently Asked Questions</h2>

            <p class="mt-4 max-w-xl text-sm leading-6 text-white/50">Everything you need to know about Convertly.</p>
        </div>

        <!-- FAQ LIST -->

        <div class="mx-auto max-w-3xl space-y-4">
            <div
                v-for="(item,index) in faqs"
                :key="index"
                class="rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
                <!-- QUESTION -->

                <button
                    @click="toggle(index)"
                    class="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                    <span class="text-sm font-medium text-white"> {{ item.question }} </span>

                    <Icon
                        icon="lucide:chevron-down"
                        class="shrink-0 text-white/50 transition-transform duration-300"
                        :class="open === index ? 'rotate-180' : ''"
                    />
                </button>

                <!-- ANSWER -->

                <div v-if="open === index" class="border-t border-white/10 px-5 py-4 text-sm leading-6 text-white/50">
                    {{ item.answer }}
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref } from "vue";
    import { Icon } from "@iconify/vue";

    const open = ref(null);

    const faqs = [
        {
            question: "Is Convertly free to use?",
            answer: "Yes. Convertly provides free file conversion tools without requiring an account.",
        },

        {
            question: "Are my files safe?",
            answer: "Your files are processed securely and are not stored longer than necessary.",
        },

        {
            question: "What file formats are supported?",
            answer: "Convertly supports common document, image, and file formats with more tools coming soon.",
        },

        {
            question: "Do I need to create an account?",
            answer: "No. You can start converting files immediately without registration.",
        },

        {
            question: "Can I use Convertly on mobile?",
            answer: "Yes. Convertly is designed to work smoothly on desktop, tablet, and mobile devices.",
        },
    ];

    const toggle = (index) => {
        open.value = open.value === index ? null : index;
    };
</script>
