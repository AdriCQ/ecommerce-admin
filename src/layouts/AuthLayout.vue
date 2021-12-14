<template>
  <q-layout view="hHh lpR lFf">
    <q-page-container>
      <div class="auth-layout">
        <q-page class="row justify-center items-center">
          <q-card flat class="rounded-borders">
            <router-view />
          </q-card>
        </q-page>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthLayout',
});
</script>

<style lang="scss" scoped>
.auth-layout {
  max-width: 980px;
  margin: 0 auto;
}
</style>
