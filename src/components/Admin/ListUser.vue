<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px">Add</a-button>
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.id)" />
            <check-outlined class="editable-cell-icon-check" @click="save(record.id)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.id)">
          <button danger>Delete</button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import client from "../../utils/axios-comont";
import { useToast } from "../../utils/toast";
const toast = useToast();

interface DataItem {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
}

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Phone',
    dataIndex: 'phone',
  }, ,
  {
    title: 'Actions',
    dataIndex: 'operation',
  },
];
const dataSource: Ref<DataItem[]> = ref([]);
const count = computed(() => dataSource.value.length + 1);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (id: string) => {
  editableData[id] = cloneDeep(dataSource.value.filter(item => id === item.id)[0]);
};
const save = (id: string) => {
  Object.assign(dataSource.value.filter(item => id === item.id)[0], editableData[id]);
  delete editableData[id];
};

const onDelete = (id: string) => {

  client.delete(`/admin/delete/${id}`).then(({ data }) => {
    dataSource.value = dataSource.value.filter(item => item.id !== id);

    toast.success(data.message);
  });

};
// const handleAdd = () => {
//   const newData = {
//     key: `${count.value}`,
//     name: `Edward King ${count.value}`,
//     age: 32,
//     address: `London, Park Lane no. ${count.value}`,
//     address: `London, Park Lane no. ${count.value}`,
//   };
//   dataSource.value.push(newData);
// };

const fetchPokemon = () => {
  try {
    client
      .get(`/admin/list-user`)
      .then(({ data }) => {
        data.data.map((item: any, index: any) => {
          dataSource.value.push({
            ...item,
            key: index + 1
          })
        })
      });
  } catch (err) {
    console.log(err);
  }
};

fetchPokemon();
</script>
<style scoped>
.editable-cell {
  position: relative;

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
  