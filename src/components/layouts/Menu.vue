<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="handleClick">
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="userList">List</a-menu-item>
          <a-menu-item key="userCreate">Create</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="teamList">List</a-menu-item>
          <a-menu-item key="teamCreate">Create</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', height: 'auto' }">
          <div class="container">
            <router-view></router-view>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import type { MenuProps } from 'ant-design-vue';
const router = useRouter()
import { ref } from 'vue';
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
const handle = {
  userList: () => router.push({
    name: "user.list"
  }),
  userCreate: () => router.push({
    name: "user.create"
  })
}
const handleClick: MenuProps['onClick'] = e => {
  handle[e.key]?.()
};

const titleClick = (e: Event) => {
  console.log('titleClick', e);
};
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
