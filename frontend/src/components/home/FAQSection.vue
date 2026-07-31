<template>
    <section id="faq" class="relative overflow-hidden border-b border-white/10 bg-black text-white">
        <div class="mx-auto max-w-6xl px-5 py-24 lg:px-8">
            <!-- DIVIDER -->

            <div class="absolute top-0 left-5 right-5 h-px bg-white/10 lg:left-8 lg:right-8"></div>

            <!-- HEADER -->

            <div class="max-w-3xl mb-12">
                <p class="text-[10px] uppercase tracking-[0.35em] text-white/40">FAQ</p>

                <h2 class="mt-5 text-3xl md:text-5xl font-bold uppercase tracking-[0.08em] leading-tight">
                    Frequently Asked

                    <br />

                    <span class="text-white/40"> Questions. </span>
                </h2>

                <p class="mt-8 text-sm md:text-base leading-8 text-white/50">
                    Everything you need to know about Convertly and how our file conversion tools work.
                </p>
            </div>

            <!-- FAQ LIST -->

            <div class="max-w-3xl space-y-4">
                <div
                    v-for="(item,index) in faqs"
                    :key="index"
                    class="rounded-2xl border border-white/10 bg-white/[0.02] transition duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                >
                    <!-- QUESTION -->

                    <button
                        @click="toggle(index)"
                        class="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    >
                        <span class="text-sm font-medium text-white"> {{ item.question }} </span>

                        <Icon
                            icon="lucide:chevron-down"
                            class="shrink-0 text-white/40 transition-transform duration-300"
                            :class="open === index ? 'rotate-180' : ''"
                        />
                    </button>

                    <!-- ANSWER -->

                    <div
                        v-if="open === index"
                        class="border-t border-white/10 px-6 py-5 text-sm leading-7 text-white/50"
                    >
                        {{ item.answer }}
                    </div>
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
            answer: "Yes. Convertly provides free file conversion tools without requiring an account or registration.",
        },

        {
            question: "Are my files safe?",
            answer: "Files are processed only for conversion purposes. Convertly focuses on a simple and privacy-friendly workflow.",
        },

        {
            question: "What file formats are supported?",
            answer: "Convertly supports common document and image formats, with additional conversion tools planned for future releases.",
        },

        {
            question: "Do I need to create an account?",
            answer: "No. You can access available conversion tools immediately without creating an account.",
        },

        {
            question: "Can I use Convertly on mobile devices?",
            answer: "Yes. Convertly is designed to provide a smooth experience across desktop, tablet, and mobile devices.",
        },
    ];

    const toggle = (index) => {
        open.value = open.value === index ? null : index;
    };
</script>
