$(function(){
	var aColorArray = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
	var aQuoteArray = [
		["Sir Winston Churchill","Once you eliminate the impossible, whatever remains, no matter how improbable, must be the truth."],
		["Aldous Huxley","Maybe this world is another planet's Hell."],
		["Clarence Darrow","I have never killed anyone, but I have read some obituary notices with great satisfaction."],
		["George Eliot","Blessed is the man, who having nothing to say, abstains from giving wordy evidence of the fact."],
		["Star Wars: Empire Strikes Back","Do, or do not. There is no 'try'."],
		["Dirty Dancing","Nobody puts Baby in a corner."],
		["The Godfather","I'm going to make him an offer he can't refuse."],
		["George Bernard Shaw","If you can't get rid of the skeleton in your closet, you'd best teach it to dance."]
	];
	run();
	setInterval(run,6000);
	$(".new").on("click",function(){
		run();
	});
	function run(){
		var color = Math.floor(Math.random()*aColorArray.length);
		var aQuote2 = aQuote();
		$(".tp").animate({
			opacity:0
		},500,function(){
			$(this).animate({
				opacity:1
			},500);
			$(".tp").html(aQuote2[1]);
		}); 
		$(".cp").animate({
			opacity:0
		},500,function(){
			$(this).animate({
				opacity:1
			},500);
			$(".cp em").html(aQuote2[0]);
		});		
		function aQuote(){
			var n = Math.floor(Math.random()*aQuoteArray.length);
			var aQuote =[];
			aQuote.push(aQuoteArray[n][0]);
			aQuote.push(aQuoteArray[n][1]);
			return aQuote;
		}
	}
});