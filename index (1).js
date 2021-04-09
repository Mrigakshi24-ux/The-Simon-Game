var colors = ['red', 'blue', 'green', 'yellow'];
var conceptName = 0;
var computerList = [];
var level = 1;    
var userList = [];
var computerColor;
var computerNo;
var userColor;

/*$('h1').mouseenter(function(){              //This function is to change the color while hovering
$('h1').css('color', 'red');
}).mouseleave(function()
{
    $('h1').css('color', '#FEF2BF');
});*/

function blink(selector){
    $(selector).fadeOut('slow', function(){
        $(this).fadeIn('slow', function(){
            blink(this);
        });
    });
}

$(document).ready(function(){
    blink('h1');
});


$('.dropdown').hover(function(){
    $('.dropdown-content').stop().slideDown();
}, function(){
    $('.dropdown-content').stop().slideUp();
});

/* This function saves the id of clicked button, and changes the name of button*/
$('#dropDown').click(function(event){
    conceptName = event.target.id;
    $('.dropbtn').html('Level ' + conceptName);
});


$('body').keypress(function()          // This is for changing the text of the heading
{
    if (conceptName != 0) {
        $('h1').text('Level 1');
        computerList.length = 0;
        level = 1;
        $('.dropdown').unbind('mouseenter mouseleave');
        chooseCompColor();
    }
});


function chooseCompColor(){

    userList.length = 0;

    computerNo = Math.floor(Math.random() * 4);
    computerColor = colors[computerNo];

    setTimeout(function(){
        $('#' + computerColor).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 2000);
    
    computerList.push(computerColor);

    document.onkeydown = function (e) {
        return false;
    }
    
    $('.btn').unbind('click').click(function(event){    
        userColor = event.target.id;    
        userList.push(userColor);
        
        if (userList.length === computerList.length)
        {
            if (JSON.stringify(userList) === JSON.stringify(computerList)) //converts them to string and compare
            {
                $('body').css('background-color','#04d9ff');
                setTimeout(function(){
                    $('body').css('background-color','#011F3F');
                }, 300);

                $('h1').css('color','red');
                setTimeout(function(){
                    $('h1').css('color','#FEF2BF');
                }, 300);

                level = level + 1;
                $('h1').text('Level ' + level);
        

                if (level <= conceptName)
                {
                    chooseCompColor();
                }
                else{
                    $('h1').text("You Won the freaking game!!");
                    setTimeout(function(){
                        restartGame();
                    }, 2000);
                }
            }
            else
            {
                $('h1').text('Sorry, you lose!');
                $('body').css('background-color','red');
                setTimeout(function(){
                    restartGame();
                }, 4000);
            
            }
        }

        else {
            for(var i = 0; i < userList.length; i++) 
            {
                if (userList[i] != computerList[i])
                {
                    $('h1').text('Sorry, you lose!');
                    $('body').css('background-color','red');
                    setTimeout(function(){
                        restartGame();
                    }, 4000);
                }
            }
        }
    });
}


function restartGame(){
    conceptName = 0;
    $('.dropbtn').html('Choose Your Level');
    $('h1').text('Press any key to Start');
    $('body').css('background-color','#011F3F');
    $('.dropdown').hover(function(){
        $('.dropdown-content').stop().slideDown();
    }, function(){
        $('.dropdown-content').stop().slideUp();
    });
    document.onkeydown = function (e) {
        return true;
    }
}