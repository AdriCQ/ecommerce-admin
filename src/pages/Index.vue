<template>
    <q-page padding>
        <q-card class="text-grey-9">
            <q-card-section>
                <div class="row q-col-gutter-sm">
                    <div
                        v-for="(order, oKey) in orders"
                        :key="`order-${oKey}`"
                        class="col-xs-12 col-sm-3"
                    >
                        <order-widget :order="order" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { uiHelper } from 'src/helpers';
import { useRouter } from 'vue-router';
import { injectStrict, shopInjectionKey } from 'src/modules';
import { defineAsyncComponent, defineComponent, onBeforeMount, computed } from 'vue';
/**
 * PageIndex
 */
export default defineComponent({
    name: 'PageIndex',
    components: {
        'order-widget': defineAsyncComponent(() => import('src/components/widgets/Order.vue'))
    },
    setup() {
        const $shop = injectStrict(shopInjectionKey);
        const $router = useRouter();
        const $q = useQuasar();
        const { errorHandler } = uiHelper($q, $router);

        onBeforeMount(() => {
            $shop.listOrderAction().catch(_e => { errorHandler(_e, 'Error actualizando las órdenes') });
        });
        /**
         * -----------------------------------------
         *	Data
         * -----------------------------------------
         */
        const orders = computed(() => $shop.orders);

        return {
            orders
        }
    }
});
</script>
