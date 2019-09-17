var gameState = "intro";
var audTimeLow = new Audio("assets/audio/10SecondsLeft.mp3");
var audTimeUp = new Audio("assets/audio/terminated.mp3");
var time;
var intervalId;
var currentQuestion = 0;

var terminatorQuestions = 
[
    {
        questionDescription: "Question 1 refers to the following excerpt from a 1984 technology lecture by Kyle Reese discussing cyborg technology that would emerge around the year 2029.",
        movieLine: "The Terminator is an infiltration unit; part man, part machine. Underneath it's a hyperalloy combat chassis, microprocessor controlled, fully armored, very tough. But outside it's living human tissue. Flesh, skin, hair, blood. Grown for the cyborgs… The 600 series had rubber skin. We spotted them easy, but these are new, they look human.",
        question: "Which of the following statements best describes the purpose of the T-800 model of Terminator?",
        answers:
        [
        "A: Concealment - Entering Resistance hideouts undetected to initiate combat from within.", 
        "B: Peacekeeping - Actively maintaining a truce between the Resistance and Skynet.", 
        "C: Kill Sarah Connor - Preventing the birth of John Connor and the future defeat of Skynet.", 
        "D: Both A & C"
        ],
        correctAnswer: 3,
        gifImage: "assets"
    },
    {
        questionDescription: "Question 2 refers to the following excerpt from a first-hand account of life after the historical event known as “Judgement Day” which occurred in 1997:",
        movieLine: "Most of us were rounded up, put in camps for orderly disposal. Burned in by laser scan. Some of us were kept alive to work. Loading bodies. The disposal units ran night and day. We were that close to going out forever. But there was one man who taught us to fight. To storm the wire of the camps. To smash those metal m----- f------ into junk. He turned it around. He brought us back from the brink. His name is Connor. John Connor.",
        question: "Which of the following statements best describes the course of the war against Skynet?",
        answers: 
        [
        "A: Mankind quickly accomplished its goals in defeating Skynet and rebuilding society.", 
        "B: Mankind quickly accomplished its goals in defeating Skynet but not in rebuilding society.", 
        "C: Mankind quickly accomplished its goals in rebuilding society but not in defeating Skynet.", 
        "D: Due to the use of time travel to change past events, mankind is caught in an infinitely repeating loop and unable to accomplish either goal."
        ],
        correctAnswer: 3,
    },
    {
        questionDescription: "Questions 3 refers to the following excerpt from a company analysis given by a reprogrammed Terminator in 1995 about Cyberdyne Systems Corporation:",
        movieLine: "All stealth bombers will be upgraded with Cyberdyne computers, becoming fully unmanned. Afterwards, they fly with a perfect operational record. The Skynet funding bill is passed. The system goes online on August 4, 1997. Human decisions are removed from strategic defense, Skynet begins to learn at a geometric rate. It becomes self aware at 2:14AM eastern time August 29th. In the panic, they try to pull the plug ... It launches its missiles against their targets in Russia … Skynet knows that the Russian counter attack will eliminate its enemies over here.",
        question: "What consequences, if any, did the introduction of new defense network computers have in the late 20th century?",
        answers:
        [
        "A: Growth in real wages for the lower/middle class and less economic inequality.", 
        "B: The near extinction of mankind, a protracted war with the Machines, and the eventual discovery of time travel.", 
        "C: None - Population levels decreased only slightly and for a brief period of time.", 
        "D: All of the above"
        ],
        correctAnswer: 1,
    },
    {
        questionDescription: "Questions 4 refers to the following excerpt from a poorly written monologue by John Connor in what was the beginning of a downward spiral for a once well respected movie franchise.",
        movieLine: "There was never any stopping it ... it could not be shut down. The attack began at 6:18PM, just as he said it would. Judgement Day... I should have realized, our destiny was never to stop Judgement Day. It was merely to survive it together ... He tried to tell us, but I didn't want to hear it. Maybe the future has been written, I don't know ... I never stopped fighting, and I never will. The battle has just begun.",
        question: "Which of the following statements best describes the relationship between the first two Terminator films and the subsequent films that followed in the franchise?",
        answers:
        [
        "A: All subsequent films enjoyed similar levels of positive reviews and financial success.", 
        "B: All subsequent films enjoyed similar financial success but received poor reviews.", 
        "C: All subsequent films were steaming piles of excrement and, as far as I’m concerned, don’t even count as part of the once noble franchise.", 
        "D: All subsequent films enjoyed similar positive reviews but did not achieve financial success."
        ],
        correctAnswer: 2,
    }
];

var startBtn = $("#startBtn");

//Function for start button//
function begin()
{
    showQuestion();
}

// setTimeout(twentyFiveSeconds, 1000 * 25);
function showQuestion()
{
    time = 14;
    intervalId = setInterval(sixtySeconds, 1000);
    $("#timer").html("15");
    $("#questionNum").html("terminator");
    $("#preExcerpt").html("terminator");
    $("#excerpt").html("terminator");
    $("#question").html("terminator");
    $("#answers").html("terminator");

}

function sixtySeconds()
{
    $("#timer").html(time);
    console.log(time);
    time--;

    if(time <= 9)
    {
        audTimeLow.play();
    }
    if(time <= 0)
    {
        clearInterval(intervalId);
        audTimeLow.pause();
        audTimeLow.currentTime = 0;
        audTimeUp.play();
        $("#timer").html("0");
        showAnswer();

    }

}

function showAnswer()
{
    $("#timer").html("15");
    $("#questionNum").html("terminator");
    $("#preExcerpt").html("<b>terminator</b>");
    $("#excerpt").html("terminator");
    $("#question").html("terminator");
    $("#answers").html("terminator");
}