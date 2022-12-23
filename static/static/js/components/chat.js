/**
 * scroll to the bottom of the chats after new message has been added to chat
 */
const converter = new showdown.Converter();
function scrollToBottomOfResults() {
    const terminalResultsDiv = document.getElementById("chats");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}


/**
 * Set user response on the chat screen
 * @param {String} message user message
 */
function setUserResponse(message) {
    const user_response = `<img class="userAvatar" src='./static/img/userAvatar.jpg'><p class="userMsg">${message} </p><div class="clearfix"></div>`;
    $(user_response).appendTo(".chats").show("slow");

    $(".usrInput").val("");
    scrollToBottomOfResults();
    showBotTyping();
    $(".suggestions").remove();
}


/**
 * returns formatted bot response
 * @param {String} text bot message response's text
 *
 */
function getBotResponse(text) {
    botResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><span class="botMsg">${text}</span><div class="clearfix"></div>`;
    return botResponse;
}

/**
 * renders bot response on to the chat screen
 * @param {Array} response json array containing different types of bot response
 *
 * for more info: `https://rasa.com/docs/rasa/connectors/your-own-website#request-and-response-format`
 */
function setBotResponse(response) {
    // renders bot response after 500 milliseconds
    setTimeout(() => {
        hideBotTyping();
        if (response.length < 1) {
            // if there is no response from Rasa, send  fallback message to the user
            const fallbackMsg = "I am facing some issues, please try again later!!!";

            const BotResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><p class="botMsg">${fallbackMsg}</p><div class="clearfix"></div>`;

            $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
            scrollToBottomOfResults();
        } else {
            // if we get response from Rasa
            for (let i = 0; i < response.length; i += 1) {
                // check if the response contains "text"
                if (Object.hasOwnProperty.call(response[i], "text")) {
                    if (response[i].text != null) {
                        // convert the text to mardown format using showdown.js(https://github.com/showdownjs/showdown);
                        let botResponse;
                        let html = converter.makeHtml(response[i].text);

                        // let text =  converter.makeHtml('# hello, markdown!');
                        // console.log(text);

                        html = html.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<strong>", "<b>").replaceAll("</strong>", "</b>");
                        html = html.replace(/(?:\r\n|\r|\n)/g, '<br>')
                        html = html.replace(/\r\n/g,"<br>")
                        html = html.replaceAll("<a","<a target=\"_blank\"");
                    

                        console.log(html);

                        // if (html.includes("<a")){
                        //   console.log("include a")
                        //     html =html.replaceAll("<a","<a target=\"_blank\"");
                        //     botResponse = getBotResponse(html);
                        //     console.log(botResponse)
                        // }
                        // check for blockquotes
                        if (html.includes("<blockquote>")) {
                            html = html.replaceAll("<br>", "");
                            botResponse = getBotResponse(html);
                        }
                        // check for image
                        if (html.includes("<img")) {
                            html = html.replaceAll("<img", '<img class="imgcard_mrkdwn" ');
                            botResponse = getBotResponse(html);
                        }
                        // check for preformatted text
                        if (html.includes("<pre") || html.includes("<code>")) {

                            botResponse = getBotResponse(html);
                        }
                        // check for list text
                        if (html.includes("<ul") || html.includes("<ol") || html.includes("<li") || html.includes('<h3')) {
                            html = html.replaceAll("<br>", "");
                            // botResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><span class="botMsg">${html}</span><div class="clearfix"></div>`;
                            botResponse = getBotResponse(html);
                        }
                        else {
                            // if no markdown formatting found, render the text as it is.
                            if (!botResponse) {
                                botResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><p class="botMsg">${html}</p><div class="clearfix"></div>`;
                            }
                        }
                        // append the bot response on to the chat screen
                        $(botResponse).appendTo(".chats").hide().fadeIn(1000);
                    }
                }

                // check if the response contains "images"
                if (Object.hasOwnProperty.call(response[i], "image")) {
                    if (response[i].image !== null) {
                        const BotResponse = `<div class="singleCard"><img class="imgcard" src="${response[i].image}"></div><div class="clearfix">`;

                        $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
                    }
                }

                // check if the response contains "buttons"
                if (Object.hasOwnProperty.call(response[i], "buttons")) {
                    if (response[i].buttons.length > 0) {
                        addSuggestion(response[i].buttons);
                    }
                }

                // check if the response contains "attachment"
                if (Object.hasOwnProperty.call(response[i], "attachment")) {
                    if (response[i].attachment != null) {
                        if (response[i].attachment.type === "video") {
                            // check if the attachment type is "video"
                            const video_url = response[i].attachment.payload.src;

                            const BotResponse = `<div class="video-container"> <iframe src="${video_url}" frameborder="0" allowfullscreen></iframe> </div>`;
                            $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
                        }
                    }
                }
                // check if the response contains "custom" message
                if (Object.hasOwnProperty.call(response[i], "custom")) {
                    if (Object.hasOwnProperty.call(response[i].custom, "payload")) {
                        showCustom(response[i].custom, "", false);
                    } else {
<<<<<<< HEAD
                        showCustom(response[i].custom.graph, "", true);
=======
                        var first = true;
                        language = response[i].custom.language;
                        for(var key in response[i].custom) {
                            if (key == "language") continue;
                            var raw = response[i].custom[key];
                            var data;
                            var is_supported_lang = false;
                            if (!jQuery.isEmptyObject(raw)) {
                                data = raw.data;
                                is_supported_lang = raw.extra.is_supported_lang;
                            } else {
                                data = raw;
                            }
                            createCollapsible(data, key, is_supported_lang, first);
                            
                            first = false;
                        }
                        $(window).resize();
>>>>>>> c7ecb7cf331979c7b391418e3442be23cff35745
                    }
                }
            }
            scrollToBottomOfResults();
        }
        $(".usrInput").focus();
    }, 500);
}

function showCustom(response, type, is_first) {
    // check if the custom payload type is "quickReplies"
    if (response.payload === "quickReplies") {
        const quickRepliesData = response.data;
        showQuickReplies(quickRepliesData);
        return;
    }

    // check if the custom payload type is "graph"
    if (response.payload === "graph") {
        const graphData = response.data;
        showGraph(graphData);
        showProfile(graphData)
        return;
    }

    // check if the custom payload type is "pdf_attachment"
    if (response.payload === "pdf_attachment") {
        renderPdfAttachment(response[i]);
        return;
    }

    // check if the custom payload type is "dropDown"
    if (response.payload === "dropDown") {
        const dropDownData = response.data;
        renderDropDwon(dropDownData, type, response.confidence, is_first);
        return;
    }

    // check if the custom payload type is "location"
    if (response.payload === "location") {
        $("#userInput").prop("disabled", true);
        getLocation();
        scrollToBottomOfResults();
        return;
    }

    // check if the custom payload type is "cardsCarousel"
    if (response.payload === "cardsCarousel") {
        const restaurantsData = response.data;
        showCardsCarousel(restaurantsData, type, response.confidence, is_first);
        return;
    }

    // check if the custom payload type is "chart"
    if (response.payload === "chart") {
        /**
         * sample format of the charts data:
         *  var chartData =  { "title": "Leaves", "labels": ["Sick Leave", "Casual Leave", "Earned Leave", "Flexi Leave"], "backgroundColor": ["#36a2eb", "#ffcd56", "#ff6384", "#009688", "#c45850"], "chartsData": [5, 10, 22, 3], "chartType": "pie", "displayLegend": "true" }
         */

        const chartData = response.data;
        const {
            title,
            labels,
            backgroundColor,
            chartsData,
            chartType,
            displayLegend,
        } = chartData;

        // pass the above variable to createChart function
        createChart(
            title,
            labels,
            backgroundColor,
            chartsData,
            chartType,
            displayLegend,
        );

        // on click of expand button, render the chart in the charts modal
        $(document).on("click", "#expand", () => {
            createChartinModal(
                title,
                labels,
                backgroundColor,
                chartsData,
                chartType,
                displayLegend,
            );
        });
        return;
    }

    // check of the custom payload type is "collapsible"
    if (response.payload === "collapsible") {
        // pass the data variable to createCollapsible function
        createCollapsible(response.data, type, response.confidence, is_first);
    }
}

/**
 * sends the user message to the rasa server,
 * @param {String} message user message
 */
function send(message) {
    user_language = $("#language").val();
    language_name = $("#language").innerHTML;
    message = user_language + message;
    $("#userInput").prop('disabled', true);
    $.ajax({
        url: kbqa_url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name: message }),
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

            // if user wants to restart the chat and clear the existing chat contents
            if (message.toLowerCase() === "/restart") {
                $("#userInput").prop("disabled", false);

                // if you want the bot to start the conversation after restart
                // customActionTrigger();
                return;
            }
<<<<<<< HEAD
 
            setBotResponse(botResponse);
            $("#userInput").prop("disabled", false);
             
=======
            if (botResponse.length < 1) {
                var count = 0;
                var sleep = setInterval(function(){
                    $.ajax({
                        url: target_url,
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({ sender: sender_id, message }),
                        async:false, 
                        success(r, s) {
                            console.log("Response from Rasa: ", r, "\nStatus: ", s);
                
                            // if user wants to restart the chat and clear the existing chat contents
                            if (message.toLowerCase() === "/restart") {
                                $("#userInput").prop("disabled", false);
                
                                // if you want the bot to start the conversation after restart
                                // customActionTrigger();
                                return;
                            }
                            console.log("第"+count+"次");
                            if (r.length > 0 || count > 4) {
                                setBotResponse(r);
                                $("#userInput").prop("disabled", false);
                                clearInterval(sleep);
                            } else {
                                count++;
                            }
                        },
                        error(xhr, textStatus) {
                            if (message.toLowerCase() === "/restart") {
                                $("#userInput").prop("disabled", false);
                                // if you want the bot to start the conversation after the restart action.
                                // actionTrigger();
                                // return;
                            }
                
                            // if there is no response from rasa server, set error bot response
                            setBotResponse("");
                            $("#userInput").prop("disabled", false);
                            console.log("Error from bot end: ", textStatus);
                        },
                    });
                }, 10000);
                
            }
            else{
                setBotResponse(botResponse);
                $("#userInput").prop("disabled", false);
                query_text = message;
            }
>>>>>>> c7ecb7cf331979c7b391418e3442be23cff35745
        },
        error(xhr, textStatus) {
            if (message.toLowerCase() === "/restart") {
                $("#userInput").prop("disabled", false);
                // if you want the bot to start the conversation after the restart action.
                // actionTrigger();
                // return;
            }

            // if there is no response from rasa server, set error bot response
            setBotResponse("");
            $("#userInput").prop("disabled", false);
            console.log("Error from bot end: ", textStatus);
        },
    });
}
/**
 * sends an event to the bot,
 *  so that bot can start the conversation by greeting the user
 *
 * `Note: this method will only work in Rasa 1.x`
 */
// eslint-disable-next-line no-unused-vars
function actionTrigger() {
    $.ajax({
        url: `http://localhost:5005/conversations/${sender_id}/execute`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: action_name,
            policy: "MappingPolicy",
            confidence: "0.98",
        }),
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

            if (Object.hasOwnProperty.call(botResponse, "messages")) {
                setBotResponse(botResponse.messages);
            }
            $("#userInput").prop("disabled", false);
        },
        error(xhr, textStatus) {
            // if there is no response from rasa server
            setBotResponse("");
            console.log("Error from bot end: ", textStatus);
            $("#userInput").prop("disabled", false);
        },
    });
}

/**
 * sends an event to the custom action server,
 *  so that bot can start the conversation by greeting the user
 *
 * Make sure you run action server using the command
 * `rasa run actions --cors "*"`
 *
 * `Note: this method will only work in Rasa 2.x`
 */
// eslint-disable-next-line no-unused-vars
function customActionTrigger() {
    var is_eng = document.getElementById("English").innerHTML == "EN √";
    var target_url = is_eng?rasa_server_url:rasa_server_url_chs;
    $.ajax({
        url: target_url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            // tracker: {
            //     sender_id,
            // },
            sender:sender_id,
            name:action_name
        }),
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

            if (Object.hasOwnProperty.call(botResponse, "responses")) {
                setBotResponse(botResponse.responses);
            }
            // console.log(botResponse[0])
            setBotResponse(botResponse);
            $("#userInput").prop("disabled", false);
        },
        error(xhr, textStatus) {
            // if there is no response from rasa server
            setBotResponse("");
            console.log("Error from bot end: ", textStatus);
            $("#userInput").prop("disabled", false);
        },
    });
}



/**
 * clears the conversation from the chat screen
 * & sends the `/resart` event to the Rasa server
 */
function restartConversation() {
    $("#userInput").prop("disabled", true);
    // destroy the existing chart
    $(".collapsible").remove();

    if (typeof chatChart !== "undefined") {
        chatChart.destroy();
    }

    $(".chart-container").remove();
    if (typeof modalChart !== "undefined") {
        modalChart.destroy();
    }
    $(".chats").html("");
    $(".usrInput").val("");
    send("/restart");
}
// triggers restartConversation function.
$("#restart").click(() => {
    restartConversation();
});

/**
 * if user hits enter or send button
 * */
$(".usrInput").on("keyup keypress", (e) => {
    const keyCode = e.keyCode || e.which;

    const text = $(".usrInput").val();
    if (keyCode === 13) {
        if (text === "" || $.trim(text) === "") {
            e.preventDefault();
            return false;
        }
        // destroy the existing chart, if yu are not using charts, then comment the below lines
        $(".layui-tab-title").html("");
        $(".layui-tab-content").html("");
        
        $(".collapsible").remove();
        $(".dropDownMsg").remove();
        if (typeof chatChart !== "undefined") {
            chatChart.destroy();
        }

        $(".chart-container").remove();
        if (typeof modalChart !== "undefined") {
            modalChart.destroy();
        }

        $("#paginated_cards").remove();
        $(".suggestions").remove();
        $(".quickReplies").remove();
        $(".usrInput").blur();
        setUserResponse(text);
        send(text);
        e.preventDefault();
        return false;
    }
    return true;
});

$("#sendButton").on("click", (e) => {
    const text = $(".usrInput").val();
    if (text === "" || $.trim(text) === "") {
        e.preventDefault();
        return false;
    }
    // destroy the existing chart
    $(".layui-tab-title").html("");
    $(".layui-tab-content").html("");

    if (typeof chatChart !== "undefined") {
        chatChart.destroy();
    }

    $(".chart-container").remove();
    if (typeof modalChart !== "undefined") {
        modalChart.destroy();
    }

    $(".suggestions").remove();
    $("#paginated_cards").remove();
    $(".quickReplies").remove();
    $(".usrInput").blur();
    $(".dropDownMsg").remove();
    setUserResponse(text);
    send(text);
    e.preventDefault();
    return false;
});
