var gameState = "intro";
//Game sound effects.
var audTimeLow = new Audio("assets/audio/10SecondsLeft.mp3");
var rightAnswer = new Audio("assets/audio/affirmative.mp3");
var incorrectAnswer = new Audio("assets/audio/wrong.mp3");
var timeUp = new Audio("assets/audio/terminated.mp3");
var zeroPercent = new Audio("assets/audio/sub75.mp3");
//time variable is used to countdown time for each question.
var time;
var intervalId;
var currentQuestion = 0;
var isShowingAnswer = false;

//These variables are used to track game score
var correct = 0;
var incorrect = 0;
var timeOut = 0;

//array that exam questions are placed in
var terminatorQuestions = 
[
    {
        questionDescription: "Question 1 refers to the following excerpt from a 1984 technology lecture by Kyle Reese discussing cyborg technology that would emerge around the year 2029.",
        movieLine: "\"The Terminator is an infiltration unit; part man, part machine. Underneath it's a hyperalloy combat chassis, microprocessor controlled, fully armored, very tough. But outside it's living human tissue. Flesh, skin, hair, blood. Grown for the cyborgs… The 600 series had rubber skin. We spotted them easy, but these are new, they look human.\"",
        question: "Which of the following statements best describes the purpose of the T-800 model of Terminator?",
        answers:
        [
            "A: Concealment - Entering Resistance hideouts undetected to initiate combat from within.", 
            "B: Peacekeeping - Actively maintaining a truce between the Resistance and Skynet.", 
            "C: Kill Sarah Connor - Preventing the birth of John Connor and the future defeat of Skynet.", 
            "D: Both A & C"
        ],
        correctAnswer: 3,
        correctAnswerGif: "assets/images/illBeBack.gif",
        wrongAnswerGif: "assets/images/wrongAnswer.gif"
    },
    {
        questionDescription: "Question 2 refers to the following excerpt from a first-hand account of life after the historical event known as “Judgement Day” which occurred in 1997:",
        movieLine: "\"Most of us were rounded up, put in camps for orderly disposal. Burned in by laser scan. Some of us were kept alive to work. Loading bodies. The disposal units ran night and day. We were that close to going out forever. But there was one man who taught us to fight. To storm the wire of the camps. To smash those metal m----- f------ into junk. He turned it around. He brought us back from the brink. His name is Connor. John Connor.\"",
        question: "Which of the following statements best describes the course of the war against Skynet?",
        answers: 
        [
            "A: Mankind quickly accomplished its goals in defeating Skynet and rebuilding society.", 
            "B: Mankind quickly accomplished its goals in defeating Skynet but not in rebuilding society.", 
            "C: Mankind quickly accomplished its goals in rebuilding society but not in defeating Skynet.", 
            "D: Due to the use of time travel to change past events, mankind is caught in an infinitely repeating loop and unable to accomplish either goal."
        ],
        correctAnswer: 3,
        correctAnswerGif: "assets/images/futureWar.gif",
        wrongAnswerGif: "assets/images/wrongAnswer.gif"
    },
    {
        questionDescription: "Question 3 refers to the following excerpt from a company analysis given by a reprogrammed Terminator in 1995 about Cyberdyne Systems Corporation:",
        movieLine: "\"All stealth bombers will be upgraded with Cyberdyne computers, becoming fully unmanned. Afterwards, they fly with a perfect operational record. The Skynet funding bill is passed. The system goes online on August 4, 1997. Human decisions are removed from strategic defense, Skynet begins to learn at a geometric rate. It becomes self aware at 2:14AM eastern time August 29th. In the panic, they try to pull the plug ... It launches its missiles against their targets in Russia … Skynet knows that the Russian counter attack will eliminate its enemies over here.\"",
        question: "What consequences, if any, did the introduction of new defense network computers have in the late 20th century?",
        answers:
        [
            "A: Growth in real wages for the lower/middle class and less economic inequality.", 
            "B: The near extinction of mankind, a protracted war with the Machines, and the eventual discovery of time travel.", 
            "C: None - Population levels decreased only slightly and for a brief period of time.", 
            "D: All of the above"
        ],
        correctAnswer: 1,
        correctAnswerGif: "assets/images/t2Arm.gif",
        wrongAnswerGif: "assets/images/wrongAnswer.gif"
    },
    {
        questionDescription: "Question 4 refers to the following excerpt from a poorly written monologue by John Connor in what was the beginning of a downward spiral for a once well respected movie franchise.",
        movieLine: "\"There was never any stopping it ... it could not be shut down. The attack began at 6:18PM, just as he said it would. Judgement Day... I should have realized, our destiny was never to stop Judgement Day. It was merely to survive it together ... He tried to tell us, but I didn't want to hear it. Maybe the future has been written, I don't know ... I never stopped fighting, and I never will. The battle has just begun.\"",
        question: "Which of the following statements best describes the relationship between the first two Terminator films and the subsequent films that followed in the franchise?",
        answers:
        [
            "A: All subsequent films enjoyed similar levels of positive reviews and financial success.", 
            "B: All subsequent films enjoyed similar financial success but received poor reviews.", 
            "C: All subsequent films were steaming piles of excrement and, as far as I’m concerned, don’t even count as part of the once noble franchise.", 
            "D: All subsequent films enjoyed similar positive reviews but did not achieve financial success."
        ],
        correctAnswer: 2,
        correctAnswerGif: "assets/images/t1000Breaking.gif",
        wrongAnswerGif: "assets/images/wrongAnswer.gif"
    }
];

//Function that initiates the exam.
function begin()
{
    showQuestion();
}

//Function that shows the questions and allows you to select answers.
function showQuestion()
{
    isShowingAnswer = false;

    //This section is where the timer function is called, 
    time = 59; //With my function I had to set the time variable to one second less than you want in order for it to work.
    intervalId = setInterval(sixtySeconds, 1000);
    $("#timer").html("60");
    //----------------------------------------------

    $("#questionNum").html("<b>" + terminatorQuestions[currentQuestion].questionDescription + "</b>");
    $("#preExcerpt").empty();
    $("#excerpt").html(terminatorQuestions[currentQuestion].movieLine);
    $("#question").empty();
    $("#terminated").empty();
    $("#buttons").text(terminatorQuestions[currentQuestion].question);

    for (var i = 0; i < 4; i++)
    {
        var button = $("<button>");
        button.attr("type", "button");
        button.addClass("answerButtons");
        button.attr("value", i);
        button.attr("id", "button" + i);
        button.text(terminatorQuestions[currentQuestion].answers[i]);
        $("#buttons").append(button);
        //this is tying the function to the button.
        $(".answerButtons").on('click', answerChosen);
    }
}

//This is the function that is used when the user either selects an answer or time runs out.
function answerChosen()
{
    //Prevents button function from processing data after a selection has been made
    if(isShowingAnswer)
    {
        console.log("button disabled");
        return;
    }

    clearInterval(intervalId);

    //"this" is referring to the button that was pressed
    var buttonValue = $(this).attr("value");
    //console.log(buttonValue);

    //== can compare a string with a number
    if (buttonValue == terminatorQuestions[currentQuestion].correctAnswer)
    {
        rightAnswer.play();
        console.log("correct");
        correct++;
    }
    else
    {
        incorrectAnswer.play();
        console.log("incorrect");
        incorrect++;
    }
    showAnswer();
}

//timer function that is called when the question appears
function sixtySeconds()
{
    $("#timer").html(time);
    console.log(time);

    //plays music when there is ten seconds left
    if(time <= 10)
    {   
        audTimeLow.play();
    }

    if(time <= 0)
    {
        //timeout variable is used to track the amount of questions that weren't answered due to not selecting anything in the time limit.
        timeOut++;
        clearInterval(intervalId);
        audTimeLow.pause();
        audTimeLow.currentTime = 0;
        $("#timer").html("0");
        timeUp.play();
        showAnswer();
    }
    time--;
}

//this function highlights the correct answer in green and the wrong ones in red
function showAnswer()
{
    isShowingAnswer = true;
    clearInterval(intervalId);
    intervalId = setInterval(nextQuestion, 3000);
    $("#timer").html("0");
    $("#answers").empty();

    for (var i = 0; i < 4; i++)
    {
        if(terminatorQuestions[currentQuestion].correctAnswer === i)
        {
            $("#button" + i).attr("class", "correctButton");
        }

        else
        {
            $("#button" + i).attr("class", "incorrectButton");
        }
    }
}

//function that shows the next question or ends the game//
function nextQuestion()
{
    clearInterval(intervalId);
    console.log("here");
    currentQuestion++;
    if (currentQuestion < terminatorQuestions.length)
    {
        showQuestion();
    }
    else
    {
        endExam();
    }
}

//function that shows your tallied score and creates a button to reset the game
function endExam()
{
    var percent = correct/4 * 100;

    clearInterval(intervalId);

    $("#questionNum").empty()
    $("#preExcerpt").text("Correct: " + correct);
    $("#excerpt").text("Incorrect: " + incorrect);
    $("#question").text("Unanswered: " + timeOut);
    $("#terminated").text("Score: " + percent + "%");

    $("#buttons").empty();
    
    var tryAgain = $("<button>");
    tryAgain.attr("type", "button");
    tryAgain.attr("id", "tryAgain");
    tryAgain.addClass("mt-1 mb-1");
    tryAgain.text("Take the Exam Again");
    $("#buttons").append(tryAgain);
    tryAgain.on("click", reset);

    scoreResponse();
}

function scoreResponse()
{
    var percent = correct/4 * 100;

    if(percent >= 75)
    {
        $("#timer").text("You passed congratulations!");
    }

    else if(percent < 75 && percent > 25)
    {
        $("#timer").text("You failed.");   
    }

    else
    {
        $("#timer").text("Couldn't even get one...");
        //easter egg sound effect for getting a 0. It's stupid, but I thought it was kind of funny...
        zeroPercent.play();
    }
}

//function that resets the game
function reset()
{
    currentQuestion = 0;
    correct = 0;
    incorrect = 0;
    timeOut = 0;
    showQuestion();
}