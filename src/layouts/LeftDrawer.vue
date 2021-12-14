<template>
    <q-drawer
        :model-value="sidebarOpen"
        @update:model-value="updateSidebarOpen"
        show-if-above
        side="left"
        :width="280"
    >
        <!-- profile -->
        <div class="text-center q-mt-md gt-xs">
            <div class="text-grey-9 text-body1">Hola, Usuario</div>
        </div>
        <!-- / profile -->

        <!-- list -->
        <div class="q-gutter-sm q-mt-md">
            <q-list class="rounded-borders" style="max-width: 350px">
                <!-- Mis Pedidos -->
                <q-item clickable v-ripple>
                    <q-item-section avatar top>
                        <q-avatar
                            size="md"
                            icon="mdi-cart-outline"
                            color="primary"
                            text-color="dark"
                        />
                    </q-item-section>

                    <q-item-section class="text-grey-9">
                        <q-item-label lines="1">Pedidos</q-item-label>
                    </q-item-section>
                </q-item>
                <!-- / Mis Pedidos -->
                <q-item clickable v-ripple>
                    <q-item-section avatar top>
                        <q-avatar size="md" icon="mdi-cube" color="primary" text-color="dark" />
                    </q-item-section>

                    <q-item-section class="text-grey-9">
                        <q-item-label lines="1">Productos</q-item-label>
                    </q-item-section>
                </q-item>
                <!-- Mis Marcadores -->
                <q-item clickable v-ripple :to="{ name: ROUTE_NAME.DESTINATIONS }">
                    <q-item-section avatar top>
                        <q-avatar
                            size="md"
                            icon="mdi-map-marker-outline"
                            color="primary"
                            text-color="dark"
                        />
                    </q-item-section>

                    <q-item-section class="text-grey-9">
                        <q-item-label lines="1">Destinos</q-item-label>
                    </q-item-section>
                </q-item>

                <!-- Profile -->
                <q-item clickable v-ripple>
                    <q-item-section avatar top>
                        <q-avatar size="md" icon="mdi-wrench" color="primary" text-color="dark" />
                    </q-item-section>

                    <q-item-section class="text-grey-9">
                        <q-item-label lines="1">Ajustes</q-item-label>
                    </q-item-section>
                </q-item>
                <!-- / Profile -->
            </q-list>
        </div>
        <!-- / list -->
    </q-drawer>
</template>

<script lang='ts'>
import { appInjectionKey, injectStrict } from 'src/modules';
import { computed, defineComponent } from 'vue';
import { ROUTE_NAME } from 'src/router';
/**
 * ClientDrawer
 */
export default defineComponent({
    name: 'LeftDrawer',
    setup() {
        // Init Store
        const App = injectStrict(appInjectionKey);
        // const User = injectStrict(userInjectionKey);
        // Data
        const sidebarOpen = computed(() => App.leftDrawer);
        // const userName = computed(() => User.profile.name);
        /**
         * -----------------------------------------
         *	Methods
         * -----------------------------------------
         */
        /**
         * updateSidebarOpen
         */
        function updateSidebarOpen(_open: boolean) { App.leftDrawer = _open }

        return {
            // Data
            sidebarOpen, ROUTE_NAME,
            // Methods
            updateSidebarOpen
        }
    },
});
</script>