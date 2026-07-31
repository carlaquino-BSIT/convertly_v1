<template>
    <ToolLayout
        title="JPG To PDF"
        description="Convert multiple images into a single PDF document."
        :formats="['JPG', 'PNG']"
        :loading="loading"
        @convert="convertToPDF"
    >
        <template #upload>
            <UploadBox
                ref="uploadBox"
                :multiple="true"
                accept="image/jpeg,image/png"
                label="JPG / PNG"
                @files-selected="setFiles"
            />

            <div v-if="files.length" class="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p class="text-sm text-white">{{ files.length }} images selected</p>
            </div>

            <!-- IMAGE PREVIEW -->

            <div v-if="previews.length" class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div
                    v-for="(image,index) in previews"
                    :key="index"
                    class="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
                >
                    <img :src="image.url" class="h-32 w-full object-cover" />

                    <p class="truncate px-3 py-2 text-[10px] text-white/50">{{ image.name }}</p>
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

    import { PDFDocument } from "pdf-lib";

    import ToolLayout from "../../components/tools/ToolLayout.vue";

    import UploadBox from "../../components/tools/UploadBox.vue";

    import ResultCard from "../../components/tools/ResultCard.vue";

    const files = ref([]);

    const previews = ref([]);

    const loading = ref(false);

    const downloadUrl = ref(null);

    const convertedFile = ref("");

    const uploadBox = ref(null);

    const setFiles = async (uploadedFiles) => {
        files.value = uploadedFiles;

        previews.value = [];

        for (const file of uploadedFiles) {
            const url = URL.createObjectURL(file);

            previews.value.push({
                name: file.name,

                url,
            });
        }
    };

    const convertToPDF = async () => {
        if (!files.value.length) {
            alert("Please upload images.");

            return;
        }

        loading.value = true;

        try {
            const pdf = await PDFDocument.create();

            for (const file of files.value) {
                const bytes = await file.arrayBuffer();

                let image;

                if (file.type === "image/jpeg") {
                    image = await pdf.embedJpg(bytes);
                } else {
                    image = await pdf.embedPng(bytes);
                }

                const page = pdf.addPage([image.width, image.height]);

                page.drawImage(image, {
                    x: 0,

                    y: 0,

                    width: image.width,

                    height: image.height,
                });
            }

            const output = await pdf.save();

            const blob = new Blob([output], {
                type: "application/pdf",
            });

            downloadUrl.value = URL.createObjectURL(blob);

            convertedFile.value = "converted-images.pdf";
        } catch (error) {
            console.log(error);

            alert("Conversion failed.");
        } finally {
            loading.value = false;
        }
    };

    const resetConversion = () => {
        files.value = [];

        previews.value = [];

        downloadUrl.value = null;

        convertedFile.value = "";

        if (uploadBox.value) {
            uploadBox.value.clearFiles();
        }
    };
</script>
