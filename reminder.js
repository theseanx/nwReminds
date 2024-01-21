const minutetomsFactor = 600000;
class Reminder {
    name
    interval // in milliseconds
    lastRemindedDateTime

    constructor(name, interval) {
        this.name = name;
        this.interval = minutetomsFactor * interval;
        this.lastRemindedDateTime = null;
    }

    setLastRemindedDateTime(curDateTime) {
        this.lastRemindedDateTime = curDateTime;
    }

}