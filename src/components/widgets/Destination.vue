<template>
    <q-card>
        <q-card-section>
            <div class="text-h6">{{ destination.name }}</div>
            <div class="text-subtitle2">{{ Number(destination.price).toFixed(2) }}</div>
        </q-card-section>
    </q-card>
</template>

<script lang='ts'>
import { IDestination } from 'src/modules';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'DestinationWidget',
    props: {
        destination: {
            type: Object as PropType<IDestination>,
            required: true
        }
    }
});
</script>