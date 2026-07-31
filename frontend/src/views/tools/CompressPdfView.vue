<template>
  <ToolLayout title="Compress PDF" description="Reduce PDF file size while keeping good quality." :formats="['PDF']"
    :loading="loading" @convert="compressPDF">
    <template #upload>
      <UploadBox ref="uploadBox" :multiple="false" @files-selected="setFiles" />

      <div v-if="fileName" class="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p class="text-sm text-white">{{ fileName }}</p>
        <p class="mt-1 text-xs text-white/40">Original size: {{ originalSize }}</p>
      </div>
    </template>

   <template #result>
    <div v-if="compressedSize" class="mb-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div class="flex justify-between">
            <div>
                <p class="text-[10px] uppercase tracking-widest text-white/40">Original</p>

                <p class="mt-1 text-sm text-white">{{ originalSize }}</p>
            </div>

            <div>
                <p class="text-[10px] uppercase tracking-widest text-white/40">Compressed</p>

                <p class="mt-1 text-sm text-white">{{ compressedSize }}</p>
            </div>
        </div>

        <div class="mt-5 border-t border-white/10 pt-4 text-center">
            <p class="text-[10px] uppercase tracking-widest text-white/40">Reduced</p>

            <p class="mt-1 text-lg font-bold text-white">{{ savedPercentage }}%</p>
        </div>
    </div>

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

const uploadBox = ref(null);

const loading = ref(false);

const downloadUrl = ref(null);

const convertedFile = ref("");

const fileName = ref("");

const originalSize = ref("");

const compressedSize = ref("");

const savedPercentage = ref(0);
const setFiles = (uploadedFiles) => {
  files.value = uploadedFiles;

  const file = uploadedFiles[0];

  if (!file) {
    return;
  }

  fileName.value = file.name;

  originalSize.value = (file.size / 1024 / 1024).toFixed(2) + " MB";
};

const compressPDF = async () => {
  if (!files.value.length) {
    alert("Please upload a PDF file.");

    return;
  }

  loading.value = true;

  try {
    const file = files.value[0];

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const output = await pdf.save({
      useObjectStreams: true,
    });

    const blob = new Blob([output], {
      type: "application/pdf",
    });

    downloadUrl.value = URL.createObjectURL(blob);

    convertedFile.value = "compressed-file.pdf";

    compressedSize.value = (blob.size / 1024 / 1024).toFixed(2) + " MB";

    const original =
      file.size;


    const compressed =
      blob.size;


    savedPercentage.value =
      Math.max(
        0,
        Math.round(
          ((original - compressed) / original) * 100
        )
      );
  } catch (error) {
    console.log(error);

    alert("Compression failed.");
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

  originalSize.value = "";

  compressedSize.value = "";
};
</script>
