<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="row q-col-gutter-sm">
                    <q-card
                        class="col-xs-12 col-sm-6 col-md-3 col-lg-2 text-grey-9 text-center cursor-pointer"
                        style="max-height: 6rem;"
                    >
                        <q-card-section @click="addProduct">
                            <div class="text-h6">
                                <q-icon name="mdi-plus" size="md" />
                            </div>
                            <div class="text-subtitle2">Nuevo Producto</div>
                        </q-card-section>
                    </q-card>
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
import { ROUTE_NAME } from 'src/router';

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

        function addProduct() {
            void $router.push({ name: ROUTE_NAME.PRODUCT_EDIT, params: { id: 0 } })
        }

        return {
            products, addProduct
        }
    }
});
</script>