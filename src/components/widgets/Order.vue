<template>
    <q-card class="text-grey-9">
        <q-card-section>
            <div class="text-body2">
                <q-icon name="mdi-account" />
                {{ order.name }}
            </div>
            <div class="text-body2">
                <q-icon name="mdi-email-outline" />
                {{ order.email }}
            </div>
            <div class="text-body2">
                <q-icon name="mdi-phone" />
                {{ order.phone }}
            </div>
            <div class="text-body2">
                <q-icon name="mdi-map-marker" />
                {{ order.address }}
            </div>
            <div class="text-body2 text-bold">
                <q-icon name="mdi-cash-usd" />
                ${{ Number(order.total_price).toFixed(2) }}
            </div>
        </q-card-section>
        <q-card-section>
            <q-card
                class="no-shadow-box"
                bordered
                v-for="(op, opKey) in order.order_products"
                :key="`order-product-${opKey}`"
            >
                <q-card-section class="q-py-xs">
                    <div class="text-body2">
                        <q-chip class="glossy" :label="`x${op.qty}`" />
                        {{ op.product.name }}
                    </div>
                </q-card-section>
            </q-card>
        </q-card-section>
    </q-card>
</template>

<script lang='ts'>
import { IOrder } from 'src/modules';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'OrderWidget',
    props: {
        order: {
            type: Object as PropType<IOrder>,
            required: true
        }
    }
});
</script>