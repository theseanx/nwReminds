const minutetomsFactor = 600000;

const date = new Date();
class Reminder {
    name
    interval // in milliseconds
    lastRemindedDateTime
    nextTimeToNotify

    constructor(name, interval) {
        this.name = name;
        this.interval = minutetomsFactor * interval;
        this.lastRemindedDateTime = null;
        let minute = date.getMinutes();
        minute += this.interval;
        let dateTimeString = date.getFullYear() + '-' + date.getMonth() + ' ' + date.getDate() + ', ' + date.getHours() + ": " + minute;
        this.nextTimeToNotify = new Date(dateTimeString);
        // this.nextTimeToNotify = date.getTime() + this.interval;
    }

    updateNextTimeToNotify() {
        this.nextTimeToNotify += this.interval;
    }

    getNextTimeToNotify() {
        return this.nextTimeToNotify;
    }

    setLastRemindedDateTime(curDateTime) {
        this.lastRemindedDateTime = curDateTime;
    }

}