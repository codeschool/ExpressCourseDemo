$(function(){
  'use strict';

  $.get('/blocks', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var blockData = form.serialize();

    $.ajax({
      type: 'POST', url: '/blocks', data: blockData
    }).done(function(blockName){
      appendToList([blockName]);
      form.trigger('reset');
    });
  });

  function appendToList(blocks) {
    var list = [];
    var content, block;
    for(var i in blocks){
      block = blocks[i];
      list.push($('<li>'), { html: blocks[i] });
    }

    $('.block-list').append(list);
  }


  $('.block-list').on('click', 'a[data-block]', function (event) {
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/blocks/' + target.data('block')
    }).done(function () {
      target.parents('li').remove();
    });
  });

});
