$(function () {
  $('.answer__short-answer').on('click', function (e) {

    e.preventDefault();

    let $this = $(this),
      answerBlock = $this.closest('.answer__block'),
      answerWrapper = $this.closest('.answer__wrapper'),
      answerBlocks = answerWrapper.find('.answer__block'),
      activeClass = 'answer__block_active',
      content = $('.answer__description', answerBlock),
      otherContent = $('.answer__description', answerWrapper),
      reqHeight = 45;

    console.log(reqHeight);

    if (!answerBlock.hasClass(activeClass)) {
      answerBlocks.removeClass(activeClass);
      answerBlock.addClass(activeClass);

      otherContent.css({
        'height': 0
      });

      content.css({
        'height': reqHeight + 'px'
      })

    } else {
      answerBlock.removeClass(activeClass);

      content.css({
        'height': 0
      })
    }
  });
});
