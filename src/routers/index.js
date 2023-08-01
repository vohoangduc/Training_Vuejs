import { createRouter, createWebHistory } from 'vue-router'
import ListUser from '../components/Admin/ListUser.vue'
import CreateUser from '../components/Admin/CreateUser.vue'

const routes = [
	{
		path: "/create-list",
		name: "user.list",
		component: ListUser,
		meta: {
			breadcrumbName: 'Home',
		},
	}, {
		path: "/create-user",
		name: "user.create",
		component: CreateUser,
		meta: {
			breadcrumbName: 'Home',
		},
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router;