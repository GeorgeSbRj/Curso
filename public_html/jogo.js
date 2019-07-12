var timerId = null; //variavel armazena timeout


function iniciaJogo(){
    
    alert('jogo iniciado');
    var url = window.location.search;  // funcao para recuperar a url completa //
    var nivel_jogo = url.replace("?","");
   // alert(url);
   // alert(nivel_jogo);
    var tempo_segundos =0;
    
    if(nivel_jogo == 1){ //1 facil -> 120segundos
       tempo_segundos = 120;
    }
    if(nivel_jogo == 2){// 2 normal ->60segundos     
       tempo_segundos = 60;
    }  
    if(nivel_jogo == 3){//3 dificil ->30segundos
       tempo_segundos = 30;            
    }
    //inserindo segundos no span
     document.getElementById('cronometro').innerHTML = tempo_segundos;
     
    //quantidades de baloes
    var qtde_baloes = 80;
    cria_baloes(qtde_baloes);
    
    //imprimir baloes inteiros 
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;
    
    contagem_tempo(tempo_segundos+1);
}

function contagem_tempo(segundos){
    
    segundos = segundos - 1;
    if(segundos == -1){
        clearTimeout(timerId);// limpar timeout 
        
        game_over();
        return false;
    }
    
    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")",1000);
}

function game_over(){
    remove_eventos_baloes();
    alert('GAME OVER');
}situacao_jogo:

function cria_baloes(qtde_baloes){
    
    for(var i =1; i <= qtde_baloes; i++){
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin='10px';
        balao.id = 'b'+i;
        balao.onclick = function(){
            estourar(this);
        }
        
        document.getElementById('cenario').appendChild(balao);
    }
    
}

function estourar(e){
    var id_balao = e.id;
    
    // nao subir essa linha  pro git 
    document.getElementById(id_balao).setAttribute("onclick","");
    
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
   // alert(id_balao);
    pontuacao(-1);
} 

function pontuacao(acao){
    var baloes_inteiros  = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
  
    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);
    
    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;
    
   document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
   document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
   
   situacao_jogo(baloes_inteiros,baloes_estourados);
    
} 
function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert('Great!! congratulation!!!');
    }
}
function para_jogo(){
    clearTimeout(timerId);
}

function remove_eventos_baloes(){
    var i = 1;//contador para recuperar baloes id 

 // percorre o elemento de acordo com id e so ira sair do laco quando nao houver correspondencia com elementos
 while(document.getElementById('b'+i)){
     // retira o elemento onclick do elemento
     document.getElementById('b'+i).onclick = '';
     i++;// faz a interacao da variavel i 
 }
}