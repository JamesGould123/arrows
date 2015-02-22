$.fn.sliderArrows = function() {
	var numOfSlides,
		cur = 0,
		next = 1,
		slides = this.children(),
		prev = numOfSlides = slides.length-1,
		slideArr = [], i;
	for(i = 0; i <= numOfSlides; i++){
		slideArr.push($(slides[i]));
	}
	slideArr[0].css('opacity', 1);

	var changeSlide = function(cur, to) {
			slideArr[cur].animate({opacity : 0},1000);
			slideArr[to].animate({opacity : 1},1000);
		},
		nextLocation = function(){
			prev = cur;
			cur = next;
			next = next < numOfSlides ? next+1 : 0;
		},
		prevLocation = function(){
			next = cur;
			cur = prev;
			prev = prev > 0 ? prev-1 : numOfSlides;
		};

	return {
		forward : function(){
			changeSlide(cur, next);
			nextLocation();
		},
		backward : function(){
			changeSlide(cur, prev);
			prevLocation();
		}
	};
};

$(document).ready(function(){
	//drop down example: change selected item
	$('.dd-item').click(function(){
		var dataVal = $(this).attr('data-value');
		$(this).parent().parent().find('.dd-selection').html(dataVal);
	});

	//slider example, bind left and right to forward and backward
	var sliderArrows = $('.slider').sliderArrows();
	$('.sliderLeft').click(sliderArrows.backward);
	$('.sliderRight').click(sliderArrows.forward);

	//show/hide code relevant to clicked example
	$('.cnt').click(function(){
		var id = $(this).attr('data-id')
		$('code').hide();
		$(id).show();
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
	});
});
