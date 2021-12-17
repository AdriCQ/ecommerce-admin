<template>
    <q-card class="text-grey-9">
        <q-img
            :src="`${baseURL}${product.image}`"
            :ratio="4 / 3"
            spinner-color="primary"
            spinner-size="50px"
        >
            <div class="absolute-bottom-right" style="padding:0px; background-color: transparent">
                <q-chip text-color="grey-9" icon="mdi-package-variant" :label="product.stock" />
            </div>
            <div class="absolute-top-left" style="padding:0px; background-color: transparent">
                <q-chip
                    text-color="dark"
                    clickable
                    @click="edit"
                    icon="mdi-pencil-box-outline"
                    label="Editar"
                />
            </div>
        </q-img>
        <q-card-section>
            <div class="text-body1">{{ product.name }}</div>
            <div class="text-caption text-bold">${{ Number(product.price).toFixed(2) }}</div>
        </q-card-section>
        <q-card-section>
            <div class="text-caption" v-html="product.description"></div>
        </q-card-section>
    </q-card>
</template>

<script lang='ts'>
import { IProduct } from 'src/modules';
import { ROUTE_NAME } from 'src/router';
import { defineComponent, PropType, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { baseURL } from 'src/boot/axios';

export default defineComponent({
    name: 'ProductWidget',
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required: true
        }
    },
    setup(props) {
        const $router = useRouter();
        const { product } = toRefs(props)

        function edit() {
            if (product.value.id) {
                void $router.push({
                    name: ROUTE_NAME.PRODUCT_EDIT,
                    params: { id: product.value.id }
                })
            }
        }
        return {
            ...props, edit, baseURL
        }
    }
});
</script>