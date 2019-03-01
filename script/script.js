function message(text){
	jQuery('#chat-result').append(text);
}

jQuery(document).ready(function(){


	var socket = new WebSocket("ws://chat.loc:8090/server.php");

	socket.onopen = function(){
		message("<div>Соединение установлено</div>");
	}
	
	socket.onerror = function(error){
		message("<div>Ошибка при соединении " + (error.message ? error.message : "") + "</div>");
	}

	socket.onclose = function(){
		message("<div>Соединение закрыто</div>");
	}

	socket.onmessage = function(event){
		var data = JSON.parse(event.data);
		message("<div>"+ data.type + " - " + data.message +"</div>")
	}

	$('#chat').on('submit', function(){
		var message = {
			chat_message:$('#chat-message').val(),
			chat_user:$('#chat-user').val(),
		};
		$('#chat-user').attr('type','hidden');

		socket.send(JSON.stringify(message));

		return false;
	});
});