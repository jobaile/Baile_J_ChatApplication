export default {
    props: ['msg'],

    template: `
        <div>
            <p class="new-message" :class="{ 'my-message' : matchedID }">
                <span>{{msg.message.name}} says:</span>
                {{msg.message.content}}
            </p>
        </div>
    `,

    data: function(){
        return{
            //{ 'my-message' : matchedID}
            matchedID: this.$parent.socketID == this.msg.id
        }
    },
}