<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div
                    class="text-h6 text-grey-9"
                >{{ productId === 0 ? 'Crear' : 'Modificar' }} Producto</div>
            </q-card-section>
            <q-list bordered class="rounded-borders">
                <q-expansion-item expand-separator label="Datos del Producto">
                    <product-form :product="product" />
                </q-expansion-item>
                <q-expansion-item expand-separator label="Imágenes">
                    <image-uploader :product="product" @update-product="onImageUpdateProduct" />
                </q-expansion-item>
            </q-list>
        </q-card>
    </q-page>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { injectStrict, IProduct, shopInjectionKey } from 'src/modules';
import { uiHelper } from 'src/helpers';
import { useQuasar } from 'quasar';
/**
 * ProductEditPage
 */
export default defineComponent({
    name: 'ProductEditPage',
    components: {
        'image-uploader': defineAsyncComponent(() => import('src/components/forms/Image.vue')),
        'product-form': defineAsyncComponent(() => import('src/components/forms/UpdateProduct.vue'))
    },
    setup() {
        const $q = useQuasar();
        const $route = useRoute();
        const $router = useRouter();
        const $shopStore = injectStrict(shopInjectionKey);
        const { } = uiHelper($q, $router);

        onBeforeMount(() => {
            productId.value = $route.params && $route.params.id && !isNaN(Number($route.params.id)) ? Number($route.params.id) : 0;
            if (productId.value === 0) {
                product.value = {
                    description: '',
                    image: '',
                    name: '',
                    price: 0,
                    stock: 0,
                    gallery: []
                }
            } else {
                if ($shopStore.findProductById(productId.value)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    product.value = $shopStore.findProductById(productId.value)
                }
            }
        });

        /**
         * -----------------------------------------
         *	Data
         * -----------------------------------------
         */
        const productId = ref(0);
        const product = ref<IProduct>({
            description: '',
            image: '',
            name: '',
            price: 0,
            stock: 0,
            gallery: []
        });
        /**
         * onImageUpdateProduct
         */
        function onImageUpdateProduct(_p: IProduct) {
            $shopStore.updateProduct(Number(_p.id), _p);
        }
        return {
            product, productId,
            onImageUpdateProduct
        }

    }
});
</script>