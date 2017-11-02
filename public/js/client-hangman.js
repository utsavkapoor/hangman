'use strict'
$(function(){
  var question = "";
  var answer = "";
  var hint = "";
  var new_game = true;
  var attempt_left = 10;
  var current_game_stat = null;
  var canvas = null;
  var context;
  var name = "";
  
  var virtual_keyboard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  $('#new').on('click',function(){
    location.reload();
  });
  
  if(new_game){
    //set all the variables to 0 and get a new question
    console.log(new_game);
    get_question();
    new_game = false;
    attempt_left = 10;
    canvas = $('#hangman-playground')[0];
    context = canvas.getContext('2d');
    //context.clearRect(0, 0, canvas.width, canvas.height);
    //get all the keys in a keyboard
    draw_keyboard();
    $('#NameModal').modal('show');
    $('#save-button').on('click',function(){
      name = $('#name').val();
    $('#hint').on('click',function(){
      $('#clue').text(hint);
      $('#hint').prop("disabled",true);
    });
    });
  }
  
  function get_question(){
$.getJSON('/question',function(JSON){
  store_data(JSON.question,JSON.answer,JSON.hint);
});
    }
  
  function store_data(quest,ans,hin){
    question = quest;
    answer = ans.toLowerCase();
    hint = hin;
    draw_question_answer();
  }
  
  function draw_keyboard(){
    var ul = $('#keyboard');
    ul.each(function(){
      for(let i=0;i<virtual_keyboard.length;i++){
        var li_html = "<li class=\"text-center li_keyboard\" id=\""+i+"\"><button class=\"btn btn-md btn-secondary\">"+ virtual_keyboard[i]+"</button></li>";
        $(this).append(li_html);
      }
    });
  } 
  
  function draw_question_answer(){
    $('#question').text(question);
    let length = answer.length;
    var hack = "<li style=\"opacity:0;\"></li>";
    for(let j=0;j<4;j++){
    $('#answer-ul').append(hack);      
    };

    for(let i=0;i<length;i++){
      if(answer[i] !== " "){
        console.log("I am here");
      let li_html ="<li class=\"text-center li_answer\" id=\"answer"+i+"\">_</li>";
        //console.log(li_html);
        $('#answer-ul').append(li_html);
      } else{
        let li_html = "<li style=\"opacity:0;\">  </li>";
        $('#answer-ul').append(li_html);
      }
    }
  }
});
