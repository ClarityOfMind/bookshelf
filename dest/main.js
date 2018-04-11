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



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgLy92YXJpYWJsZXNcclxuICAvL2J1dHRvbiBzZWxvY3RvcnNcclxuICB2YXIgZWRpdEFyZWEgPSAkKFwiLmVkaXQtZm9ybVwiKSxcclxuICAgIGl0ZW1zU3RvcmFnZSA9IFtdLFxyXG4gICAgaXNFZGl0ZWQgPSBmYWxzZSxcclxuICAgIGlkQ291bnRlciA9IDAsXHJcbiAgICBpdGVtSWQ7XHJcblxyXG4gIC8vb2JqZWN0IGNvbnN0cnVjdG9yJ3MgaW5pdGlhbGl6YXRpb25cclxuICBmdW5jdGlvbiBJdGVtKG5hbWUsIGF1dGhvciwgeWVhciwgbGluaykge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYXV0aG9yID0gYXV0aG9yO1xyXG4gICAgdGhpcy55ZWFyID0geWVhcjtcclxuICAgIHRoaXMubGluayA9IGxpbms7XHJcblxyXG4gICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIGA8c2VjdGlvbiBjbGFzcz1cImxpc3RfX2l0ZW1cIiBpZD1cIiR7aWRDb3VudGVyKyt9XCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibGlzdF9faW1hZ2VcIiBzcmM9XCIke3RoaXMubGlua31cIiBhbHQ9XCIke3RoaXMubmFtZX1cIi8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdF9fZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgPGgyPjxjaXRlPiR7dGhpcy5uYW1lfTwvY2l0ZT48L2gyPlxyXG4gICAgICAgICAgICAgICAgICA8cD48Y2l0ZT4ke3RoaXMuYXV0aG9yfTwvY2l0ZT48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxwPjx0aW1lPiR7dGhpcy55ZWFyfTwvdGltZT48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0X19jb250cm9sc1wiPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBsaXN0X19idXR0b24gYnV0dG9uLS1lZGl0XCI+RWRpdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBsaXN0X19idXR0b24gYnV0dG9uLS1kZWxldGUgbGlzdF9fYnV0dG9uLS1yZWRcIj5EZWxldGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIEZvcm0gZGF0YSBzYXZpbmcgZnVuY3Rpb25cclxuICAkKFwiZm9ybVwiKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAoIWlzRWRpdGVkKSB7XHJcbiAgICAgIHZhciBpdGVtTmFtZSA9ICQoXCIuZWRpdC1mb3JtX19uYW1lXCIpLnZhbCgpLFxyXG4gICAgICAgIGl0ZW1BdXRob3IgPSAkKFwiLmVkaXQtZm9ybV9fYXV0aG9yXCIpLnZhbCgpLFxyXG4gICAgICAgIGl0ZW1ZZWFyID0gJChcIi5lZGl0LWZvcm1fX3llYXJcIikudmFsKCksXHJcbiAgICAgICAgaXRlbUxpbmsgPSAkKFwiLmVkaXQtZm9ybV9fbGlua1wiKS52YWwoKTtcclxuICAgICBcclxuICAgICAgdmFyIG5ld0l0ZW0gPSBuZXcgSXRlbShpdGVtTmFtZSwgaXRlbUF1dGhvciwgaXRlbVllYXIsIGl0ZW1MaW5rKTtcclxuXHJcbiAgICAgICQoXCIubGlzdF9fY29udGFpbmVyXCIpLnByZXBlbmQobmV3SXRlbS5jcmVhdGUoKSk7XHJcbiAgICAgIGl0ZW1zU3RvcmFnZS5wdXNoKG5ld0l0ZW0pO1xyXG4gICAgfSBlbHNlIHsgXHJcbiAgICAgIC8vIE9iamVjdCByZWFzc2lnbmluZyBcclxuICAgICAgaXRlbXNTdG9yYWdlW2l0ZW1JZF0ubmFtZSA9ICQoXCIuZWRpdC1mb3JtX19uYW1lXCIpLnZhbCgpO1xyXG4gICAgICBpdGVtc1N0b3JhZ2VbaXRlbUlkXS5hdXRob3IgPSAkKFwiLmVkaXQtZm9ybV9fYXV0aG9yXCIpLnZhbCgpO1xyXG4gICAgICBpdGVtc1N0b3JhZ2VbaXRlbUlkXS55ZWFyID0gJChcIi5lZGl0LWZvcm1fX3llYXJcIikudmFsKCk7XHJcbiAgICAgIGl0ZW1zU3RvcmFnZVtpdGVtSWRdLmxpbmsgPSAkKFwiLmVkaXQtZm9ybV9fbGlua1wiKS52YWwoKTtcclxuXHJcbiAgICAgIC8vRE9NIG5vZGUgcmVhc3NpZ25pbmdcclxuICAgICAgJChgIyR7aXRlbUlkfSBoMiBjaXRlYCkudGV4dCgkKFwiLmVkaXQtZm9ybV9fbmFtZVwiKS52YWwoKSk7XHJcbiAgICAgICQoYCMke2l0ZW1JZH0gcCBjaXRlYCkudGV4dCgkKFwiLmVkaXQtZm9ybV9fYXV0aG9yXCIpLnZhbCgpKTtcclxuICAgICAgJChgIyR7aXRlbUlkfSBwIHRpbWVgKS50ZXh0KCQoXCIuZWRpdC1mb3JtX195ZWFyXCIpLnZhbCgpKTtcclxuICAgICAgJChgIyR7aXRlbUlkfSA+IGltZ2ApLmF0dHIoJ3NyYycsICQoXCIuZWRpdC1mb3JtX19saW5rXCIpLnZhbCgpKTtcclxuICAgICAgJChgIyR7aXRlbUlkfSA+IGltZ2ApLmF0dHIoXCJhbHRcIiwgJChcIi5lZGl0LWZvcm1fX25hbWVcIikudmFsKCkpO1xyXG5cclxuICAgICAgaXNFZGl0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGVkaXRBcmVhLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpOyAgXHJcbiAgICBjbGVhckZvcm0oKTtcclxuICB9KTtcclxuXHJcbiAgLy8nQWRkJyBidXR0b24gbGlzdGVuZXIgXHJcbiAgJChcIi5idXR0b24tLWFkZFwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIGVkaXRBcmVhLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICB9KTtcclxuXHJcbiAgLy8nQ2FuY2VsbCcgYnV0dG9uIGxpc3RlbmVyIFxyXG4gICQoXCIuYnV0dG9uLS1jYW5jZWxcIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICBlZGl0QXJlYS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgIGNsZWFyRm9ybSgpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8vJ0VkaXQnIGJ1dHRvbiBsaXN0ZW5lciBcclxuICAkKFwiLmxpc3RfX2NvbnRhaW5lclwiKS5vbihcImNsaWNrXCIsIFwiLmJ1dHRvbi0tZWRpdFwiLCBmdW5jdGlvbigpIHtcclxuICAgIGlzRWRpdGVkID0gdHJ1ZTtcclxuICAgIGVkaXRBcmVhLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuXHJcbiAgICBpdGVtSWQgPSArJCh0aGlzKVxyXG4gICAgICAuY2xvc2VzdChcInNlY3Rpb25cIilcclxuICAgICAgLnByb3AoXCJpZFwiKTsgLy9HZXR0aW5nICdpZCcgbnVtYmVyIG9mIHRoZSBjdXJyZW50IGl0ZW1cclxuXHJcbiAgICAkKFwiLmVkaXQtZm9ybV9fbmFtZVwiKS52YWwoaXRlbXNTdG9yYWdlW2l0ZW1JZF0ubmFtZSk7XHJcbiAgICAkKFwiLmVkaXQtZm9ybV9fYXV0aG9yXCIpLnZhbChpdGVtc1N0b3JhZ2VbaXRlbUlkXS5hdXRob3IpO1xyXG4gICAgJChcIi5lZGl0LWZvcm1fX3llYXJcIikudmFsKGl0ZW1zU3RvcmFnZVtpdGVtSWRdLnllYXIpO1xyXG4gICAgJChcIi5lZGl0LWZvcm1fX2xpbmtcIikudmFsKGl0ZW1zU3RvcmFnZVtpdGVtSWRdLmxpbmspO1xyXG4gIH0pO1xyXG5cclxuICAvLydEZWxldGUnIGJ1dHRvbiBsaXN0ZW5pbmdcclxuJChcIi5saXN0X19jb250YWluZXJcIikub24oXCJjbGlja1wiLCBcIi5idXR0b24tLWRlbGV0ZVwiLCBmdW5jdGlvbigpIHtcclxuICAkKHRoaXMpXHJcbiAgICAuY2xvc2VzdChcInNlY3Rpb25cIilcclxuICAgIC5yZW1vdmUoKTtcclxufSk7XHJcblxyXG4gIC8vRm9ybSdzIGNsZWFyYW5jZSBmdW5jdGlvblxyXG4gIGZ1bmN0aW9uIGNsZWFyRm9ybSgpIHtcclxuICAgICQoXCIuZWRpdC1mb3JtX19uYW1lXCIpLnZhbChcIlwiKTtcclxuICAgICQoXCIuZWRpdC1mb3JtX19hdXRob3JcIikudmFsKFwiXCIpO1xyXG4gICAgJChcIi5lZGl0LWZvcm1fX3llYXJcIikudmFsKFwiXCIpO1xyXG4gICAgJChcIi5lZGl0LWZvcm1fX2xpbmtcIikudmFsKFwiXCIpO1xyXG4gIH1cclxufSlcclxuXHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
