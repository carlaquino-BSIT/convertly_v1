import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import MergePdfView from "../views/tools/MergePdfView.vue";
import SplitPdfView from "../views/tools/SplitPdfView.vue";
import CompressPdfView from "../views/tools/CompressPdfView.vue";
import PdfToJpgView from "../views/tools/PdfToJpgView.vue";
import JpgToPdfView from "../views/tools/JpgToPdfView.vue";
import WordToPdfView from "../views/tools/WordToPdfView.vue";




const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tools/merge-pdf",
      name: "merge-pdf",
      component: MergePdfView,
    },
    {
      path: "/tools/split-pdf",
      name: "split-pdf",
      component: SplitPdfView,
    },
    {
      path: "/tools/compress-pdf",
      name: "compress-pdf",
      component: CompressPdfView,
    },
    {
      path: "/tools/pdf-to-jpg",
      name: "pdf-to-jpg",
      component: PdfToJpgView,
    },
     {
      path: "/tools/jpg-to-pdf",
      name: "jpg-to-pdf",
      component: JpgToPdfView,
    },
    {
  path: "/tools/word-to-pdf",
  name: "word-to-pdf",
  component: WordToPdfView,
},
    
  ],
    scrollBehavior() {

        return {
            top: 0,
            left: 0
        }

    }
});

export default router;
