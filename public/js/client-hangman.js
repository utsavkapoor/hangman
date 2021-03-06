'use strict'
$(function(){
  var question = "";
  var answer_length = 0;
  var hint = "";
  var new_game = true;
  var attempt_left = 10;
  var current_game_stat = null;
  var canvas = $('#hangman-playground')[0];
  var context = canvas.getContext('2d');
  var name = "";
  var space = [];

  var virtual_keyboard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z','0','1','2','3','4','5','6','7','8','9'];


    $('#NameModal').modal('show');
    $('#save-button').on('click',function(){
      name = $('#name').val();
      get_question();
    });

    draw_keyboard();

  $(document).on('keypress', function(evt){
    let value = 0;
    if(evt.keyCode-64 < 27 && evt.keyCode > 0){
      value = 65;
    } else if(evt.keyCode-96 < 27 && evt.keyCode-96 > 0){
      value = 97;
    }
    if(evt.keyCode > 47 && evt.keyCode < 58 && name){
      let str = "#"+ String.fromCharCode(evt.keyCode);
      $(str).click();
    }
    else if(((evt.keyCode >96 && evt.keyCode < 123) || (evt.keyCode >64 && evt.keyCode < 91)) && name){
      let str = "#"+String.fromCharCode(evt.keyCode - value + 97);
      $(str).click();
    }
  });

  $('#new').on('click',function(){
    start_new_game();
  });

  $('#hint').on('click',function(){
      $('#clue').text(hint);
      $('#hint').prop("disabled",true);
    });

    $('.btn-class').click(function(event){
      let key_pressed = "#" +$(this).attr("id");
      $(key_pressed).prop('disabled',true);
      send_req_to_server($(this).attr("id"));
    });


  function get_question(){
$.getJSON('/question/'+ name,function(JSON){
  store_data(JSON.question,JSON.answer,JSON.hint,JSON.space);
  display_stats(JSON.name,JSON.win,JSON.loss);
}).fail(function(fail){
  if (fail.status == 400){
    $('#game-status').empty();
    $('#game-status').text("No Name entered. Please refresh page and enter name");
  }
});
    }

  function store_data(quest,len,hin,space_list){
    question = quest;
    hint = hin;
    answer_length = len;
    space = space_list;
    draw_question_answer();
  }

  function display_stats(name,win,loss){
    $("#player-name").text(name);
    $("#games-won").text(win);
    $("#games-lost").text(loss);
  }

  function draw_keyboard(){
    var ul = $('#keyboard');
    ul.each(function(){
      for(let i=0;i<virtual_keyboard.length;i++){
        var li_html = "<li class=\"text-center li_keyboard\"><button  id=\""+virtual_keyboard[i]+"\" class=\"btn btn-md btn-info btn-class\">"+ virtual_keyboard[i]+"</button></li>";
        $(this).append(li_html);
      }
    });
  }

  function draw_question_answer(){
    $('#question').empty();
    $('#question').text(question);
    let length = answer_length;
    $('#answer-ul').empty();
    var hack = "<li style=\"opacity:0;\"></li>";
    for(let j=0;j<6;j++){
    $('#answer-ul').append(hack);
    };
    for(let i=0;i<length;i++){
      if(space.indexOf(i) < 0){
        let li_html ="<li class=\"text-center li_answer\" id=\"answer"+i+"\">_</li>";
        $('#answer-ul').append(li_html);
      } else{
        let li_html = "<li style=\"opacity:0;\">  </li>";
        $('#answer-ul').append(li_html);
      }
    }
  }


  function send_req_to_server(letter){
    $.post('/key/'+letter,function(JSON){
      current_game_stat = JSON.gameStat;
      display_stats(current_game_stat.name,current_game_stat.win,current_game_stat.loss);
      attempt_left = JSON.attempt_left;
      let list = JSON.fillpositions;
      if(list.length === 0){
        let id = "#" + letter;
        $(id).removeClass('btn-info');
        $(id).addClass('btn-danger');
        draw_hanging_man();
      } else {
        //fill answer in their positions
        for(let i=0;i<list.length;i++){
          let id= "#answer" + list[i];
          $(id).text(letter);
        }
        let id_button = "#" + letter;
        $(id_button).removeClass('btn-info');
        $(id_button).addClass('btn-success');
      }
      show_lives_left();
      if(JSON.status === "LOST"){
        //show You Lost and block all the keys
        $("#game-status").text("YOU LOST. Correct answer is "+ JSON.answer);
        $("#game-status").css("color","red");
        $('.btn-class').prop('disabled',true);

      } else if(JSON.status === "WIN"){
        //show You Won and block all the keys in keyboard
        $("#game-status").text("YOU WIN");
        $("#game-status").css("color","green");
        $('.btn-class').prop('disabled',true);
      }

    });

  }


  function show_lives_left(){
    $('#lives').text(attempt_left);
  }

  function draw_hanging_man(){
    if(attempt_left === 9){
      context.beginPath();
      context.lineWidth = 7;
      context.moveTo(0, 250);
      context.lineTo(100, 250);
      context.strokeStyle = '#ffffff';
      context.stroke();
    } else if (attempt_left === 8){
      context.beginPath();
      context.lineWidth = 7;
      context.moveTo(50, 250);
      context.lineTo(50,25);
      context.stroke();
    } else if (attempt_left === 7){
      context.beginPath();
      context.lineWidth = 7;
      context.moveTo(50, 25);
      context.lineTo(200,25);
      context.stroke();
    } else if(attempt_left === 6){
      context.beginPath();
      context.lineWidth = 7;
      context.moveTo(200, 25);
      context.lineTo(200,50);
      context.stroke();
    } else if(attempt_left === 5){
      context.beginPath();
      context.lineWidth = 7;
      context.arc(200, 75, 25, 2 * Math.PI, 0);
      context.stroke();
   } else if(attempt_left === 4){
      context.beginPath();
     context.lineWidth = 7;
      context.moveTo(200,100);
      context.lineTo(200,150);
      context.stroke();
   } else if(attempt_left === 3){
      context.beginPath();
     context.lineWidth = 7;
      context.moveTo(200,150);
      context.lineTo(150,200);
      context.stroke();
   } else if(attempt_left === 2){
      context.beginPath();
     context.lineWidth = 7;
      context.moveTo(200,150);
      context.lineTo(250,200);
      context.stroke();
   } else if(attempt_left === 1){
      context.beginPath();
     context.lineWidth = 7;
      context.moveTo(200,125);
      context.lineTo(250,175);
      context.stroke();
   } else if(attempt_left === 0){
      context.beginPath();
      context.lineWidth = 7;
      context.moveTo(200,125);
      context.lineTo(150,175);
      context.stroke();
   }
  }

  function start_new_game() {
      question = "";
       answer_length = 0;
       hint = "";
       new_game = true;
       attempt_left = 10;
       current_game_stat = null;
       canvas = null;
       context;
       space = [];
      $('.btn-class').removeClass('btn-danger');
      $('.btn-class').removeClass('btn-success');
      $('.btn-class').addClass('btn-info');
      $('.btn-class').prop('disabled',false);
      $('#hint').prop('disabled',false);
      $('#game-status').empty();
      $('#clue').empty();
      show_lives_left();
      canvas = $('#hangman-playground')[0];
      context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      get_question();
  }
});