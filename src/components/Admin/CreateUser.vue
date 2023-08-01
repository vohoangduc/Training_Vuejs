<template>
    <a-form class="form-create-user" :model="formState" v-bind="layout" name="nest-messages"
        :validate-messages="validateMessages" @finish="onFinish">
        <a-form-item :name="['user', 'name']" label="Name User" :rules="[{ required: true }]">
            <a-input v-model:value="formState.user.name" />
        </a-form-item>
        <a-form-item :name="['user', 'email']" label="Email" :rules="[{ required: true }]">
            <a-input v-model:value="formState.user.email" />
        </a-form-item>
        <a-form-item :name="['user', 'age']" label="Age" :rules="[{ type: 'number', min: 0, max: 99 }]">
            <a-input-number v-model:value="formState.user.age" />
        </a-form-item>
        <a-form-item :name="['user', 'phone']" label="Phone number">
            <a-input v-model:value="formState.user.phone" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import client from '../../utils/axios-comont';
import { useRouter } from 'vue-router';
const router = useRouter()

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const formState = reactive({
    user: {
        name: '',
        email: '',
        age: undefined,
        phone: '',
    },
});
const onFinish = (values: any) => {

    client.post("/admin/create-user", values.user).then(() => {
        router.push({
            name: "user.list"
        })
    })
};
</script>

<style>
.form-create-user {
    width: 100vh;
}
</style>
    