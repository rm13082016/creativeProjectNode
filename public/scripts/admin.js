console.log('Project Page');
let app = new Vue({
    el: '#root',
    data: {
        comments: [],
    },
    created() {
        this.loadComments();
        alert("This admin page wouldn't normally be public, but instead would be hidden and protected.")
    },
    methods: {
        async loadComments() {
            console.log('Listing Comments...');
            var url = "loadcomments";
            try {
                const response = await axios.get(url);
                this.comments = response.data;
                console.log(this.comments);
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async resolveComment(number) {
            console.log('Resolving...');
            console.log(number);
            var url = "resolvecomment?q=" + number;
            try {
                axios.delete(url);
                this.loadComments();
                return true;
            } catch (error) {
                console.log(error);
            }
        }
    }
})