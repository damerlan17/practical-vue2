const { createApp } = Vue;

createApp({
    data() {
        return {
            columns: [
                { id: 1, title: 'Столбец 1 (макс 3)' },
                { id: 2, title: 'Столбец 2 (макс 5)' },
                { id: 3, title: 'Столбец 3 (без лимита)' }
            ]
        }
    }
}).mount('#app');