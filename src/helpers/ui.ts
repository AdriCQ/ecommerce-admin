import { AxiosError } from 'axios';
import { QVueGlobals } from 'quasar';
import { Router } from 'vue-router';
import { ErrorData } from 'src/types';
import { ROUTE_NAME } from 'src/router';
import { userStore } from 'src/modules';
/**
 * UI Helper
 * @param $q 
 * @returns  
 */
export function uiHelper($q: QVueGlobals, $router?: Router) {
    /**
     * Deletes dialog
     * @param _config 
     */
    function deleteDialog(_config: { title?: string, message: string, onOk: CallableFunction }) {
        $q.dialog({
            title: _config.title,
            message: _config.message,
            ok: true,
            cancel: true

        }).onOk(() => { _config.onOk() })
    }
    /**
     * errorHandler
     * @param _error 
     */
    function errorHandler(_error?: AxiosError<ErrorData>, _default = 'Ha ocurrido un error') {
        console.log({ _error })
        if (_error && _error.response && _error.response.data) {
            if (_error.response.status === 401) {
                // Show notification
                $q.notify({
                    type: 'warning',
                    icon: 'mdi-account-off',
                    message: 'Necesita iniciar sesión o registrarse',
                    position: 'center'
                });
                userStore.logout();
                if ($router) void $router.push({ name: ROUTE_NAME.LOGIN });
            } else {
                // Show notification
                // $q.notify({
                //     type: 'negative',
                //     icon: 'mdi-alert-circle-outline',
                //     message: _error.response.data.message,
                //     position: 'center'
                // });
                $q.notify({
                    type: 'negative',
                    icon: 'mdi-alert-circle-outline',
                    message: _default,
                    position: 'center'
                });
            }
        } else {
            $q.notify({
                type: 'negative',
                icon: 'mdi-alert-circle-outline',
                message: _default,
                position: 'center'
            });
        }
    }
    return {
        errorHandler, deleteDialog
    }
}