<template>
    <header
        class="fixed inset-x-0 top-0 z-[9999] border-b border-white/10 bg-black/90 backdrop-blur-xl supports-[backdrop-filter]:bg-black/70"
    >
        <nav class="mx-auto flex min-h-[64px] w-full max-w-6xl items-center justify-between px-5 lg:px-8">
            <!-- LOGO -->

            <a @click="goTo('home')" class="flex cursor-pointer items-center gap-3 group">
                <div
                    class="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center overflow-hidden rounded-md transition duration-300 group-hover:opacity-80"
                >
                    <img :src="logo" alt="Convertly Logo" class="h-full w-full object-contain" />
                </div>

                <div class="leading-tight">
                    <h1 class="text-[11px] font-semibold uppercase tracking-[0.25em] text-white">Convertly</h1>

                    <p class="text-[8px] uppercase tracking-[0.25em] text-gray-500">Free Converter</p>
                </div>
            </a>

            <!-- DESKTOP NAV -->

            <ul
                class="hidden items-center gap-6 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 md:flex"
            >
                <li>
                    <a @click="goTo('tools')" class="cursor-pointer transition hover:text-white"> Tools </a>
                </li>

                <li>
                    <a @click="goTo('features')" class="cursor-pointer transition hover:text-white"> Features </a>
                </li>

                <li>
                    <a @click="goTo('about')" class="cursor-pointer transition hover:text-white"> About </a>
                </li>

                <li class="border-l border-white/10 pl-6 normal-case tracking-normal text-white/30">
                    Created by Carl Angelo Aquino
                </li>
            </ul>

            <!-- MOBILE BUTTON -->

            <div class="flex items-center md:hidden">
                <button @click="mobileMenu = !mobileMenu" class="text-2xl text-white">
                    <Icon
                        :icon="
                        mobileMenu
                        ? 'ri:close-line'
                        : 'ri:menu-3-line'
                        "
                    />
                </button>
            </div>
        </nav>

        <!-- MOBILE MENU -->

        <transition name="mobile">
            <div v-if="mobileMenu" class="border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden">
                <div class="space-y-6 px-5 py-6 text-[11px] uppercase tracking-[0.18em] text-gray-400">
                    <a @click="goTo('tools')" class="block cursor-pointer hover:text-white"> Tools </a>

                    <a @click="goTo('features')" class="block cursor-pointer hover:text-white"> Features </a>

                    <a @click="goTo('about')" class="block cursor-pointer hover:text-white"> About </a>

                    <p class="border-t border-white/10 pt-5 text-[10px] normal-case tracking-normal text-white/30">
                        Created by Carl Angelo Aquino
                    </p>
                </div>
            </div>
        </transition>
    </header>
</template>

<script setup>
    import { ref } from "vue";

    import { Icon } from "@iconify/vue";

    import logo from "../../assets/logo.png";

    const mobileMenu = ref(false);

    const goTo = (id) => {
        const el = document.getElementById(id);

        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        mobileMenu.value = false;
    };
</script>

<style scoped>
    .mobile-enter-active,
    .mobile-leave-active {
        transition: all 0.25s ease;
    }

    .mobile-enter-from,
    .mobile-leave-to {
        opacity: 0;

        transform: translateY(-10px);
    }
</style>
