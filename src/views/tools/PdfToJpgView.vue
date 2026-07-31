<template>
    <ToolLayout
        title="PDF To JPG"
        description="Convert selected PDF pages into JPG images."
        :formats="['PDF']"
        :loading="loading"
        @convert="convertPDF"
    >
        <template #upload>
            <UploadBox ref="uploadBox" :multiple="false" @files-selected="setFiles" />

            <div v-if="fileName" class="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p class="text-sm text-white">{{ fileName }}</p>

                <p class="mt-1 text-xs text-white/40">{{ totalPages }} pages</p>
            </div>

            <div v-if="previewImages.length" class="mt-6">
                <div class="mb-4 flex gap-3">
                    <button
                        @click="selectAllPages"
                        class="flex-1 rounded-xl border border-white/10 py-3 text-[10px] uppercase tracking-widest text-white/50 hover:text-white"
                    >
                        Select All
                    </button>

                    <button
                        @click="clearPages"
                        class="flex-1 rounded-xl border border-white/10 py-3 text-[10px] uppercase tracking-widest text-white/50 hover:text-white"
                    >
                        Clear
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-for="image in previewImages"
                        :key="image.page"
                        @click="togglePage(image.page)"
                        class="overflow-hidden rounded-xl border transition"
                        :class="
                        selectedPages.includes(image.page)
                        ? 'border-white'
                        : 'border-white/10 opacity-50'
                        "
                    >
                        <img :src="image.url" class="w-full" />

                        <div class="p-3">
                            <p class="text-xs text-white">Page {{ image.page }}</p>

                            <p class="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                                {{ selectedPages.includes(image.page) ? "Selected" : "Excluded" }}
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </template>

        <template #result>
            <ResultCard :file-url="downloadUrl" :file-name="convertedFile" @reset="resetConversion" />
        </template>
    </ToolLayout>
</template>

<script setup>
    import { ref } from "vue";

    import JSZip from "jszip";

    import * as pdfjsLib from "pdfjs-dist";
    import { GlobalWorkerOptions } from "pdfjs-dist";
    import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

    import ToolLayout from "../../components/tools/ToolLayout.vue";
    import UploadBox from "../../components/tools/UploadBox.vue";
    import ResultCard from "../../components/tools/ResultCard.vue";

    GlobalWorkerOptions.workerSrc = pdfWorker;

    const files = ref([]);

    const uploadBox = ref(null);

    const loading = ref(false);

    const downloadUrl = ref(null);

    const convertedFile = ref("");

    const fileName = ref("");

    const totalPages = ref(0);

    const previewImages = ref([]);

    const selectedPages = ref([]);

    const setFiles = async (uploadedFiles) => {
        files.value = uploadedFiles;

        const file = uploadedFiles[0];

        if (!file) {
            return;
        }

        fileName.value = file.name;

        const bytes = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
            data: bytes,
        }).promise;

        totalPages.value = pdf.numPages;

        previewImages.value = [];

        selectedPages.value = [];

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);

            const viewport = page.getViewport({
                scale: 1,
            });

            const canvas = document.createElement("canvas");

            const context = canvas.getContext("2d");

            canvas.width = viewport.width;

            canvas.height = viewport.height;

            await page.render({
                canvasContext: context,

                viewport,
            }).promise;

            previewImages.value.push({
                page: i,

                url: canvas.toDataURL("image/jpeg", 0.9),
            });

            selectedPages.value.push(i);
        }
    };

    const togglePage = (page) => {
        if (selectedPages.value.includes(page)) {
            selectedPages.value = selectedPages.value.filter((p) => p !== page);
        } else {
            selectedPages.value.push(page);
        }
    };

    const selectAllPages = () => {
        selectedPages.value = previewImages.value.map((item) => item.page);
    };

    const clearPages = () => {
        selectedPages.value = [];
    };

    const convertPDF = async () => {
        if (!selectedPages.value.length) {
            alert("Please select pages.");

            return;
        }

        loading.value = true;

        try {
            const zip = new JSZip();

            previewImages.value
                .filter((image) => selectedPages.value.includes(image.page))
                .forEach((image) => {
                    const base64 = image.url.split(",")[1];

                    zip.file(
                        `page-${image.page}.jpg`,

                        base64,

                        {
                            base64: true,
                        }
                    );
                });

            const blob = await zip.generateAsync({
                type: "blob",
            });

            downloadUrl.value = URL.createObjectURL(blob);

            convertedFile.value = "pdf-images.zip";
        } catch (error) {
            console.log(error);

            alert("Conversion failed.");
        } finally {
            loading.value = false;
        }
    };

    const resetConversion = () => {
        if (uploadBox.value) {
            uploadBox.value.clearFiles();
        }

        files.value = [];

        downloadUrl.value = null;

        convertedFile.value = "";

        fileName.value = "";

        totalPages.value = 0;

        previewImages.value = [];

        selectedPages.value = [];
    };
</script>
