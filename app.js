new Vue({
    el: '#app',
    data: {
        query: '',
        digimons: [],
        error: null
    },
    methods: {
        async searchDigimon() {
            if (!this.query) {
                this.error = "Por favor, insira um nome ou nível para pesquisar.";
                return;
            }

            const nameUrl = `https://digimon-api.vercel.app/api/digimon/name/${this.query}`;
            const levelUrl = `https://digimon-api.vercel.app/api/digimon/level/${this.query}`;

            try {
                this.error = null;
                this.digimons = [];
                let response = await axios.get(nameUrl);

                if (response.data.length === 0) {
                    response = await axios.get(levelUrl);
                }

                this.digimons = response.data;
                if (this.digimons.length === 0) {
                    this.error = "Nenhum Digimon encontrado.";
                }
            } catch (error) {
                this.error = "Ocorreu um erro ao buscar os dados.";
                console.error(error);
            }
        }
    }
});
