<template>
    <div>
        <router-view />
    </div>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import { appInjectionKey, appStore, shopInjectionKey, shopStore } from 'src/modules';
/**
 * App
 */
export default defineComponent({
    name: 'App',
    setup() {
        provide(appInjectionKey, appStore);
        provide(shopInjectionKey, shopStore);
    },
});
</script>
