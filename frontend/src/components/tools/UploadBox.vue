<template>
    <div class="w-full">
        <!-- DROP AREA -->

        <div
            @dragover.prevent="dragging = true"
            @dragleave.prevent="dragging = false"
            @drop.prevent="handleDrop"
            @click="openFile"
            class="relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-8 transition"
            :class="
                dragging
                ? 'border-white bg-white/[0.05]'
                : 'border-white/10 bg-white/[0.02] hover:border-white/30'
            "
        >
            <Icon icon="lucide:upload-cloud" class="text-4xl text-white/40" />

            <h3 class="mt-5 text-sm font-semibold uppercase tracking-[0.15em]">Drop your files here</h3>

            <p class="mt-2 text-xs text-white/40">or click to browse files</p>

            <p class="mt-4 text-[10px] uppercase tracking-[0.25em] text-white/30">Supported: {{ label }}</p>

            <input ref="fileInput" type="file" hidden :multiple="multiple" :accept="accept" @change="handleFiles" />
        </div>

        <!-- FILE LIST -->

        <div v-if="files.length" class="mt-6 space-y-3">
            <div
                v-for="(file,index) in files"
                :key="index"
                class="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
            >
                <div class="flex items-center gap-3">
                    <div class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10">
                        <Icon icon="lucide:file" class="text-white/60" />
                    </div>

                    <div>
                        <p class="max-w-[180px] truncate text-xs text-white">{{ file.name }}</p>

                        <p class="mt-1 text-[10px] text-white/40">{{ formatSize(file.size) }}</p>
                    </div>
                </div>

                <button @click.stop="removeFile(index)" class="text-white/40 transition hover:text-white">
                    <Icon icon="lucide:x" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { Icon } from "@iconify/vue";

    const props = defineProps({
        multiple: {
            type: Boolean,
            default: true,
        },

        accept: {
            type: String,
            default: ".pdf",
        },

        label: {
            type: String,
            default: "PDF",
        },
    });

    const emit = defineEmits(["files-selected"]);

    const fileInput = ref(null);

    const files = ref([]);

    const dragging = ref(false);

    const openFile = () => {
        fileInput.value?.click();
    };

    const handleFiles = (event) => {
        addFiles(event.target.files);

        // para makapili ulit ng parehong file
        event.target.value = "";
    };

    const handleDrop = (event) => {
        dragging.value = false;

        addFiles(event.dataTransfer.files);
    };

    const addFiles = (selected) => {
        const newFiles = Array.from(selected);

        if (!newFiles.length) {
            return;
        }

        if (props.multiple) {
            files.value.push(...newFiles);
        } else {
            files.value = [newFiles[0]];
        }

        emit("files-selected", files.value);
    };

    const removeFile = (index) => {
        files.value.splice(index, 1);

        emit("files-selected", files.value);
    };

    const formatSize = (size) => {
        if (size < 1024) {
            return size + " B";
        }

        if (size < 1024 * 1024) {
            return (size / 1024).toFixed(1) + " KB";
        }

        return (size / (1024 * 1024)).toFixed(1) + " MB";
    };

    const clearFiles = () => {
        files.value = [];

        if (fileInput.value) {
            fileInput.value.value = "";
        }

        emit("files-selected", []);
    };

    defineExpose({
        clearFiles,
    });
</script>

