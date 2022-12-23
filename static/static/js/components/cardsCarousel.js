/**
 * creates horizontally placed cards carousel
 * @param {Array} cardsData json array
 */
function createCardsCarousel_old(cardsData) {
    let cards = "";
    cardsData.map((card_item) => {
        const item = `<div class="carousel_cards in-left">
    <img class="cardBackgroundImage" src=${card_item.image}>
    <div class="cardFooter"> <span class="cardTitle" title="abc">${card_item.title}</span>
    <div class="cardDescription"></div></div></div>`;
        cards += item;
    });
    const cardContents = `<div id="paginated_cards" class="cards"> <div class="cards_scroller">${cards} <span class="arrow prev fa fa-chevron-circle-left "></span> <span class="arrow next fa fa-chevron-circle-right" ></span> </div> </div>`;
    return cardContents;
}

function createCardsCarousel(cardsData) {
    let cards = "";
    cardsData.map((card_item) => {
        const item = `<div class="carousel_cards in-left">
    <img class="cardBackgroundImage" src=${card_item.image}>
    <div class="cardFooter"> <span class="cardTitle" title="abc">${card_item.title}</span>
    <div class="cardDescription">121312132131213</div></div></div>`;
        cards += item;
    });
    const cardContents = `<div id="paginated_cards" class="cards"> <div class="cards_scroller">${cards} <span class="arrow prev fa fa-chevron-circle-left "></span> <span class="arrow next fa fa-chevron-circle-right" ></span> </div> </div>`;
    return cardContents;
}

/**
 * appends cards carousel on to the chat screen
 * @param {Array} cardsToAdd json array
 */
function showCardsCarousel_old(cardsToAdd) {
    const cards = createCardsCarousel(cardsToAdd);

    $(cards).appendTo(".results").show();

    if (cardsToAdd.length <= 2) {
        $(`.cards_scroller>div.carousel_cards:nth-of-type(2)`).fadeIn(3000);
    } else {
        for (let i = 0; i < cardsToAdd.length; i += 1) {
            $(`.cards_scroller>div.carousel_cards:nth-of-type(${i})`).fadeIn(3000);
        }
        $(".cards .arrow.prev").fadeIn("3000");
        $(".cards .arrow.next").fadeIn("3000");
    }

    scrollToBottomOfResults();

    const card = document.querySelector("#paginated_cards");
    const card_scroller = card.querySelector(".cards_scroller");
    const card_item_size = 225;

    /**
     * For paginated scrolling, simply scroll the card one item in the given
     * direction and let css scroll snaping handle the specific alignment.
     */
    function scrollToNextPage() {
        card_scroller.scrollBy(card_item_size, 0);
    }

    function scrollToPrevPage() {
        card_scroller.scrollBy(-card_item_size, 0);
    }

    card.querySelector(".arrow.next").addEventListener("click", scrollToNextPage);
    card.querySelector(".arrow.prev").addEventListener("click", scrollToPrevPage);
    $(".usrInput").focus();
}

function showCardsCarousel(cardsToAdd, type, confidence, is_first) {
    var card_confidence = `<div style="margin-top: 10px;margin-bottom: 10px;margin-left: 5%;">(Confidence:${confidence})</div>`;
    var card_title;
    const cards = createCardsCarousel(cardsToAdd["search_cn_tutorial_answer"]);

    var title_attach = is_first?" class=\"layui-this\"":"";
    var contents_attach = is_first?" layui-show":"";
    switch(type) {
        case "search_api_by_task":
            card_title = `<li${title_attach}>API</li>`;
            break;            
        case "search_code_by_task":
            card_title = `<li${title_attach}>Code</li>`;
            break;  
        case "search_post_by_irqa":
            card_title = `<li${title_attach}>SO Question</li>`;
            break;  
        case "search_tutorial_by_task":
            card_title = `<li${title_attach}>Tutorial</li>`;
            break;  
        case "search_third_library_by_task":
            card_title = `<li${title_attach}>Library</li>`;
            break;  
        case "search_api_knowledge_by_api":
            card_title = `<li${title_attach}>API Knowledge</li>`;
            break;
        case "search_issue_by_task":
            card_title = `<li${title_attach}>Issue</li>`;
            break;
        case "search_answer_by_qa":
            card_title = `<li${title_attach}>QA</li>`;
            break;
        default:
    }

    const card_contents = `<div class="layui-tab-item${contents_attach}" style="overflow-y: scroll;height: 100%;">` + card_confidence + `${cards}</div>`;
    $(card_title).appendTo(".layui-tab-title");
    $(card_contents).appendTo(".layui-tab-content");
    //$(cards).appendTo(".results").show();

    // if (cardsToAdd.length <= 2) {
    //     $(`.cards_scroller>div.carousel_cards:nth-of-type(2)`).fadeIn(3000);
    // } else {
    //     for (let i = 0; i < cardsToAdd.length; i += 1) {
    //         $(`.cards_scroller>div.carousel_cards:nth-of-type(${i})`).fadeIn(3000);
    //     }
    //     $(".cards .arrow.prev").fadeIn("3000");
    //     $(".cards .arrow.next").fadeIn("3000");
    // }

    scrollToBottomOfResults();

    const card = document.querySelector("#paginated_cards");
    const card_scroller = card.querySelector(".cards_scroller");
    const card_item_size = 225;

    /**
     * For paginated scrolling, simply scroll the card one item in the given
     * direction and let css scroll snaping handle the specific alignment.
     */
    function scrollToNextPage() {
        card_scroller.scrollBy(card_item_size, 0);
    }

    function scrollToPrevPage() {
        card_scroller.scrollBy(-card_item_size, 0);
    }

    card.querySelector(".arrow.next").addEventListener("click", scrollToNextPage);
    card.querySelector(".arrow.prev").addEventListener("click", scrollToPrevPage);
    $(".usrInput").focus();
}