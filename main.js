//GASに反映させるときターミナルで　clasp push

// line developersに書いてあるChannel Access Token
var LINE_TOKEN = "2N+vAwXBsovMpMj+lEcn+6iH6jH8Wp7Vum6H7DrZ2SipZGP97kCHhMmDlEqno8UtC8x+6salxy8hH25NMa+l7fUVU7x8GRpRThFknm4Rxhvtm7ai3huIYm/2O4fXxkF7F5uyCOk4nk8xAZUw7wtSfAdB04t89/1O/w1cDnyilFU="
var url = "https://api.line.me/v2/bot/message/reply";


/**
 * コマンド一覧を表示
 */
function command(data) {
    
    var postData = {
        "replyToken" : data.events[0].replyToken,
        "messages" : [
            {
                'type':'text',
                'text':"●コマンド一覧\nいんこーる\nこんびに\nつるは\nからおけ"
            }
        ]　
    };

    var headers = {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + LINE_TOKEN,
    };

    var options = {
        "method" : "post",
        "headers" : headers,
        "payload" : JSON.stringify(postData)
    };

    return UrlFetchApp.fetch(url, options);
}


/**
* 同じメッセージを送信する
*/
function sameReply(data) {
    
    var postData = {
        "replyToken" : data.events[0].replyToken,
        "messages" : [
            {
                'type':'text',
                'text':data.events[0].message.text
            }
        ]　
    };

    var headers = {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + LINE_TOKEN,
    };

    var options = {
        "method" : "post",
        "headers" : headers,
        "payload" : JSON.stringify(postData)
    };

    return UrlFetchApp.fetch(url, options);
}

/**
 * 「ぴよぴよ☆」を送信する
 */
function piyoReply(data){
    var postData = {
        "replyToken" : data.events[0].replyToken,
        "messages" : [
            {
                'type':'text',
                'text':"ぴよぴよ☆"
            }
        ]　
    };

    var headers = {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + LINE_TOKEN,
    };

    var options = {
        "method" : "post",
        "headers" : headers,
        "payload" : JSON.stringify(postData)
    };

    return UrlFetchApp.fetch(url, options);
}

/**
 * 「にちゃあ」を送信する
 */
function nichaReply(data){
    var postData = {
        "replyToken" : data.events[0].replyToken,
        "messages" : [
            {
                'type':'text',
                'text':"にちゃあ"
            }
        ]　
    };

    var headers = {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + LINE_TOKEN,
    };

    var options = {
        "method" : "post",
        "headers" : headers,
        "payload" : JSON.stringify(postData)
    };

    return UrlFetchApp.fetch(url, options);
}

/**
 * 「かっこいい」を送信する
 */
function kakkoiReply(data){
    var postData = {
        "replyToken" : data.events[0].replyToken,
        "messages" : [
            {
                'type':'text',
                'text':"天才！"
            }
        ]　
    };

    var headers = {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + LINE_TOKEN,
    };

    var options = {
        "method" : "post",
        "headers" : headers,
        "payload" : JSON.stringify(postData)
    };

    return UrlFetchApp.fetch(url, options);
}

/**
 * 「あほ」を送信する
 */
function ahoReply(data){
    var postData = {
        "replyToken" : data.events[0].replyToken,
        "messages" : [
            {
                'type':'text',
                'text':"あほ！"
            }
        ]　
    };

    var headers = {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + LINE_TOKEN,
    };

    var options = {
        "method" : "post",
        "headers" : headers,
        "payload" : JSON.stringify(postData)
    };

    return UrlFetchApp.fetch(url, options);
}

function weather(data){

}

/**
 * 確認テンプレートを送信
 */
function goConfirm(data){
    var postData = {
        "replyToken" : data.events[0].replyToken,
        "messages" : [
            {
                "type": "template",
                "altText": data.events[0].message.text + "行く？",
                "template": {
                    "type": "confirm",
                    "text": data.events[0].message.text + "行く？",
                    "actions": [
                        {
                            "type": "message",
                            "label": "はい",
                            "text": "行く！"
                        },
                        {
                            "type": "message",
                            "label": "いいえ",
                            "text": "行かない！"
                        }
                    ]
                }
            }
        ]　
    };

    var headers = {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + LINE_TOKEN,
    };

    var options = {
        "method" : "post",
        "headers" : headers,
        "payload" : JSON.stringify(postData)
    };

    return UrlFetchApp.fetch(url, options);
}


/**
* postされたときの処理
*/
function doPost(event) {
    var json = JSON.parse(event.postData.contents); //LINEからWebhook（HTTPリクエスト）で送られてきたデータ(JSON形式)を変換
    var userMessage = json.events[0].message.text; //受信したメッセージ内容
    
    switch (userMessage){
        case "いんこーる"　:
            piyoReply(json);
            break;
        case "なきごえ":
            piyoReply(json);
            break;
        case "やまぐち":
            nichaReply(json);
            break;
        case "まなと":
            kakkoiReply(json);
            break;
        case "みう":
            ahoReply(json);
            break;
        case "こんびに":
        case "つるは":
        case "からおけ":
            goConfirm(json);
            break;
        case "てんき":
            weather(json);
            break;
        case "こまんど":
            command(json);
            break;
        default:
            sameReply(json);
            break;
    }
}