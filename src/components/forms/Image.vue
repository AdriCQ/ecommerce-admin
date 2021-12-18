<template>
    <q-card>
        <q-card-section class="row q-gutter-y-sm q-gutter-x-sm">
            <!-- <q-img
                :src="`${baseURL}${imageKey % 2 === 0 ? '' : 'lol'}${product.image}`"
                spinner-color="primary"
                spinner-size="50px"
                width="8rem"
                :key="imageKey"
            />-->
            <q-uploader
                :factory="factoryFn"
                label="Cambiar Imagen Principal"
                accept="image/*"
                @factory-failed="factoryFail"
                @failed="factoryFail"
                @uploaded="onUploaded"
            />
        </q-card-section>
    </q-card>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRefs } from 'vue';
import { baseURL } from 'src/boot/axios';
import { IProduct, injectStrict, userInjectionKey, } from 'src/modules';
import { LooseDictionary, useQuasar } from 'quasar';

export default defineComponent({
    name: 'Imagesproduct',
    emits: ['update-product'],
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required: true
        }
    },
    setup($props, $ctx) {
        const { product } = toRefs($props);
        const $user = injectStrict(userInjectionKey);
        const $q = useQuasar();
        // const $shop = injectStrict(shopInjectionKey);
        /**
         * -----------------------------------------
         *	Data
         * -----------------------------------------
         */
        const imageKey = ref(0);

        function factoryFn() {
            imageKey.value++;
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        url: `${baseURL}/api/products/${product.value.id as number}/main-image`,
                        method: 'POST',
                        headers: [
                            {
                                name: 'Authorization',
                                value: `Bearer ${$user.apiToken as string}`,
                            },
                        ],
                        fieldName: 'image',
                    });
                }, 200);
            });
        }
        function onUploaded(_resp: { files: unknown[]; xhr: LooseDictionary }) {
            const xmlHttpReq = (_resp.xhr as XMLHttpRequest);
            if (xmlHttpReq.response && (xmlHttpReq.response as IProduct).id) {
                $ctx.emit('update-product', xmlHttpReq.response);
            }
            $q.notify({
                message: 'Imagen Actualizada',
                type: 'positive',
                position: 'center',
                actions: [
                    { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
                ]
            })
        }
        function factoryFail(p: unknown) { console.log(p) }
        return {
            ...$props, baseURL,
            // Methods
            factoryFn, factoryFail, onUploaded
        }
    }
});
</script>