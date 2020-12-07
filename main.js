//GASに反映させるときターミナルで　clasp push

// line developersに書いてあるChannel Access Token
var LINE_TOKEN = "2N+vAwXBsovMpMj+lEcn+6iH6jH8Wp7Vum6H7DrZ2SipZGP97kCHhMmDlEqno8UtC8x+6salxy8hH25NMa+l7fUVU7x8GRpRThFknm4Rxhvtm7ai3huIYm/2O4fXxkF7F5uyCOk4nk8xAZUw7wtSfAdB04t89/1O/w1cDnyilFU=";
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
                'text':"●コマンド一覧\nいんこーる\nこんびに\nつるは\nからおけ\nてんき"
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


function weatherForecast(data) {
    // 「city = id」を取得したい地域のidに置き換える(例、東京：130010)
    var response = UrlFetchApp.fetch("https://weather.tsukumijima.net/api/forecast?city=012010");
    var json=JSON.parse(response.getContentText());
    /* 通知されるメッセージ　　他に欲しい情報があったら追加する。 */
    var strBody = "☆" + json["location"]["city"] + "の天気☆"+ "\n";
    strBody += "●今日の天気： " + json["forecasts"][0]["telop"] + "\n";
    strBody += "●最高気温:  " + json["forecasts"][0]["temperature"]["max"]["celsius"] + "℃" + "\n";
    strBody += "●明日の天気： " + json["forecasts"][1]["telop"] + "\n";
    strBody += json["description"]["publicTime_format"]+"の情報です！";

    Reply(data,strBody);
}

  // LINE送信処理
function Reply(data,text) {
    
    var postData = {
        "replyToken" : data.events[0].replyToken,
        "messages" : [
            {
                'type':'text',
                'text':text
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
        case "こんびに":
        case "つるは":
        case "からおけ":
            goConfirm(json);
            break;
        case "てんき":
            weatherForecast(json);
            break;
        case "こまんど":
            command(json);
            break;
        default:
            sameReply(json);
            break;
    }
}