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
            searchQuery: ''
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
        },

        addCard(column) {
            if (column === 1 && this.cards.filter(c => c.col === 1).length >= 3) {
                alert('В первом столбце не может быть больше 3 карточек');
                return;
            }
            if (column === 2 && this.cards.filter(c => c.col === 2).length >= 5) {
                alert('Во втором столбце не может быть больше 5 карточек');
                return;
            }

            const newCard = {
                id: Date.now(),
                title: 'Новая заметка',
                col: column,
                items: [
                    {text: 'Пункт 1', completed: false},
                    {text: 'Пункт 2', completed: false},
                    {text: 'Пункт 3', completed: false}
                ],
                completedAt: null
            };
            this.cards.push(newCard);
        }

    },

    created() {
        const saved = localStorage.getItem('notes-app');
        if (saved) {
            this.cards = JSON.parse(saved);
        } else {
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

    computed: {
        isColumn1Locked() {

            const column2Count = this.cards.filter(c => c.col === 2).length;
            if (column2Count < 5) return false;


            return this.cards.some(card => {
                if (card.col !== 1) return false;
                const total = card.items.length;
                if (total === 0) return false;
                const completed = card.items.filter(i => i.completed).length;
                const percent = (completed / total) * 100;
                return percent > 50 && percent < 100;
            });
        },
        
        filteredCards() {    // <-- новое вычисляемое свойство
            const query = this.searchQuery.trim().toLowerCase();
            if (!query) return this.cards; // если поиск пуст, показываем всё
            return this.cards.filter(card =>
                card.title.toLowerCase().includes(query)
            );
        }
    }


}).mount('#app');