/**
 *  creates collapsible
 * for more info refer:https://materializecss.com/collapsible.html
 * @param {Array} collapsible_date json array
 */
const empty_content = `<div ><h3 style="margin: 20px">Nothing to show...</h3></div>`;
const loading_content =    `<div class="botTyping" style="background: #ffffff; max-width: 100%; width: 100%; height:100%; margin:0; display: flex;justify-content: center;align-items: center;">
                                <div class="bounce1"></div>
                                <div class="bounce2"></div>
                                <div class="bounce3"></div>
                            </div>`;
const unsupported_tip = `<div style="margin-left:5%; margin-top:5px; margin-bottom: 10px">⚠️ {Python} is not supported temporarily. We recommend Java related knowledge for you.</div>`;
user_language = "";
language_name = "";
query_text = "";
language = "";

function createCollapsible(collapsible_data, type, is_supported_lang, is_first) {
    // var collapsible_confidence = `<div style="margin-top: 10px;margin-bottom: 10px;margin-left: 5%;">(Confidence:${confidence})</div>`;
    // collapsible_confidence = ``;
    var collapsible_lang_tip = is_supported_lang?``:`<div style="margin-left:1%; margin-top:5px; margin-bottom: 10px">⚠️ ${language_name} is not supported temporarily. We recommend Java related knowledge for you.</div>`;
    var collapsible_title;
    var title_attach = is_first?" class=\"layui-this\"":"";
    var contents_attach = is_first?" layui-show":"";
    var collapsible_content = "";
    switch(type) {
        case "search_api_by_task":
            collapsible_title = `<li${title_attach} id="${type+'_tag'}">API</li>`;
            if (jQuery.isEmptyObject(collapsible_data)) {
                //collapsible_title = `<li${title_attach} id="${type+'_tag'}" onclick="query('${type}')">API</li>`;
                //query(type);
                break;
            }
            collapsible_content = API(collapsible_data);
            break;            
        case "search_code_by_task":
            collapsible_title = `<li${title_attach} id="${type+'_tag'}">Code</li>`;
            if (jQuery.isEmptyObject(collapsible_data)) {
                //collapsible_title = `<li${title_attach} id="${type+'_tag'}" onclick="query('${type}')">Code</li>`;
                //query(type);
                break;
            }
            collapsible_content = Code(collapsible_data);
            break;  
        case "search_post_by_irqa":
            collapsible_title = `<li${title_attach} id="${type+'_tag'}">SO Question</li>`;
            if (jQuery.isEmptyObject(collapsible_data)) {
                //collapsible_title = `<li${title_attach} id="${type+'_tag'}" onclick="query('${type}')">SO Question</li>`;
                //query(type);
                break;
            }
            collapsible_content = SO(collapsible_data);
            break;  
        case "search_tutorial_by_task":
            collapsible_title = `<li${title_attach} id="${type+'_tag'}">Tutorial</li>`;
            if (jQuery.isEmptyObject(collapsible_data)) {
                //collapsible_title = `<li${title_attach} id="${type+'_tag'}" onclick="query('${type}')">Tutorial</li>`;
                //query(type);
                break;
            }
            collapsible_content = Tutorial(collapsible_data);
            break;  
        case "search_third_library_by_task":
            collapsible_title = `<li${title_attach} id="${type+'_tag'}">Library</li>`;
            if (jQuery.isEmptyObject(collapsible_data)) {
                //collapsible_title = `<li${title_attach} id="${type+'_tag'}" onclick="query('${type}')">Library</li>`;
                //query(type);
                break;
            }
            collapsible_content = Library(collapsible_data);
            break;  
        case "search_api_knowledge_by_kbqa":
            collapsible_title = `<li${title_attach} id="${type+'_tag'}">API Knowledge</li>`;
            if (jQuery.isEmptyObject(collapsible_data)) {
                //collapsible_title = `<li${title_attach} id="${type+'_tag'}" onclick="query('${type}')">API Knowledge</li>`;
                //query(type);
                break;
            }
            collapsible_content = Knowledge(collapsible_data);
            break;
        case "search_issue_by_task":
            collapsible_title = `<li${title_attach} id="${type+'_tag'}">Issue</li>`;
            if (jQuery.isEmptyObject(collapsible_data)) {
                //collapsible_title = `<li${title_attach} id="${type+'_tag'}" onclick="query('${type}')">Issue</li>`;
                //query(type);
                break;
            }
            collapsible_content = Issue(collapsible_data);
            break;
<<<<<<< HEAD
        // case "search_concept_by_sckg":
        //     collapsible_title = `<li${title_attach}>Concept</li>`;
        //     collapsible_content = Concept(collapsible_data);
        //     break;
=======
        case "search_concept_by_sckg":
            collapsible_title = `<li${title_attach} id="${type+'_tag'}">Concept</li>`;
            if (jQuery.isEmptyObject(collapsible_data)) {
                //collapsible_title = `<li${title_attach} id="${type+'_tag'}" onclick="query('${type}')">Concept</li>`;
                //query(type);
                break;
            }
            collapsible_content = Concept(collapsible_data);
            break;
>>>>>>> c7ecb7cf331979c7b391418e3442be23cff35745
        case "search_answer_by_qa":
            collapsible_title = `<li${title_attach} id="${type+'_tag'}">QA</li>`;
            if (jQuery.isEmptyObject(collapsible_data)) {
                //collapsible_title = `<li${title_attach} id="${type+'_tag'}" onclick="query('${type}')">QA</li>`;
                //query(type);
                break;
            }
            collapsible_content = QA(collapsible_data);
            break;
        default:
            return
    }
    const collapsible_contents = `<div class="layui-tab-item${contents_attach}" style="overflow-y: scroll;height: 100%;padding-top:5px;" id="${type}">${collapsible_lang_tip}${collapsible_content}</div>`;
    $(collapsible_title).appendTo(".layui-tab-title");
    $(collapsible_contents).appendTo(".layui-tab-content");
    if (jQuery.isEmptyObject(collapsible_data)) {
        query(type);
    }
    hljs.highlightAll();
    // initialize the collapsible
    $(".collapsible").collapsible();
    scrollToBottomOfResults();
}

function SO(collapsible_data) {
    var collapsible_list = "";
    var len = collapsible_data.length;
    if (len == 0) 
        return empty_content;
    if (len > 5) {
        for (let i = 0; i < len; i += 1) {
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div><div class="collapsible-body">
            <a style="white-space: pre-line; color:blue;" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a><br>
            <span style="white-space: pre-line;">${collapsible_data[i].answer}</span></div></li>`;
        }
    } else {
        for (let i = 0; i < len; i += 1) {
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div><div class="uncollapsible-body">
            <a style="white-space: pre-line; color:blue;" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a><br>
            <span style="white-space: pre-line;">${collapsible_data[i].answer}</span></div></li>`;
        }
    }
    return `<ul class="collapsible" style="list-style-type: none;">${collapsible_list}</ul>`;
}

function Library(collapsible_data) {
    var collapsible_list = "";
    var len = collapsible_data.length;
    if (len == 0) 
        return empty_content;
    if (len > 5) {
        for (let i = 0; i < len; i += 1) {
            let tags = '';
            for (var key in collapsible_data[i]) {
                let tag = "";
                if (key=="title"||key=="id")
                    continue;
                if (key=="url") {
                    tag = `<b>${key}: </b><a style="white-space: pre-line; color:blue; text-decoration: underline" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a><br>`;
                } else {
                    tag = `<b>${key}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i][key])}</span><br>`;
                }
                tags += tag;
            }
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div>
            <div class="collapsible-body">${tags}</div></li>`;
        }
    } else {
        for (let i = 0; i < len; i += 1) {
            let tags = '';
            for (var key in collapsible_data[i]) {
                let tag = "";
                if (key=="title"||key=="id")
                    continue;
                if (key=="url") {
                    tag = `<b>${key}: </b><a style="white-space: pre-line; color:blue; text-decoration: underline" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a><br>`;
                } else {
                    tag = `<b>${key}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i][key])}</span><br>`;
                }
                tags += tag;
            }
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div>
            <div class="uncollapsible-body">${tags}</div></li>`;
        }
    }
    return `<ul class="collapsible" style="list-style-type: none;">${collapsible_list}</ul>`;
}

function Issue(collapsible_data) {
    var collapsible_list = "";
    var len = collapsible_data.length;
    if (len == 0) 
        return empty_content;
    if (len > 5) {
        for (let i = 0; i < len; i += 1) {
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div><div class="collapsible-body">
            <a style="white-space: pre-line;" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a></div></li>`;
        }
    } else {
        for (let i = 0; i < len; i += 1) {
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div><div class="uncollapsible-body">
            <a style="white-space: pre-line;" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a></div></li>`;
        }
    }
    return `<ul class="collapsible" style="list-style-type: none;">${collapsible_list}</ul>`;
}

<<<<<<< HEAD
// function Concept(collapsible_data) {
//     var collapsible_list = "";
//     var len = collapsible_data.length
//     if (len > 5) {
//         for (let i = 0; i < len; i += 1) {
//             let tags = '';
//             for (var key in collapsible_data[i]) {
//                 let tag = "";
//                 if (key=="title"||key=="id")
//                     continue;
//                 if (key=="url") {
//                     tag = `<b>${key}: </b><a style="white-space: pre-line; color:blue; text-decoration: underline" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a><br>`;
//                 } else if (key=="relations") {
//                     var relations = collapsible_data[i].relations;
//                     for (var relation in relations) {
//                         tag += `<b>${relation}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i].relations[relation])}</span><br>`
//                     }
//                 } else {
//                     tag = `<b>${key}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i][key])}</span><br>`;
//                 }
//                 tags += tag;
//             }
//             collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div>
//             <div class="collapsible-body">${tags}</div></li>`;
//         }
//     } else {
//         for (let i = 0; i < len; i += 1) {
//             let tags = '';
//             for (var key in collapsible_data[i]) {
//                 let tag = "";
//                 if (key=="title"||key=="id")
//                     continue;
//                 if (key=="url") {
//                     tag = `<b>${key}: </b><a style="white-space: pre-line; color:blue; text-decoration: underline" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a><br>`;
//                 } else if (key=="relations") {
//                     var relations = collapsible_data[i].relations;
//                     for (var relation in relations) {
//                         tag += `<b>${relation}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i].relations[relation])}</span><br>`
//                     }
//                 } else {
//                     tag = `<b>${key}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i][key])}</span><br>`;
//                 }
//                 tags += tag;
//             }
//             collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div>
//             <div class="uncollapsible-body">${tags}</div></li>`;
//         }
//     }
//     return `<ul class="collapsible" style="list-style-type: none;">${collapsible_list}</ul>`;
// }
=======
function Concept(collapsible_data) {
    var collapsible_list = "";
    var len = collapsible_data.length;
    if (len == 0) 
        return empty_content;
    if (len > 5) {
        for (let i = 0; i < len; i += 1) {
            let tags = '';
            for (var key in collapsible_data[i]) {
                let tag = "";
                if (key=="title"||key=="id")
                    continue;
                if (key=="url") {
                    tag = `<b>${key}: </b><a style="white-space: pre-line; color:blue; text-decoration: underline" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a><br>`;
                } else if (key=="relations") {
                    var relations = collapsible_data[i].relations;
                    for (var relation in relations) {
                        tag += `<b>${relation}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i].relations[relation])}</span><br>`
                    }
                } else {
                    tag = `<b>${key}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i][key])}</span><br>`;
                }
                tags += tag;
            }
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div>
            <div class="collapsible-body">${tags}</div></li>`;
        }
    } else {
        for (let i = 0; i < len; i += 1) {
            let tags = '';
            for (var key in collapsible_data[i]) {
                let tag = "";
                if (key=="title"||key=="id")
                    continue;
                if (key=="url") {
                    tag = `<b>${key}: </b><a style="white-space: pre-line; color:blue; text-decoration: underline" href="${collapsible_data[i].url}" target="_blank">${contentFormat(collapsible_data[i].url)}</a><br>`;
                } else if (key=="relations") {
                    var relations = collapsible_data[i].relations;
                    for (var relation in relations) {
                        tag += `<b>${relation}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i].relations[relation])}</span><br>`
                    }
                } else {
                    tag = `<b>${key}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[i][key])}</span><br>`;
                }
                tags += tag;
            }
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[i].title)}</div>
            <div class="uncollapsible-body">${tags}</div></li>`;
        }
    }
    return `<ul class="collapsible" style="list-style-type: none;">${collapsible_list}</ul>`;
}
>>>>>>> c7ecb7cf331979c7b391418e3442be23cff35745

function Code(collapsible_data) {
    var collapsible_lists = "";
    var nav_bar = `<ul class="nav_list">`;
    var parentID = "search_code_by_task";
    if (jQuery.isEmptyObject(collapsible_data))
        return empty_content;
    for (var key in collapsible_data) {
        let len = collapsible_data[key].length;
        if (len == 0) continue;
        let collapsible_list = "";
        let elementID;
        let listTitle;
        switch(key) {
            case "search_code_by_task":
                elementID = "task_code";
                listTitle = "Task";
                break;
            case "search_code_by_api":
                elementID = "api_code";
                listTitle = "API";
                break;
            default:
        }
        nav_bar += `<li><a style="white-space: pre-line; color:blue; text-decoration: underline" onclick="scrollToElement('${parentID}', '${elementID}')" target="_blank">${listTitle}</a></li>`
        for (let i = 0; i < len; i += 1) {
            let url = collapsible_data[key][i].url;
            if (key == "search_code_by_task") {
                collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[key][i].title)}</div><div class="collapsible-body">
                <b>source: </b><a style="white-space: pre-line; color:blue; text-decoration: underline" href="${collapsible_data[key][i].url}" target="_blank">${contentFormat(collapsible_data[key][i].url)}</a><br></br>
                <pre><code style="font-family: consolas, Menlo, 'PingFang SC', 'Microsoft YaHei', monospace;">${contentFormat(collapsible_data[key][i].description)}</code></pre></div></li>`;
            } else {
                let urls = url.split(" ");
                collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[key][i].title)}</div><div class="collapsible-body">
                <b>source: </b>${parseMD(urls)}<br></br>
                <pre><code style="font-family: consolas, Menlo, 'PingFang SC', 'Microsoft YaHei', monospace;">${contentFormat(collapsible_data[key][i].description)}</code></pre></div></li>`;           
            }
        }
        collapsible_lists += `<div style="margin-top: 10px;margin-bottom: 10px;margin-left: 40px;" id="${elementID}"><b>${listTitle}</b></div>
        <ul class="collapsible" style="list-style-type: none;">${collapsible_list}</ul>`;
    }
    nav_bar += `</ul><br>`;
    var collapsible_content = nav_bar + collapsible_lists;
    return collapsible_content;
}

function API(collapsible_data) {
    var collapsible_lists = "";
    var nav_bar = `<ul class="nav_list">`;
    var parentID = "search_api_by_task";
    if (jQuery.isEmptyObject(collapsible_data))
        return empty_content;
    for (var key in collapsible_data) {
        let len = collapsible_data[key].length;
        if (len == 0) continue;
        let collapsible_list = "";
        let elementID;
        let listTitle;
        switch(key) {
            case "package":
                elementID = "package";
                listTitle = "Package"
                break;
            case "class":
                elementID = "class";
                listTitle = "Class"
                break;
            case "method":
                elementID = "method";
                listTitle = "Method"
                break;
            case "field":
                elementID = "field";
                listTitle = "Field";
                break;
            default:
        }
        nav_bar += `<li><a style="white-space: pre-line; color:blue; text-decoration: underline" onclick="scrollToElement('${parentID}', '${elementID}')" target="_blank">${listTitle}</a></li>`
        for (let i = 0; i < len; i += 1) {
            let tags = ``;
            for (var innner_key in collapsible_data[key][i]) {
                let tag = ``;
                if (innner_key=="title"||innner_key=="id")
                    continue;
                if (innner_key=="url") {
                    var urls = collapsible_data[key][i].url.split(" ");
                    tag = `<b>${innner_key}: </b>${parseMD(urls)}<br>`;
                } else {
                    tag = `<b>${innner_key}: </b><span style="white-space: pre-line;">${contentFormat(collapsible_data[key][i][innner_key])}</span><br>`;
                }
                tags += tag;
            }
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[key][i].title)}</div>
            <div class="collapsible-body">${tags}</div></li>`;
        }
        collapsible_lists += `<div style="margin-top: 10px;margin-bottom: 10px;margin-left: 40px;" id="${elementID}"><b>${listTitle}</b></div>
        <ul class="collapsible" style="list-style-type: none;">${collapsible_list}</ul>`;
    }

    nav_bar += `</ul><br>`;
    var collapsible_content = nav_bar + collapsible_lists;
    return collapsible_content;
}

function Tutorial(collapsible_data) {
    var collapsible_lists = ``;
    var nav_bar = `<ul class="nav_list">`;
    var parentID = "search_tutorial_by_task";
    if (jQuery.isEmptyObject(collapsible_data))
        return empty_content;
    for (var key in collapsible_data) {
        let collapsible_list = "";
        let len = collapsible_data[key].length;
        let elementID;
        let listTitle;
        switch(key) {
            case "search_tutorial_by_task_en":
                elementID = "en_tutorial";
                listTitle = "EN Tutorial"
                break;
            case "search_tutorial_by_task_cn":
                elementID = "cn_tutorial";
                listTitle = "CN Tutorial"
                break;
            default:
        }
        nav_bar += `<li><a style="white-space: pre-line; color:blue; text-decoration: underline" onclick="scrollToElement('${parentID}', '${elementID}')" target="_blank">${listTitle}</a></li>`
        for (let i = 0; i < len; i += 1) {
            var sub_title = collapsible_data[key][i].sub_title;
            var related_tutorial = collapsible_data[key][i].related_tutorial;
            collapsible_list += `<li><div class="collapsible-header">${contentFormat(collapsible_data[key][i].title)}</div>
            <div class="collapsible-body">
            <a style="white-space: pre-line; color:blue;margin-bottom: 5px;" href="${collapsible_data[key][i].url}" target="_blank">${contentFormat(collapsible_data[key][i].url)}</a><br>
            <span style="white-space: pre-line;">${contentFormat(collapsible_data[key][i].describe)}</span><br>`;
            if (!$.isEmptyObject(sub_title)) {
                collapsible_list += `<b>sub title: </b><br>`;
                for (var sub_key1 in sub_title) {
                    collapsible_list += `<a style="white-space: pre-line; color: blue; text-decoration: underline" href="${collapsible_data[key][i].sub_title[sub_key1]}">${sub_key1}</a><br>`;
                }
            }
            if (!$.isEmptyObject(related_tutorial)) {
                collapsible_list += `<b>related tutorial: </b><br>`;
                for (var sub_key2 in related_tutorial) {
                    collapsible_list += `<a style="white-space: pre-line; color: blue; text-decoration: underline" href="${collapsible_data[key][i].related_tutorial[sub_key2]}">${sub_key2}</a><br>`;
                }
            }
            
            collapsible_list += `</div></li>`;
        }
        collapsible_lists += `<div style="margin-top: 10px;margin-bottom: 10px;margin-left: 40px;" id="${elementID}"><b>${listTitle}</b></div>
        <ul class="collapsible" style="list-style-type: none;">${collapsible_list}</ul>`;
    }
    nav_bar += `</ul>`;
    var collapsible_content = nav_bar + collapsible_lists;
    return collapsible_content;
}

function QA(collapsible_data) {
    var collapsible_lists = ``;
    var nav_bar = `<ul class="nav_list">`;
    var parentID = "search_answer_by_qa";
    if (jQuery.isEmptyObject(collapsible_data))
        return empty_content;
    for (var key in collapsible_data) {
        let collapsible_list = "";
        let len = collapsible_data[key].length;
        let elementID;
        let listTitle;
        switch(key) {
            case "search_en_tutorial_answer":
                elementID = "en_qa";
                listTitle = "EN QA"
                break;
            case "search_cn_tutorial_answer":
                elementID = "cn_qa";
                listTitle = "CN QA"
                break;
            default:
        }
        nav_bar += `<li><a style="white-space: pre-line; color:blue; text-decoration: underline" onclick="scrollToElement('${parentID}', '${elementID}')" target="_blank">${listTitle}</a></li>`
        for (let i = 0; i < len; i += 1) {

            let str1 = collapsible_data[key][i].sub_titles;
            let str2 = collapsible_data[key][i].url_related_search;
            let collapsible_item = `<li><div class="uncollapsible-body">
            <a style="white-space: pre-line; color:blue; text-decoration: underline; font-size: 18px; font-weight: normal; line-height: 22px;" href="${collapsible_data[key][i].url}" target="_blank">${contentFormat(collapsible_data[key][i].title)}</a><br>
            <span style="white-space: pre-line; font-size: 13px;">${contentFormat(collapsible_data[key][i].answer)}</span><br>`;
            collapsible_item = `<li><div class="collapsible-header">${contentFormat(collapsible_data[key][i].title)}</div>
            <div class="collapsible-body">
            <a style="white-space: pre-line; color:blue;margin-bottom: 5px;" href="${collapsible_data[key][i].url}" target="_blank">${contentFormat(collapsible_data[key][i].url)}</a><br>
            <span style="white-space: pre-line;">${contentFormat(collapsible_data[key][i].answer)}</span><br>`;
            if (str1.length + str2.length > 0) {
                let list1 = str1.split(", ");
                let list2 = str2.split(", ");
                collapsible_item += `<b>related search: </b><br>`;
                for (let j = 0; j < list1.length; j++) {
                    if (list1[j] != "") {
                        collapsible_item += `<a style="white-space: pre-line; text-decoration: underline; color:blue;" onclick="copy('${list1[j]}')">${contentFormat(list1[j])}</a><br>`;
                    }
                }
                for (let j = 0; j < list2.length; j++) {
                    if (list2[j] != "") {
                        collapsible_item += `<a style="white-space: pre-line; text-decoration: underline; color:blue;" onclick="copy('${list2[j]}')">${contentFormat(list2[j])}</a><br>`;
                    }
                }
            }
            collapsible_item += `<br></div></li>`;

            collapsible_list += collapsible_item;
        }
        collapsible_lists += `<div style="margin-top: 10px;margin-bottom: 10px;margin-left: 40px;" id="${elementID}"><b>${listTitle}</b></div>
        <ul class="collapsible" style="list-style-type: none;">${collapsible_list}</ul>`;
    }
    nav_bar += `</ul>`;
    var collapsible_content = nav_bar + collapsible_lists;
    return collapsible_content;
}

function Knowledge(collapsible_data) {
    var collapsible_list = "";
    return collapsible_list;
}

function parseMD(mds) {
    var len = mds.length;
    var result = "";
    for (let j = 0; j < len; j += 1) {
        let str = mds[j];
        let url_start = str.indexOf('(') + 1;
        let url_end = str.length - 1;
        let tag_start = 1;
        let tag_end = str.indexOf(']');
        let url = str.slice(url_start, url_end);
        let url_tag = str.slice(tag_start, tag_end);
        if (j > 0) {
            result += `<span>, <span>`;
        }
        result += `<a style="white-space: pre-line; color:blue; text-decoration: underline" href="${url}" target="_blank">${contentFormat(url_tag)}</a>`;
        return result;
    } 
}

function scrollToElement(parent, element) {
    let item = document.getElementById(element); // 指定的元素
    let wrapper = document.getElementById(parent);  // 其父元素 - 必须是产生滚动条的元素
    
    wrapper.scrollTo(0 , item.offsetTop-45); // 竖向
}

function contentFormat(content) {
    let result = content;
    if(typeof(result)=='string'&&result!=""&&result!=null&&result!=undefined) {
        result = result.replace(/</g,"&lt;");
        result = result.replace(/>/g,"&gt;");
    }
    return result;
}

function copy(keyword) {
    $("#userInput").val(keyword);
}

function query (type) {
    var url = "http://47.101.216.0/cerebro/";
    switch (type) {
        case "search_api_by_task":
            url += "api/query";
            break;            
        case "search_code_by_task":
            url += "code/query";
            break;  
        case "search_post_by_irqa":
            url += "so/query";
            break;  
        case "search_tutorial_by_task":
            url += "tutorial/query";
            break;  
        case "search_third_library_by_task":
            url += "library/query";
            break;
        case "search_issue_by_task":
            url += "issue/query";
            break;
        case "search_concept_by_sckg":
            url += "concept/query";
            break;
        case "search_answer_by_qa":
            url += "answer/query";
            break;
        default:
    }
    // var words = type.split("_");
    // simpleType = words[words.length-3];
    // url += simpleType + "/query";
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            query: query_text,
            language: language
        }),
        beforeSend: function () {
            document.getElementById(type).innerHTML = loading_content;
        },
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);
            if (botResponse.data == null) {
                document.getElementById(type).innerHTML = empty_content;
            } else {
                var collapsible_data = botResponse.data.data;
                var lang_tip = botResponse.data.extra.is_supported_lang?``:`<div style="margin-left:1%; margin-top:5px; margin-bottom: 10px">⚠️ ${language_name} is not supported temporarily. We recommend Java related knowledge for you.</div>`;
                var collapsible_content = "";
                switch (type) {
                    case "search_api_by_task":
                        collapsible_content = API(collapsible_data);
                        break;            
                    case "search_code_by_task":
                        collapsible_content = Code(collapsible_data);
                        break;  
                    case "search_post_by_irqa":
                        collapsible_content = SO(collapsible_data);
                        break;  
                    case "search_tutorial_by_task":
                        collapsible_content = Tutorial(collapsible_data);
                        break;  
                    case "search_third_library_by_task":
                        collapsible_content = Library(collapsible_data);
                        break;
                    case "search_issue_by_task":
                        collapsible_content = Issue(collapsible_data);
                        break;
                    case "search_concept_by_sckg":
                        collapsible_content = Concept(collapsible_data);
                        break;
                    case "search_answer_by_qa":
                        collapsible_content = QA(collapsible_data);
                        break;
                    default:
                }
                document.getElementById(type).innerHTML = lang_tip + collapsible_content;
                $(".collapsible").collapsible();
            }
            
        },
        error(xhr, textStatus) {
            // if there is no response from rasa server
            document.getElementById(type).innerHTML = empty_content;
            console.log("Error from bot end: ", textStatus);
        },
    });
}