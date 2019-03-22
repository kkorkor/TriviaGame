$(document).ready(function () {
    var options = [
        {
            question: "Who's the greatest player in the world?", 
            choice: ["C.Ronald", "Messi", "Neymar", "Hazard"],
            answer: 0,
            photo: "assets/images/giphy-2.gif"
         },
         {
             question: "What country is Real Madrid in?", 
            choice: ["England", "Spain", "France", "Germany"],
            answer: 1,
            photo: "assets/images/giphy-1.gif"
         }, 
         {
             question: "Who has won 4 champion league titles on the last 5 years?", 
            choice: ["Real Madrid", "Barcelona", "Chelsea", "Manchester United" ],
            answer: 0,
            photo: "assets/images/giphy-3.gif"
        }, 
        {
            question: "Who is the coach of Madrid?", 
            choice: ["Pep", "Ferge", "Klopp", "Zidane" ],
            answer: 3,
            photo: "assets/images/giphy-4.gif"
   
        }, 
        {
            question: "How many postion are there on the field?", 
            choice: ["12", "1", "11", "13" ],
            answer: 2,
            photo: "assets/images/giphy-5.gif"
        }, 
        {
            question: "How many CL do Real Madrid have?", 
            choice: ["0", "5", "13", "4" ],
            answer: 2,
            photo: "assets/images/giphy-6.gif"        
        }, 
        {
            question: "Which player won the best player award in Europe of 2018?", 
            choice: ["Ronaldo", "Messi", "Modric", "Rooney" ],
            answer: 2,
            photo: "assets/images/giphy-7.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var questCount = options.length;
    var tim = 35;
    var unansCount = 0;
    var interval;
    var seleted;
    var index;
    var running = false;
    var newArray = [];
    var holder = [];
    var displayQuestion
    var userChoices ="";
    
    $("#reset").hide();
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    function runTimer(){
        if (!running) {
        interval = setInterval(decrement, 1000); 
        running = true;
        }
    }
    function decrement() {
        $("#timlft").html("<h3>Time remaining: " + tim + "</h3>");
        tim --;
    
        if (tim === 0) {
            unansCount++;
            stop();
            $("#ansblk").html("<p>Time has ran out :/ The correct answer is: " + seleted.choice[seleted.answer] + "</p>");
            hidepicture();
        }	
    }
    
    function stop() {
        running = false;
        clearInterval(interval);
    }
  
    function displayQuestion() {
       
        index = Math.floor(Math.random()*options.length);
        seleted = options[index];
    
    
            $("#quesblk").html("<h2>" + seleted.question + "</h2>");
            for(var i = 0; i < seleted.choice.length; i++) {
                var userPick = $("<div>");
                userPick.addClass("pickedcho");
                userPick.html(seleted.choice[i]);
                userPick.attr("data-guessvalue", i);
                $("#ansblk").append(userPick);
    	
    }
    
    
    
    
    $(".pickedcho").on("click", function () {
        userChoices = parseInt($(this).attr("data-guessvalue"));
    
        if (userChoices === seleted.answer) {
            stop();
            correctCount++;
            userChoices="";
            $("#ansblk").html("<p>You are correct well done!!!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userChoices="";
            $("#ansblk").html("<p>You're incorrect maybe next time :( The correct answer is: " + seleted.choice[seleted.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#ansblk").append("<img src=" + seleted.photo + ">");
        newArray.push(seleted);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#ansblk").empty();
            tim= 25;
    
        if ((wrongCount + correctCount + unansCount) === questCount) {
            $("#quesblk").empty();
            $("#quesblk").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#ansblk").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#ansblk").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#ansblk").append("<h4> Unanswered: " + unansCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unansCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 5000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#ansblk").empty();
        $("#quesblk").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
    