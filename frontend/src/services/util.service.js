export const utilService = {
    delay,
    makeId,
    makeLorem,
    getRandomDate,
    makeChartDate,
    numberWithCommas,
    getRandomIntInclusive,
    getRandomFloatInclusive,
    timeAgo,
    getCababCase,
    formatDate
}
function formatDate(date = new Date(), formatBy) {
    switch (formatBy) {
        case 'byHour':
            date.setMinutes(0)
            date.setSeconds(0)
            break

        case 'byDay':
            date.setDays(0)
            break

        default:
            return date.toUTCString()
    }
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'long'
    })
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getRandomFloatInclusive(min, max, decimals) {
    return ((Math.random() * (max - min)) + min).toFixed(decimals)
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function timeAgo(ms = new Date()) {
    const date = ms instanceof Date ? ms : new Date(ms)
    const formatter = new Intl.RelativeTimeFormat('en')
    const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1,
    }
    const secondsElapsed = (date.getTime() - Date.now()) / 1000
    for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key]
            let time = formatter.format(Math.round(delta), key)
            if (time.includes('in')) {
                time = time.replace('in ', '')
                time = time.replace('ago', '')
                time += ' ago'
            }
            return time
        }
    }
}

function getRandomDate(start = new Date(2020, 0, 1), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime()
}

function makeChartDate(labels, data) {
    return {
        labels,
        datasets: [{
            label: '# of Votes',
            data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    }
}

function numberWithCommas(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function getRandomBoolean() {
    return (Math.random() < 0.5)
}

function getCababCase(amenities) {
    amenities.map(prop => {
        const regex = /[^A-Za-z0-9]+/g
        const cababCase = prop.toLowerCase().replace(regex, '-')
        return cababCase
    })
}
