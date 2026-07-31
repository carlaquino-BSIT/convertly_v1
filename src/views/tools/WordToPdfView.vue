<template>
    <ToolLayout
        title="Word To PDF"
        description="Convert Word documents into PDF files."
        :formats="['DOCX']"
        :loading="loading"
        @convert="convertToPDF"
    >
        <template #upload>
            <UploadBox ref="uploadBox" :multiple="false" accept=".docx" label="DOCX" @files-selected="setFiles" />

            <div v-if="fileName" class="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p class="text-sm text-white">{{ fileName }}</p>

                <p class="mt-1 text-xs text-white/40">{{ fileSize }}</p>
            </div>
        </template>

        <template #result>
            <ResultCard :file-url="downloadUrl" :file-name="convertedFile" @reset="resetConversion" />
        </template>
    </ToolLayout>
</template>

<script setup>
    import { ref } from "vue";

    import ToolLayout from "../../components/tools/ToolLayout.vue";
    import UploadBox from "../../components/tools/UploadBox.vue";
    import ResultCard from "../../components/tools/ResultCard.vue";

    const uploadBox = ref(null);

    const files = ref([]);

    const loading = ref(false);

    const downloadUrl = ref(null);

    const convertedFile = ref("");

    const fileName = ref("");

    const fileSize = ref("");

    // FILE UPLOAD

    const setFiles = (uploadedFiles) => {
        files.value = uploadedFiles;

        const file = uploadedFiles[0];

        if (!file) {
            return;
        }

        fileName.value = file.name;

        fileSize.value = (file.size / 1024 / 1024).toFixed(2) + " MB";
    };

    // WORD TO PDF

    const convertToPDF = async () => {
        if (!files.value[0]) {
            alert("Please upload a DOCX file.");

            return;
        }

        loading.value = true;

        try {
            const formData = new FormData();

            formData.append("file", files.value[0]);

            const response = await fetch("http://localhost:3000/convert-word", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Conversion failed");
            }

            const blob = await response.blob();

            downloadUrl.value = URL.createObjectURL(blob);

            convertedFile.value = fileName.value.replace(".docx", ".pdf");
        } catch (error) {
            console.log("CONVERSION ERROR:", error);

            alert("Failed to convert Word to PDF.");
        } finally {
            loading.value = false;
        }
    };

    // RESET

    const resetConversion = () => {
        files.value = [];

        downloadUrl.value = null;

        convertedFile.value = "";

        fileName.value = "";

        fileSize.value = "";

        if (uploadBox.value) {
            uploadBox.value.clearFiles();
        }
    };
</script>
