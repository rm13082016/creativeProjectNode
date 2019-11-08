console.log('Project Page');
let app = new Vue({
    el: '#root',
    data: {
        list: [],
        prefix: '',
        suggestions: [],
        projectinfo: [],
        title: '',
        difficulty: '',
        desc: '',
        picture: '',
        ipsum: 'This is where the instructions would go, as of now I don\'t have all the instructions. So enjoy some bacon ipsum. Bacon ipsum dolor amet frankfurter doner andouille pork t-bone, alcatra landjaeger brisket short ribs turducken buffalo. Meatloaf boudin sausage, drumstick pancetta pork bresaola pig doner tail filet mignon porchetta shank. Ham short ribs ground round pastrami shoulder fatback. Andouille picanha tenderloin filet mignon. Landjaeger meatball kevin tail, tenderloin fatback boudin pork belly leberkas shank pig short loin meatloaf pastrami. Meatball ham pig ribeye shoulder. Shankle pig andouille brisket picanha filet mignon flank frankfurter jerky landjaeger meatball short ribs.',
        instructions: '',
    },
    created() {
        this.listProject();
    },
    methods: {
        async listProject() {
            console.log('Listing Projects...');
            var url = "listprojects";
            try {
                const response = await axios.get(url);
                this.list = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async searchProject() {
            if(this.prefix == '') {
                this.suggestions = [];
            }
            else {
                console.log('Searching Projects...');
                var url = "searchproject?q=";
                try {
                    const response = await axios.get(url + this.prefix);
                    this.suggestions = response.data;
                    return true;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async loadProject(id) {
            console.log('Loading Projects...');
            var url = "loadproject?q=";
            try {
                const response = await axios.get(url + id);
                console.log(response.data);
                this.projectinfo = response.data;
                this.title = this.projectinfo[0].title;
                this.difficulty = 'Difficulty: ' + this.projectinfo[0].difficulty;
                this.desc = 'Description: ' + this.projectinfo[0].desc;
                this.picture = this.projectinfo[0].imgurl;
                if(this.title != '') {
                this.instructions = this.ipsum;
                this.suggestions = [];
                this.prefix = '';
                }
                return true;
            } catch (error) {
                console.log(error);
            }
        },
    }
})