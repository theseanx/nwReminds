class Reminder {
    name
    interval
    lastRemindedDateTime

    constructor(name, interval) {
        this.name = name;
        this.interval = interval;
        this.lastRemindedDateTime = null;
    }

    setLastRemindedDateTime(curDateTime) {
        this.lastRemindedDateTime = curDateTime;
    }

}