'use strict';
$(document).ready(function() {
  //variables
  //button seloctors
  var editArea = $(".edit-form"),
    itemsStorage = [],
    isEdited = false,
    idCounter = 0,
    itemId;

  //object constructor's initialization
  function Item(name, author, year, link) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.link = link;

    this.create = function() {
      return `<section class="list__item" id="${idCounter++}">
                <img class="list__image" src="${this.link}" alt="${this.name}"/>
                <div class="list__description">
                  <h2><cite>${this.name}</cite></h2>
                  <p><cite>${this.author}</cite></p>
                  <p><time>${this.year}</time></p>
                </div>
                <div class="list__controls">
                  <button type="button" class="button list__button button--edit">Edit</button>
                  <button type="button" class="button list__button button--delete list__button--red">Delete</button>
                </div>
              </section>`;
    };
  }

  // Form data saving function
  $("form").submit(function(event) {
    event.preventDefault();
    if (!isEdited) {
      var itemName = $(".edit-form__name").val(),
        itemAuthor = $(".edit-form__author").val(),
        itemYear = $(".edit-form__year").val(),
        itemLink = $(".edit-form__link").val();
     
      var newItem = new Item(itemName, itemAuthor, itemYear, itemLink);

      $(".list__container").prepend(newItem.create());
      itemsStorage.push(newItem);
    } else { 
      // Object reassigning 
      itemsStorage[itemId].name = $(".edit-form__name").val();
      itemsStorage[itemId].author = $(".edit-form__author").val();
      itemsStorage[itemId].year = $(".edit-form__year").val();
      itemsStorage[itemId].link = $(".edit-form__link").val();

      //DOM node reassigning
      $(`#${itemId} h2 cite`).text($(".edit-form__name").val());
      $(`#${itemId} p cite`).text($(".edit-form__author").val());
      $(`#${itemId} p time`).text($(".edit-form__year").val());
      $(`#${itemId} > img`).attr('src', $(".edit-form__link").val());
      $(`#${itemId} > img`).attr("alt", $(".edit-form__name").val());

      isEdited = false;
    }
    editArea.css("display", "none");  
    clearForm();
  });

  //'Add' button listener 
  $(".button--add").click(function() {
    editArea.css("display", "block");
  });

  //'Cancell' button listener 
  $(".button--cancel").click(function() {
    editArea.css("display", "none");
    clearForm();
  });
  
  //'Edit' button listener 
  $(".list__container").on("click", ".button--edit", function() {
    isEdited = true;
    editArea.css("display", "block");

    itemId = +$(this)
      .closest("section")
      .prop("id"); //Getting 'id' number of the current item

    $(".edit-form__name").val(itemsStorage[itemId].name);
    $(".edit-form__author").val(itemsStorage[itemId].author);
    $(".edit-form__year").val(itemsStorage[itemId].year);
    $(".edit-form__link").val(itemsStorage[itemId].link);
  });

  //'Delete' button listening
$(".list__container").on("click", ".button--delete", function() {
  $(this)
    .closest("section")
    .remove();
});

  //Form's clearance function
  function clearForm() {
    $(".edit-form__name").val("");
    $(".edit-form__author").val("");
    $(".edit-form__year").val("");
    $(".edit-form__link").val("");
  }
})


