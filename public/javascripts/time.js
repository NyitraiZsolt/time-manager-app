const API_URL = {
    START: '/time-frame/start',
    STOP: '/time-frame/stop',
    INPROGRESS: '/time-frame/inprogress'
};


$(".start-button").on('click', function (e) {
    const event = this.parentElement.id;
    const time = getCurrentTime();
    console.log('start e: ', event);

    start(event, time);

    // this.style.display = 'none';
    $(this).hide();
    //TODO show stop button
    $(`#${event} .stop-button`).show();
});

$(".stop-button").on('click', function (e) {
    const event = this.parentElement.id;
    const time = getCurrentTime();
    console.log('stop e: ', event);

    stop(event, time);

    //this.style.display = 'none';
    $(this).hide();
    $(`#${event} .start-button`).show();
});

function getCurrentTime() {
    let dNow = new Date();
    let currentTime = (dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes());
    return currentTime;
}


function start(event, time) {
    $.ajax({
        url: API_URL.START,
        method: 'POST',
        data: {
            event: event,
            currentTime: time
        }
    }).done(function (response) {
        console.log('response', response);
    });
}

function stop(event, time) {
    $.ajax({
        url: API_URL.STOP,
        method: 'POST',
        data: {
            event: event,
            currentTime: time
        }
    }).done(function (response) {
        console.log('response', response);
    });
}

function getInProgress() {
    $.ajax({
        url: API_URL.INPROGRESS,
        method: 'GET'
    }).done(function (inProgressActions) {
        console.log('response', inProgressActions);
        $(`.container .start-button`).show();
        inProgressActions.forEach(function(inProgressAction) {
            const event = inProgressAction.event;
            console.info(event);
            $(`#${event} .stop-button`).show();
            $(`#${event} .start-button`).hide();
        });
    });
}

getInProgress();

// for external API USE http://nick:3000/agenda
// window.index = {
//     getRow: function(currentTime) {
//         return "<tr>" +
//             "<td>" + `time.event` + "</td>" +
//             "<td>" + `time.start` + "</td>" +
//             "<td>" + `time.stop` + "</td>" +
//             `<td>` +
//             `</td>` +
//             "</tr>";
//     },
//
//     load: function () {
//         $.ajax({
//             url: API_URL.READ,
//             method: "GET"
//         }).done(function (time) {
//             console.info('done:', time);
//             index.display(persons);
//         });
//     },
//
//     getActionRow: function() {
//         return '<tr>' +
//             '<td><input type="text" required name="event"></td>' +
//             '<td><input type="text" name="start"></td>' +
//             '<td><input type="text" required name="stop"></td>' +
//             '</tr>';
//     },
//
//
//     add: function(currentTime) {
//         $.ajax({
//             url: API_URL.CREATE,
//             method: "POST",
//             data: {
//                 currentTime: currentTime
//             }
//         }).done(function (response) {
//             if (response.success) {
//                 index.load();
//             }
//         });
//     },
//
//     save: function(currentTime) {
//         $.ajax({
//             url: API_URL.UPDATE,
//             method: "POST",
//             data: {
//                 currentTime: currentTime
//             }
//         }).done(function (response) {
//             if (response.success) {
//                 editId = '';
//                 index.load();
//             }
//         });
//     },
//
// //TODO
//     display: function(currentTime) {
//         window.times = times;
//         var rows = '';
//
//         times.forEach(time => rows += index.getRow(time));
//         rows += index.getActionRow();
//         $(`#start-stop tbody`).html(rows);
//     }
// };

// var times = [];
// console.info('loading data');
// index.load();
