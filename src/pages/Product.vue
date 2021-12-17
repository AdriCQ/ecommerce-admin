<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="row q-col-gutter-sm">
                    <div
                        class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
                        v-for="(product, pKey) in products"
                        :key="`prod-${pKey}`"
                    >
                        <product-widget :product="product" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent, onBeforeMount, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { injectStrict, shopInjectionKey } from 'src/modules';
import { uiHelper } from 'src/helpers';

/**
 * ProductPage
 */
export default defineComponent({
    name: 'ProductPage',
    components: {
        'product-widget': defineAsyncComponent(() => import('src/components/widgets/Product.vue'))
    },
    setup() {
        const $q = useQuasar();
        const $router = useRouter();
        const { errorHandler } = uiHelper($q, $router);
        const $shop = injectStrict(shopInjectionKey);

        onBeforeMount(() => {
            $shop.listProductsAction().catch(_e => { errorHandler(_e, 'No se encontraron productos') })
        });

        const products = computed(() => $shop.products);

        return {
            products
        }
    }
});
</script>