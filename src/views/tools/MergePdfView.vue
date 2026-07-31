<template>
    <ToolLayout title="Merge PDF" description="Combine multiple PDF files into one document quickly and easily."
        :formats="['PDF']" :loading="loading" @convert="mergePDF">
        <!-- UPLOAD AREA -->
        <template #upload>
            <UploadBox 
            ref="uploadBox"
            @files-selected="setFiles" />
        </template>

        <!-- RESULT AREA -->
        <template #result>
            <ResultCard :file-url="downloadUrl" :file-name="convertedFile" @reset="resetConversion" />
        </template>
    </ToolLayout>
</template>


<script setup>
import { ref } from "vue";
import { PDFDocument } from "pdf-lib";
import { Icon } from "@iconify/vue"

import ToolLayout from "../../components/tools/ToolLayout.vue";
import UploadBox from "../../components/tools/UploadBox.vue";
import ResultCard from "../../components/tools/ResultCard.vue";

const uploadBox = ref(null)
const files = ref([])

const loading = ref(false)

const downloadUrl = ref(null)

const convertedFile = ref("")

const setFiles = (uploaded) => {
    files.value = uploaded;
};

const mergePDF = async () => {
    if (files.value.length < 2) {
        alert("Please upload at least 2 PDF files.");
        return;
    }

    loading.value = true;

    try {
        // temporary loading demo
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mergedPdf = await PDFDocument.create();

        for (const file of files.value) {
            const bytes = await file.arrayBuffer();

            const pdf = await PDFDocument.load(bytes);

            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

            pages.forEach((page) => {
                mergedPdf.addPage(page);
            });
        }

        const output = await mergedPdf.save();

        const blob = new Blob([output], {
            type: "application/pdf",
        });

        downloadUrl.value = URL.createObjectURL(blob);

        convertedFile.value = "merged-file.pdf";
    } finally {
        loading.value = false;
    }
};

const resetConversion = () => {


    if(uploadBox.value){

        uploadBox.value.clearFiles()

    }


    files.value = []

    downloadUrl.value = null

    convertedFile.value = ""


}
</script>
