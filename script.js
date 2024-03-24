$(function () {
  let $tasks = $(".tasklist__list");
  let $taskinput = $(".tasklist__input");
  let $notification = $(".tasklist__notification");

  let displayNotification = function () {
    const savedTasksForCheck = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!savedTasksForCheck.length) {
      $notification.show();
    } else {
      $notification.css("display", "none");
    }
  };

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (task) {
    const checkboxValueSaved = task;
    const $checkboxSaved = $("<input>")
      .attr("type", "checkbox")
      .attr("class", "tasklist__checkbox")
      .attr("value", checkboxValueSaved);
    $tasks.append(
      "<label class='tasklist__label'>" +
        $checkboxSaved.prop("outerHTML") +
        task +
        "<br>" +
        "</label>"
    );
    displayNotification();
  });

  $(".tasklist__add").on("click", function () {
    if (!$taskinput.val()) {
      return false;
    }
    const checkboxValue = $taskinput.val();
    const $checkbox = $("<input>")
      .attr("type", "checkbox")
      .attr("class", "tasklist__checkbox")
      .attr("value", checkboxValue);
    $tasks.append(
      "<label class='tasklist__label'>" +
        $checkbox.prop("outerHTML") +
        $taskinput.val() +
        "<br>" +
        "</label>"
    );
    savedTasks.push($taskinput.val());
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    $taskinput.val("");
    displayNotification();
  });

  $(".tasklist__remove").on("click", function () {
    let selectedValues = [];
    $("input[type='checkbox']:checked").each(function () {
      selectedValues.push($(this).val());
      $(this).parent().remove();
    });
    const savedTasksToRemove = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedTasksToRemoveFiltered = savedTasksToRemove.filter(
      (task) => !selectedValues.includes(task)
    );
    localStorage.setItem("tasks", JSON.stringify(savedTasksToRemoveFiltered));
    displayNotification();
  });

  $(".navbar__button").on("click", function () {
    if ($(".tasklist").is(":visible")) {
      $(".tasklist").fadeOut();
    } else {
      $(".tasklist").fadeIn();
    }
  });
});
