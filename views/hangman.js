'use strict'

var hangman = function hangman(answer,attempts_done,correct_guessed_letters,answer_letters) {
  this.answer = answer.toLowerCase();
  this.attempts_done = attempts_done || 0;
  
  this.correct_guessed_letters = correct_guessed_letters || [];
  this.answer_letters = answer_letters || [];
};

hangman.prototype = {
 WrongCount:10,
  
  checkGameStatus: function(){
  if(this.attempts_done > 9){
  return {
    status:"LOST"
  };
  } else if(this.correct_guessed_letters.join('') === this.answer_letters.join('')) {
    return {status:"WIN"};
  } else {
    return {status:"ONGOING"};
  }
},
  
  checkLetter: function(letter) {
    let fillpositions = [];
    // if letter is a valid letter
    if(this.answer_letters.indexOf(letter) > -1){
      this.correct_guessed_letters.push(letter);
        this.correct_guessed_letters.sort();// sorting the array to keep track of game
      for(let i=0;i<this.answer.length;i++){
        if(this.answer[i] === letter){
          fillpositions.push(i);
        }
      }
    } else {
      this.attempts_done += 1;
    }
    var response = this.checkGameStatus();
    response.attempt_left = this.WrongCount - this.attempts_done;
    response.fillpositions = fillpositions;
    return response;
    
  }
}

module.exports = hangman;
