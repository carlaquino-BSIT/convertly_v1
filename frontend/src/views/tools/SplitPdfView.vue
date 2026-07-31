<template>
  <ToolLayout title="Split PDF" description="Separate selected PDF pages into individual files." :formats="['PDF']"
    :loading="loading" @convert="splitPDF">
    <!-- UPLOAD -->

    <template #upload>
      <UploadBox ref="uploadBox" :multiple="false" @files-selected="setFiles" />
      <div v-if="totalPages" class="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-white">{{ fileName }}</p>

            <p class="mt-1 text-xs text-white/40">{{ fileSize }} · {{ totalPages }} pages</p>
          </div>

          <div class="text-right">
            <p class="text-[10px] uppercase tracking-widest text-white/40">Selected</p>

            <p class="text-sm text-white">{{ selectedPages.length }}/{{ totalPages }}</p>
          </div>
        </div>
      </div>

      <div class="mt-4 flex gap-3">
        <button @click="selectAllPages"
          class="flex-1 rounded-xl border border-white/10 py-3 text-[10px] uppercase tracking-widest text-white/50 hover:text-white">
          Select All
        </button>

        <button @click="clearPages"
          class="flex-1 rounded-xl border border-white/10 py-3 text-[10px] uppercase tracking-widest text-white/50 hover:text-white">
          Clear
        </button>
      </div>


      <PdfPreview :pages="previewPages" :selectedPages="selectedPages" @update:selectedPages="selectedPages = $event" />
    </template>

    <!-- RESULT -->

    <template #result>
      <ResultCard :file-url="downloadUrl" :file-name="convertedFile" @reset="resetConversion" />
    </template>
  </ToolLayout>
</template>

<script setup>
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { ref, nextTick } from "vue"

import * as pdfjsLib from "pdfjs-dist"
import { GlobalWorkerOptions } from "pdfjs-dist"
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url"

GlobalWorkerOptions.workerSrc = pdfWorker

import ToolLayout from "../../components/tools/ToolLayout.vue";
import UploadBox from "../../components/tools/UploadBox.vue";
import ResultCard from "../../components/tools/ResultCard.vue";
import PageSelector from "../../components/tools/PageSelector.vue";
import PdfPreview from "../../components/tools/PdfPreview.vue";

const files = ref([]);

const uploadBox = ref(null)

const fileName = ref("")

const fileSize = ref("")

const previewPages = ref([])

const loading = ref(false);

const downloadUrl = ref(null);

const convertedFile = ref("");

const totalPages = ref(0);

const selectedPages = ref([]);

const progress = ref(0)

const progressText = ref("")

const setFiles = async (uploadedFiles) => {
  files.value = uploadedFiles;

  const file = uploadedFiles[0];


  if (!file) {
    return;
  }

  fileName.value = file.name

  fileSize.value =
    (file.size / 1024 / 1024).toFixed(2) + " MB"

  const bytes = await file.arrayBuffer();

  // pdf-lib para sa page count

  const pdf = await PDFDocument.load(bytes);

  totalPages.value = pdf.getPageCount();

  selectedPages.value = [];

  for (let i = 1; i <= totalPages.value; i++) {
    selectedPages.value.push(i);
  }

  // PDF.JS PREVIEW

  const pdfDocument = await pdfjsLib.getDocument({
    data: bytes,
  }).promise;

  previewPages.value = [];

  for (let i = 1; i <= totalPages.value; i++) {
    const page = await pdfDocument.getPage(i);

    const viewport = page.getViewport({
      scale: 0.6,
    });

    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d");

    canvas.width = viewport.width;

    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,

      viewport,
    }).promise;

    previewPages.value.push({
      number: i,

      image: canvas.toDataURL(),
    });
  }
};


const splitPDF = async () => {
  if (!files.value.length) {
    alert("Please upload a PDF file.");

    return;
  }

  if (!selectedPages.value.length) {
    alert("Please select pages.");

    return;
  }

  loading.value = true;

  try {
    const file = files.value[0];

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const zip = new JSZip();

    // for (const pageNumber of selectedPages.value) {
    //   const newPdf = await PDFDocument.create();

    //   const [page] = await newPdf.copyPages(pdf, [pageNumber - 1]);

    //   newPdf.addPage(page);

    //   const output = await newPdf.save();

    //   zip.file(`page-${pageNumber}.pdf`, output);
    // }

    for (
      let index = 0;
      index < selectedPages.value.length;
      index++
    ) {

      const pageNumber = selectedPages.value[index]


      progressText.value =
        `Creating page ${index + 1} / ${selectedPages.value.length}`


      progress.value =
        Math.round(
          ((index + 1) /
            selectedPages.value.length) * 100
        )


      await nextTick()


      const newPdf = await PDFDocument.create()


      const [page] = await newPdf.copyPages(
        pdf,
        [pageNumber - 1]
      )


      newPdf.addPage(page)


      const output = await newPdf.save()


      zip.file(
        `page-${pageNumber}.pdf`,
        output
      )

    }


    const zipBlob = await zip.generateAsync({
      type: "blob",
    });

    downloadUrl.value = URL.createObjectURL(zipBlob);

    convertedFile.value = "split-pages.zip";
  } catch (error) {
    console.log(error);

    alert("Split failed.");
  } finally {
    loading.value = false
  }
  progress.value = 0
  progressText.value = "Preparing PDF..."
};

const selectAllPages = () => {
  selectedPages.value = [];

  for (let i = 1; i <= totalPages.value; i++) {
    selectedPages.value.push(i);
  }
};

const clearPages = () => {
  selectedPages.value = [];
};

const resetConversion = () => {

  files.value = []

  downloadUrl.value = null

  convertedFile.value = ""

  totalPages.value = 0

  selectedPages.value = []

  previewPages.value = []

  fileName.value = ""

  fileSize.value = ""

  progress.value = 0

  progressText.value = ""

  if(uploadBox.value){
    uploadBox.value.clearFiles()
}

}
</script>
