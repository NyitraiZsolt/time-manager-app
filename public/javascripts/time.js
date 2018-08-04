const API_URL = {
    START: '/time-frame/start',
    STOP: '/time-frame/stop',
    INPROGRESS: '/time-frame/inprogress',
    GETALL: '/time-frame/getAll',
    GETTIME: '/time-frame/getTime',
    GETEVENTTOTAL: '/time-frame/getEventTotal'
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
    let currentTime = (dNow.getFullYear()+'-'+ (dNow.getMonth() + 1) + '-' +dNow.getDate()  + ' ' + dNow.getHours() + ':' + dNow.getMinutes()+ ':' + dNow.getSeconds());
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


function getAll() {
    $.ajax({
        url: API_URL.GETALL,
        method: 'GET'
    }).done(function (data) {
        console.log('response', data);
        let table = '<table>';
        data.forEach(function (row) {
            table += '<tr>';
            table += '<td>' + row.id + '</td>';
            table += '<td>' + row.event + '</td>';
            table += '<td>' + row.start + '</td>';
            table += '<td>' + row.stop + '</td>';
            table += '</tr>';
        });
        table += '</table>';
        $(`#stats_content`).html(table);
    });
}

function getTime(event) {
        $.ajax({
            url: API_URL.GETTIME,
            method: 'GET',
            data: {
                event: event,
            }
        }).done(function (data) {
            console.log('response',data);
            let table='<table>';
            data.forEach(function(row) {
                table+='<tr>';
                table+='<td>'+row.event+'</td>';
                table+='<td>'+row.diff+'</td>';
                table+='</tr>';
            });
            table+='</table>';
            $(`#getTime_content`).html(table);
        });
}

function getEventTotal(event) {
    $.ajax({
        url: API_URL.GETEVENTTOTAL,
        method: 'GET',
        data: {
            event: event,
        }
    }).done(function (data) {
        console.log('response',data);
        let table='<table>';
        data.forEach(function(row) {
            table+='<tr>';
            table+='<td>'+'</td>'
            table+='<td>'+row.timeStampDiff+'</td>'
            table+='</tr>';
        });
        table+='</table>';
        $(`#getEventTotal_content`).html(table);
    });
}

//TODO table for each event // getevent total for 1 event