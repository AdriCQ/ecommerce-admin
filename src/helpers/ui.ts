import { AxiosError } from 'axios';
import { QVueGlobals } from 'quasar';
import { Router } from 'vue-router';
import { ErrorData } from 'src/types';
import { ROUTE_NAME } from 'src/router';

/**
 * UI Helper
 * @param $q 
 * @returns  
 */
export function uiHelper($q: QVueGlobals, $router?: Router) {
    /**
     * errorHandler
     * @param _error 
     */
    function errorHandler(_error?: AxiosError<ErrorData>, _default = 'Ha ocurrido un error') {
        if (_error && _error.response && _error.response.data) {
            if (_error.response.status === 401) {
                // Show notification
                $q.notify({
                    type: 'warning',
                    icon: 'mdi-account-off',
                    message: 'Necesita iniciar sesión o registrarse',
                    position: 'center'
                });
                if ($router) void $router.push({ name: ROUTE_NAME.LOGIN });
            } else {
                // Show notification
                $q.notify({
                    type: 'negative',
                    icon: 'mdi-alert-circle-outline',
                    message: _error.response.data.message,
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
        errorHandler
    }
}