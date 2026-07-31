<template>
    <section id="tools" class="relative overflow-hidden border-b border-white/10 bg-black text-white">
        <div class="mx-auto max-w-6xl px-5 py-24 lg:px-8">
            <!-- HEADER -->

            <div class="max-w-3xl mb-12">
                <!-- LABEL -->

                <p class="text-[10px] uppercase tracking-[0.35em] text-white/40">Available Tools</p>

                <!-- TITLE -->

                <h2 class="mt-5 text-3xl md:text-5xl font-bold uppercase tracking-[0.08em] leading-tight">
                    Convert Your

                    <br />

                    <span class="text-white/40"> Files Easily. </span>
                </h2>

                <!-- DESCRIPTION -->

                <p class="mt-8 text-sm md:text-base leading-8 text-white/50">
                    Simple conversion tools designed to help you transform your files quickly and efficiently without
                    complicated steps or unnecessary registrations.
                </p>
            </div>

            <!-- TOOLS GRID -->

            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <ToolCard
                    title="Merge PDF"
                    description="Combine multiple PDF files into one document."
                    path="/tools/merge-pdf"
                />

                <ToolCard
                    title="Split PDF"
                    description="Extract selected pages from your PDF files."
                    path="/tools/split-pdf"
                />

                <ToolCard
                    title="Compress PDF"
                    description="Reduce PDF file size while keeping quality."
                    path="/tools/compress-pdf"
                />

                <ToolCard
                    title="PDF To JPG"
                    description="Convert PDF pages into JPG images."
                    path="/tools/pdf-to-jpg"
                />

                <ToolCard
                    title="JPG To PDF"
                    description="Convert images into PDF documents."
                    path="/tools/jpg-to-pdf"
                />

                <!-- WORD TO PDF UNDER DEVELOPMENT -->

                <div class="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 opacity-60">
                    <!-- STATUS -->

                    <div class="absolute right-5 top-5">
                        <span
                            class="rounded-full border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/40"
                        >
                            Under Development
                        </span>
                    </div>

                    <!-- CONTENT -->

                    <h3 class="text-sm font-bold uppercase tracking-[0.15em]">Word To PDF</h3>

                    <p class="mt-3 text-sm leading-6 text-white/40">Convert Word documents into PDF files.</p>

                    <p class="mt-6 text-[10px] uppercase tracking-[0.25em] text-white/30">Coming Soon</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { Icon } from "@iconify/vue";

    import ToolCard from "../tools/ToolCard.vue";
</script>
