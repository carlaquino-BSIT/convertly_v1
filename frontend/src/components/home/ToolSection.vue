<template>
    <section class="mx-auto max-w-6xl px-5 pb-24 lg:px-8">
        <div class="mb-10">
            <p class="text-[10px] uppercase tracking-[0.35em] text-white/40">Available Tools</p>

            <h2 class="mt-3 text-2xl md:text-3xl font-bold uppercase tracking-[0.15em]">Convert Anything</h2>
        </div>

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

            <ToolCard title="PDF To JPG" description="Convert PDF pages into JPG images." path="/tools/pdf-to-jpg" />

            <ToolCard
                title="JPG To PDF"
                description="Convert multiple images into a PDF document."
                path="/tools/jpg-to-pdf"
            />

            <ToolCard
                title="Word To PDF"
                description="Convert Word documents into PDF files."
                path="/tools/word-to-pdf"
            />
        </div>
    </section>
</template>

<script setup>
    import ToolCard from "../tools/ToolCard.vue";
</script>
