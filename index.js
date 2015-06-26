var telegram = require('./lib/telegram-bot');

var api = new telegram({
	token: '122775800:AAEh5KYx4GJ4AiinpH96HaWCogHHPF26syk'
});


//getMe
api.getMe(function(err, data){
    console.log(err);
    console.log(data);
});


var chat = "no chat";

a = {
	offset: -1,
	limit: 100
};



function doIt(){
	api.getUpdates(a, function(err, data) {
		if(a.offset == -1 || data[data.length - 1].message.chat.tittle != chat){
			a.offset = data[data.length - 1].update_id - 1;
			chat = data[data.length - 1].message.chat.tittle;
		}
		if(a.offset < data[data.length - 1].update_id){
			console.log(data[data.length - 1]);
			var guau = "";


			if('text' in data[data.length - 1].message){
				for(var i = 0; i < data[data.length - 1].message.text.length / 4; i++){
					guau += "guau! ";
				}
				param = {
					chat_id: data[data.length - 1].message.chat.id,
					text: guau
				};

				api.sendMessage(param, function(err, data) {});
			}
			
			a.offset = data[data.length - 1].update_id;
		}
	})
}

setInterval(doIt, 3000);
