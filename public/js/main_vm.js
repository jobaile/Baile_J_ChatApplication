import ChatMessage from './modules/ChatMessage.js';

const socket = io();

function logConnect({sID, message, connected}){
    //debugger;
    console.log(sID, message);
    vm.socketID = sID;
    vm.connected = connected;

    var newUser = new Object();
        socket.emit('chat message', { content: "A new user has entered the chat", name: "Chat Bot", object: newUser});
}

function appendMessage(message){
    vm.messages.push(message)
}

//create Vue instance
const vm = new Vue ({
    data:{
        socketID: "",
        nickname: "",
        message: "",
        connected: '',
        typing: false,
        messages: []
    },

    watch: {
        message(value) {
          value ? socket.emit('typing', this.nickname) : socket.emit('stoptyping');
        }
      },
    
      created() {
        socket.on('typing', (data) => {
          console.log(data);
          this.typing = data || 'Anonymous';
        });
        socket.on('stoptyping', () => {
          this.typing = false;
        });
      },

    methods: {
        dispatchMessage(){
            //emit message event from the client side
            var date = new Date();
            //var n = date.getHours();
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous", time: date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })});

            //reset the message field
            this.message = "";
        },

        isTyping() {
            socket.emit('typing', this.nickname);
          },
          
    },

    components: {
        newmessage: ChatMessage
    }
    
}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage); //optional