import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
	el: '#app',
	data() {
		return {
			form: {
				name: '',
				value: '',
				id: '',
			},
			contacts: [],
		};
	},
	methods: {
		createContact() {
			// Деструктуризируем данные при помощи спред оператора
			const { ...contact } = this.form;
			console.log('Date.now() = ', Date.now());
			this.contacts.push({ ...contact, id: Date.now() });
			// Очистим поля формы
			this.form.name = this.form.value = '';
		},
		markContact(id) {
			console.log('mark = ', id);
		},
		deleteContact(id) {
			console.log('delete = ', id);
		},
	},
});
