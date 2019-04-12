import ChatMessage from './modules/ChatMessage.js';

const socket = io();

function logConnect({sID, message}){
    //debugger;
    console.log(sID, message);
    vm.socketID = sID;

    var newUser = new Object();
        socket.emit('chat message', { content: "A new user has entered the chat", name: "CHAT BOT", object: newUser});
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
        messages: []
    },

    methods: {
        dispatchMessage(){
            //emit message event from the client side
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"});

            //reset the message field
            this.message = "";
        }
    },

    components: {
        newmessage: ChatMessage
    }
    
}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage); //optional