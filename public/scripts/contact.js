console.log('Contact Page');
let app = new Vue({
    el: '#root',
    data: {
        name: '',
        comment: 'Enter Comment Here...',
        
    },
    created() {
    },
    methods: {
        async submitComment() {
          if(this.name == ''){
              alert("You must enter a name");
          }
          else if(this.comment == '' || this.comment == 'Enter Comment Here...'){
              alert("You must enter a comment");
          }
          else {
              var url = "submitcomment";
              console.log("Submitting Comment...");
              axios.post(url, {
                  name: this.name,
                  comment: this.comment,
                })
                .then(response => {})
                .catch(e => {
                  console.log(e);
                });
              this.name = '';
              this.comment = 'Comment Submitted!';
            }
        },
        clearComment(){
          if(this.comment == 'Enter Comment Here...' || this.comment == 'Comment Submitted!') {
              this.comment = '';
          }  
        }
        
    }
})