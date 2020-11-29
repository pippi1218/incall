//GASに反映させるときターミナルで　clasp push

// line developersに書いてあるChannel Access Token
var LINE_TOKEN = "2N+vAwXBsovMpMj+lEcn+6iH6jH8Wp7Vum6H7DrZ2SipZGP97kCHhMmDlEqno8UtC8x+6salxy8hH25NMa+l7fUVU7x8GRpRThFknm4Rxhvtm7ai3huIYm/2O4fXxkF7F5uyCOk4nk8xAZUw7wtSfAdB04t89/1O/w1cDnyilFU="
var url = "https://api.line.me/v2/bot/message/reply";

/**
* reply_tokenを使って同じメッセージをreplyする
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
* postされたときの処理
*/
function doPost(event) {
    var json = JSON.parse(event.postData.contents); //LINEからWebhook（HTTPリクエスト）で送られてきたデータ(JSON形式)を変換
    var userMessage = json.events[0].message.text; //受信したメッセージ内容
    
    sameReply(json);
}