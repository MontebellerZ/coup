var apiKey = "ur17d5alVIOpDyjt5711o7V3Sa7gzstHlgFWqY7J",
	url,
	chatjogo,
	botao = 0,
	nick = "",
	letters = /^[a-zA-Z]+$/,
	msg,
	chat_room,
	chatnome,
	btn_enviar,
	opt,
	optbotao=0;

function nome(){
	nick = prompt("Escolha um nick pra você!");
	//nick = "Filipe"
	while (letters.test(nick) == false || nick == null){
		nick = prompt("Você não inseriu um nick válido :(\nInsira um novo nick por favor?");
	}
	document.getElementById("nome").innerHTML += nick;
}

function conectar(canal){
	document.getElementById("btn-enviar").disabled=true;

	if (botao != 0){
		msg = "<b>"+nick+" saiu do chat!</b>"
		chatjogo.send(msg);
		chatjogo.close();
		document.getElementById("msgs").innerHTML="";
		document.getElementById(botao).disabled=false;
		document.getElementById(botao).style="";
	}
	
	botao = document.getElementById(event.target.id).id;
	chatnome = document.getElementById(botao).innerHTML;
	url = "wss://connect.websocket.in/v3/" + canal + "?apiKey=" + apiKey;

	chatjogo = new WebSocket(url);
	document.getElementById(botao).disabled=true;
	chatjogo.onopen = conectou;
	chatjogo.onmessage = recebeu;
	chatjogo.onerror = errou;
	chatjogo.onclose = desconectou;
}

function conectou(){
	document.getElementById("btn-enviar").disabled=false;
	document.getElementById(botao).style.color="white";
	document.getElementById(botao).style.backgroundColor="green";
	document.getElementById(botao).style.border="2px solid black";

	msg = "<div><b>"+nick+" entrou no chat "+chatnome+"!</b></div>"
	chatjogo.send(msg);
	document.getElementById("msgs").innerHTML += msg;
}

function recebeu(event){
	chat_room = document.getElementById("msgs");
	chat_room.innerHTML += event.data;
	chat_room.scrollTop = chat_room.scrollHeight;
}

function errou(){
	alert("houve um erro ao comunicar-se com o servidor");
	document.getElementById("btn-conectar").disabled=false;
}

function desconectou(){
	msg = "<b>"+nick+" saiu do chat!</b>"
	chatjogo.send(msg);
}

function enviar(){
	msg = document.getElementById("entrada").value;
	if (/^\s+$/g.test(msg) == false && msg != ""){
		msg = "<div><b>"+nick+": </b>"+document.getElementById("entrada").value+"</div>";
		document.getElementById("entrada").value = "";
		chatjogo.send(msg);
		chat_room = document.getElementById("msgs");
		chat_room.innerHTML += msg;
		chat_room.scrollTop = chat_room.scrollHeight;
	}
}

function escolha(opt){
	if (optbotao != 0){
		document.getElementById(optbotao).style="";
	}
	optbotao = document.getElementById("opt"+opt).id;
	document.getElementById(optbotao).style.color="white";
	document.getElementById(optbotao).style.backgroundColor="rgb(156, 75, 191)";
	document.getElementById(optbotao).style.border="2px solid black";

	document.body.style.backgroundImage = "url('imgs/opt"+opt+"/back.jpg')";
	document.getElementById("show").innerHTML =
		("<img class='card' src='imgs/opt"+opt+"/assassino.jpg' alt='carta assassino'>")+
		("<img class='card' src='imgs/opt"+opt+"/capitao.jpg' alt='carta capitao'>")+
		("<img class='card' src='imgs/opt"+opt+"/condessa.jpg' alt='carta condessa'>")+
		("<img class='card' src='imgs/opt"+opt+"/duque.jpg' alt='carta duque'>")+
		("<img class='card' src='imgs/opt"+opt+"/embaixador.jpg' alt='carta embaixador'>");
}

