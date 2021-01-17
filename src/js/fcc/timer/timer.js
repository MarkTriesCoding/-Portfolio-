import '../../../scss/fcc/timer.scss';

$(document).ready(function() {
  // $("#pause").hide();
  $("#reset").hide();
  var timeValue = Number($("#timeValue").text());
  var breakValue = Number($("#breakValue").text());
  var myVar;
  var myBreakVar;
  var m;
  var s;
  var started = false;

  $(".minTime").html(timeValue);

  function updateMins() {
    $(".minTime")
      .empty()
      .html(timeValue);
  }

  $("#lessTime").on("click", function() {
    if (started == false) {
      if (timeValue === 0) {
        $("#timeValue").text(timeValue);
        updateMins();
      } else {
        timeValue -= 1;
        $("#timeValue").text(timeValue);
        updateMins();
      }
    }
  });
  $("#moreTime").on("click", function() {
    timeValue += 1;
    $("#timeValue").text(timeValue);
    updateMins();
  });
  $(".breakMinTime").html(breakValue);

  function updateBreak() {
    $(".breakMinTime")
      .empty()
      .html(breakValue);
  }

  $("#lessBreak").on("click", function() {
    if (breakValue === 0) {
      $("#breakValue").text(breakValue);
      updateBreak();
    } else {
      breakValue -= 1;
      $("#breakValue").text(breakValue);
    }
    updateBreak();
  });
  $("#moreBreak").on("click", function() {
    breakValue += 1;
    $("#breakValue").text(breakValue);
    updateBreak();
  });

  function upSize() {
    $(".minTime").animate({
      fontSize: "2.25rem"
    }, 800);
    $(".seconds").animate({
      fontSize: "1.25rem"
    }, 800);
    $(".secTime").animate({
      fontSize: "2.25rem"
    }, 800);
    $(".minutes").animate({
      fontSize: "1.25rem"
    }, 800);
    $(".pomoText").animate({
        lineHeight: "50px",
        opacity: 1
      },
      800
    );
    $(".breakMinTime").animate({
      fontSize: "1.5rem"
    }, 800);
    $(".breakSeconds").animate({
      fontSize: "1.15rem"
    }, 800);
    $(".breakSecTime").animate({
      fontSize: "1.5rem"
    }, 800);
    $(".breakMinutes").animate({
      fontSize: "1.15rem"
    }, 800);
    $(".breakText").animate({
        opacity: 0.5
      },
      800
    );
  }

  function downSize() {
    $(".minTime").animate({
      fontSize: "1.5rem"
    }, 800);
    $(".seconds").animate({
      fontSize: "1.15rem"
    }, 800);
    $(".secTime").animate({
      fontSize: "1.5rem"
    }, 800);
    $(".minutes").animate({
      fontSize: "1.15rem"
    }, 800);
    $(".pomoText").animate({
        lineHeight: "40px",
        opacity: 0.5
      },
      800
    );

    $(".breakMinTime").animate({
      fontSize: "2.25rem"
    }, 800);
    $(".breakSeconds").animate({
      fontSize: "1.25rem"
    }, 800);
    $(".breakSecTime").animate({
      fontSize: "2.25rem"
    }, 800);
    $(".breakMinutes").animate({
      fontSize: "1.25rem"
    }, 800);
    $(".breakText").animate({
        opacity: 1
      },
      800
    );
  }

  $("#start").on("click", function() {
    $("#start").hide(800);
    // pauseCount = 2;
    var minTracker;
    var secTracker;
    var breakMinTracker;
    var breakSecTracker;
    var onCount = 0;

    function starter() {
      onCount += 1;

      if (onCount <= 1) {
        $("#reset").show(600);
        // $("#pause").show(600);
        var myVar = setInterval(function() {
          timerGo();
        }, 1000);
        var m = timeValue - 1;

        var s = 59;

        function timerGo() {
          $(".secTime")
            .empty()
            .html(s);
          $(".minTime")
            .empty()
            .html(m);
          s--;
          secTracker = s;
          if (s == -1) {
            s = 59;
            m--;

            minTracker = m;

            if (m < 0) {
              buzzer.play();
              clearInterval(myVar);

              breakTimer();
            }
          }
        }

        var breakTimer = function() {
          var bs = 59;
          var bm = breakValue - 1;

          function breakTimerGo() {
            downSize();
            $(".breakSecTime")
              .empty()
              .html(bs);
            $(".breakMinTime")
              .empty()
              .html(bm);
            bs--;
            breakSecTracker = bs;
            if (bs == -1) {
              bs = 59;
              bm--;
              breakMinTracker = bm;

              if (bm < 0) {
                buzzer.play();
                clearInterval(myBreakVar);
              }
            }
          }
          var myBreakVar = setInterval(function() {
            breakTimerGo();
            $("#reset").on("click", function() {
              clearInterval(myBreakVar);
            });
          }, 1000);
        };

        $("#reset").on("click", function() {
          upSize();
          clearInterval(myVar);
        });
      }
    }

    starter();
  });



  $("#reset").on("click", function() {
    clearInterval(myVar);
    clearInterval(myBreakVar);

    $("#reset").hide(800);
    $(".minTime")
      .empty()
      .html(timeValue);
    $(".secTime")
      .empty()
      .html(0);
    $(".breakMinTime")
      .empty()
      .html(breakValue);
    $(".breakSecTime")
      .empty()
      .html(0);
    onCount = 0;
    $("#start").show(800);
  });
});
