<template>
    <q-card class="col-xs-12 col-sm-6">
        <q-card-section>
            <div class="text-h6 text-center">Cambiar Configuración</div>
        </q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <q-card-section class="q-gutter-y-sm">
                <q-toggle
                    v-model="form.open"
                    color="green"
                    :label="`${form.open ? 'Abierto' : 'Cerrado'}`"
                />
                <q-input v-model="form.name" type="text" label="Nombre" />
                <q-input v-model="form.address" type="text" label="Dirección" />
                <q-select v-model="form.currency" :options="['USD', 'CUP']" label="Moneda" />
                <q-input v-model="form.email" type="email" label="Email" />
                <q-input v-model="form.phone" type="tel" label="Teléfono 1" />
                <q-input v-model="form.phone_extra" type="tel" label="Teléfono 2" />
            </q-card-section>
            <q-card-actions>
                <q-btn
                    text-color="dark"
                    :loading="loading"
                    color="primary"
                    type="submit"
                    label="Actualizar"
                />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, onBeforeMount } from 'vue';
import { useMeta, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { uiHelper } from 'src/helpers';
import { IConfig, injectStrict, shopInjectionKey } from 'src/modules';
/**
 * ConfigForm
 */
export default defineComponent({
    name: 'ConfigForm',

    setup() {
        const $q = useQuasar();
        const $router = useRouter();
        const { errorHandler } = uiHelper($q, $router);
        const $shop = injectStrict(shopInjectionKey);
        onBeforeMount(() => {
            $shop.getConfig().then((_r) => {
                form.value = _r;
            }).catch(_e => { errorHandler(_e, 'No se pudo obtener la configuración') })
        })
        /**
         * -----------------------------------------
         *	Data
         * -----------------------------------------
         */
        const config = computed(() => $shop.config);
        const form = ref<IConfig>({
            address: '',
            currency: 'CUP',
            email: '',
            name: '',
            open: false,
            phone: '',
            phone_extra: ''
        });
        const loading = ref(false);
        /**
         * -----------------------------------------
         *	Methods
         * -----------------------------------------
         */
        function onSubmit() {
            loading.value = true;
            $shop.updateConfig(form.value)
                .then((_r) => {
                    $q.notify({
                        icon: 'mdi-check',
                        message: 'Configuración actualizada',
                        position: 'center',
                        type: 'positive',
                        actions: [
                            { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
                        ]
                    });
                    useMeta({
                        title: _r.name
                    });
                })
                .catch(_e => { console.log(_e); errorHandler(_e, 'No se pudo actualizar la configuración') }).finally(() => { loading.value = false })
        }

        return {
            config, form, loading, onSubmit
        }
    }
});
</script>