const { createApp } = Vue;

createApp({
    data() {
        return {
            columns: [
                { id: 1, title: 'Столбец 1 (макс 3)' },
                { id: 2, title: 'Столбец 2 (макс 5)' },
                { id: 3, title: 'Столбец 3 (без лимита)' }
            ],
            cards: [
                { id: 1, title: 'заметка 1', col: 1, items: [
                        { text: 'Пункт 1', completed: false },
                        { text: 'Пункт 2', completed: false },
                        { text: 'Пункт 3', completed: false }
                    ] },
                { id: 2, title: 'заметка 2', col: 2, items: [
                        { text: 'Пункт 1', completed: false },
                        { text: 'Пункт 2', completed: false },
                        { text: 'Пункт 3', completed: false }
                    ] },
                { id: 3, title: 'заметка 3', col: 3, items: [
                        { text: 'Пункт 1', completed: false },
                        { text: 'Пункт 2', completed: false },
                        { text: 'Пункт 3', completed: false }
                    ] },

            ],

        }
    },


    methods: {
        addItem(card) {
            if (card.items.length < 5) {
                card.items.push({ text: '', completed: false });
            }
        },
        removeItem(index, card) {
            if (card.items.length > 3) {
                card.items.splice(3, 1);
            }
        },

    }

}).mount('#app');