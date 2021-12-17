<template>
    <q-page padding>
        <q-card style="max-width: 30rem;">
            <q-card-section class="text-grey-9">
                <div class="text-h6">Configuración</div>
                <div class="text-subtitle2">Modifique la configuración del sitio</div>
            </q-card-section>
            <q-card-section>
                <q-card>
                    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
                        <q-card-section class="q-gutter-y-sm">
                            <q-toggle
                                v-model="form.open"
                                color="green"
                                :label="`${form.open ? 'Abierto' : 'Cerrado'}`"
                            />
                            <q-input v-model="form.name" type="text" label="Nombre" />
                            <q-input v-model="form.address" type="text" label="Dirección" />
                            <q-select
                                v-model="form.currency"
                                :options="['USD', 'CUP']"
                                label="Moneda"
                            />
                            <q-input v-model="form.email" type="email" label="Email" />
                            <q-input v-model="form.phone" type="tel" label="Teléfono 1" />
                            <q-input v-model="form.phone_extra" type="tel" label="Teléfono 2" />
                        </q-card-section>
                        <q-card-actions>
                            <q-btn
                                :loading="loading"
                                color="primary"
                                type="submit"
                                label="Actualizar"
                            />
                        </q-card-actions>
                    </q-form>
                </q-card>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { uiHelper } from 'src/helpers';
import { IConfig, injectStrict, shopInjectionKey } from 'src/modules';
/**
 * ConfigPage
 */
export default defineComponent({
    name: 'ConfigPage',
    setup() {
        const $q = useQuasar();
        const $router = useRouter();
        const { errorHandler } = uiHelper($q, $router);
        const $shop = injectStrict(shopInjectionKey);
        onBeforeMount(() => {
            $shop.getConfig().then((_r) => {
                form.value = _r;
            }).catch(_e => { errorHandler(_e, 'No se pudo obtener la configuracion') })
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
                .then(() => {
                    $q.notify({
                        icon: 'mdi-check',
                        message: 'Configuracion actualizada',
                        position: 'center',
                        type: 'positive'
                    })
                })
                .catch(_e => { console.log(_e); errorHandler(_e, 'No se pudo actualizar la configuracion') }).finally(() => { loading.value = false })
        }

        return {
            config, form, loading, onSubmit
        }
    }
});
</script>