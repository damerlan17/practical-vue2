const {createApp} = Vue;

createApp({
    data() {
        return {
            columns: [
                {id: 1, title: 'Столбец 1 (макс 3)'},
                {id: 2, title: 'Столбец 2 (макс 5)'},
                {id: 3, title: 'Столбец 3 (без лимита)'}
            ],
            cards: [
                {
                    id: 1, title: 'заметка 1', col: 1, items: [
                        {text: 'Пункт 1', completed: false},
                        {text: 'Пункт 2', completed: false},
                        {text: 'Пункт 3', completed: false}
                    ]
                },
                {
                    id: 2, title: 'заметка 2', col: 2, items: [
                        {text: 'Пункт 1', completed: false},
                        {text: 'Пункт 2', completed: false},
                        {text: 'Пункт 3', completed: false}
                    ]
                },
                {
                    id: 3, title: 'заметка 3', col: 3, items: [
                        {text: 'Пункт 1', completed: false},
                        {text: 'Пункт 2', completed: false},
                        {text: 'Пункт 3', completed: false}
                    ]
                },

            ],

        }
    },


    methods: {
        addItem(card) {
            if (card.items.length < 5) {
                card.items.push({text: '', completed: false});
                this.checkAndMove(card);
            }
        },
        removeItem(index, card) {
            if (card.items.length > 3) {
                card.items.splice(index, 1);
                this.checkAndMove(card);
            }
        },

        checkAndMove(card) {
            const total = card.items.length;
            const completedCount = card.items.filter(i => i.completed).length;
            const percent = total ? (completedCount / total) * 100 : 0;

            if (percent === 100) {
                if (card.col !== 3) {
                    card.col = 3;
                    card.completedAt = new Date().toLocaleString();
                }
            } else if (card.col === 1 && percent > 50) {
                const column2Cards = this.cards.filter(c => c.col === 2);
                if (column2Cards.length < 5) {
                    card.col = 2;
                }
            } else if (card.col === 2 && percent === 100) {
                card.col = 3;
                card.completedAt = new Date().toLocaleString();
            }
        }

    },

    created() {
        const saved = localStorage.getItem('notes-app');
        if (saved) {
            this.cards = JSON.parse(saved);
        } else {
            // начальные данные
        }
    },
    watch: {
        cards: {
            handler(val) {
                localStorage.setItem('notes-app', JSON.stringify(val));
            },
            deep: true
        }
    },


}).mount('#app');