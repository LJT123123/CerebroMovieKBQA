
/* module for importing other js files */
function include(file) {
  const script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);
}


// Bot pop-up intro
document.addEventListener("DOMContentLoaded", () => {
  const elemsTap = document.querySelector(".tap-target");
  // eslint-disable-next-line no-undef
  const instancesTap = M.TapTarget.init(elemsTap, {});
  if (instancesTap === null) return;
  instancesTap.open();
  setTimeout(() => {
    instancesTap.close();
  }, 4000);
});

/* import components */
include('./static/js/components/index.js');

window.addEventListener('load', () => {
  // initialization
  $(document).ready(() => {

    // drop down menu for close, restart conversation & clear the chats.
    
    $(".dropdown-trigger").dropdown();
    $(".dropdown-trigger-left").dropdown();

    // initiate the modal for displaying the charts,
    // if you dont have charts, then you comment the below line
    $(".modal").modal();

    // enable this if u have configured the bot to start the conversation.
    //  showBotTyping();
    //  $("#userInput").prop('disabled', true);

    // if you want the bot to start the conversation
     customActionTrigger();
  });
$(".profile_div").toggle();
$(".widget").toggle();
  // Toggle the chatbot screen
// $("#profile_div").click(() => {
   // $(".profile_div").toggle();
    //$(".widget").toggle();
  //});

  // clear function to clear the chat contents of the widget.
  $("#clear").click(() => {
    $(".chats").fadeOut("normal", () => {
      $(".chats").html("");
      $(".chats").fadeIn();
    });
    $(".layui-tab-title").html("");
      $(".layui-tab-content").html("");
  });
  //restart function to restart Cerebro
  $("#restart").click(()=>{
    $(".chats").fadeOut("normal", () => {
      $(".chats").html("");
      $(".chats").fadeIn();
    });
    $(".layui-tab-title").html("");
    $(".layui-tab-content").html("");
    customActionTrigger()
  })

  // close function to close the widget.
  $("#close").click(() => {
    $(".profile_div").toggle();
    $(".widget").toggle();
    scrollToBottomOfResults();
  });

  // switch to EN.
  $("#English").click(() => {
    var eng = document.getElementById("English");
    var chinese = document.getElementById("Chinese");
    if (eng.innerHTML!="EN √") {
      eng.innerHTML = "EN √";
      chinese.innerHTML = "CHS";
      $(".chats").fadeOut("normal", () => {
        $(".chats").html("");
        $(".chats").fadeIn();
      });
      $(".layui-tab-title").html("");
      $(".layui-tab-content").html("");
      customActionTrigger()
    }
    console.log("switch to en");
  });

  // switch to CHS.
  $("#Chinese").click(() => {
    var eng = document.getElementById("English");
    var chinese = document.getElementById("Chinese");
    if (chinese.innerHTML!="CHS √") {
      chinese.innerHTML = "CHS √";
      eng.innerHTML = "ENG";
      $(".chats").fadeOut("normal", () => {
        $(".chats").html("");
        $(".chats").fadeIn();
      });
      $(".layui-tab-title").html("");
      $(".layui-tab-content").html("");
      customActionTrigger()
    }
    console.log("switch to chs");
  });

});
