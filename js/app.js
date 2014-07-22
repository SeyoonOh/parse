/**
 * Created by OSYnLHJ on 2014-07-22.
 */
var parseID = "zef3BeJT76iMxcl5omOQp6F7qauE3G5e87g29tk2";
var parseRestKey = "1A04HTjaDBVtRHpO8uzSUlDO5kbgr6W4GGWiyLn6";

$(function() {

    getMessages();
    $("#send").click(function () {
        var username = $('input[name=username]').attr('value');
        var message = $('input[name=message]').attr('value');
        console.log(username);
        console.log('!');

        $.ajax({
            url: 'https://api.parse.com/1/classes/MessageBoard',
            headers: {
                'X-Parse-Application-Id' : parseID,
                'X-Parse-REST-API-Key' : parseRestKey
            },
            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            data: JSON.stringify({
                'username': username,
                'message': message
            }),
            type: 'POST',
            success: function() {
                console.log('sent');
                getMessages();
            },
            error: function() {
                console.log('error');
            }
        });
    });
})

function getMessages() {

    $.ajax({
        url: 'https://api.parse.com/1/classes/MessageBoard',
        headers: {
            'X-Parse-Application-Id' : parseID,
            'X-Parse-REST-API-Key' : parseRestKey
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function() {
            console.log('get');
            updateView(data);
        },
        error: function() {
            console.log('error');
        }
    });

}

function updateView(messages) {
    var table = $('.table tbody');
    table.html('');
    $.each(messages.results, function (index, value) {
        var trEl =
            $('<tr><td>'
                + value.username
                + '</td><td>'
                + value.message
                + '</td></tr>');
        table.append(trEl);
    });
    console.log(messages);
}