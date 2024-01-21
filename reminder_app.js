// While (activated)
// Get time
// Check if any endpoints were called
// Go through list of Reminders, if lastReminded+interval >= time, then add to a list of notifications
// If notifications > 0, Notify
// If notify, prompt for addCurrentFeelings
//     If response received,


class reminderapp {
    reminders;
    nextNotifications;
    constructor() {
        this.reminders = [];
        this.nextNotifications = [];
        runApp();
    }

    runApp() {
        const d = new Date();

        let keepGoing = true;
        while (keepGoing) {
            let curDateTime = d.getTime();
            checkIfAnyEndpointsCalled();
            this.checkReminders(curDateTime);
            checkNotifications();
        }
    }

    checkReminders(curDateTime) {
        for (let i = 0; i < this.reminders.length; i++) {
            this.getElapsedTime(curDateTime, i);
        }

    }

    getElapsedTime(curDateTime, i) {
        // citation: https://www.tutorialspoint.com/finding-the-time-elapsed-in-javascript
        if ((curDateTime - this.reminders[i].lastRemindedDateTime) >= this.reminders[i].interval) {
            addToNotifyList(i);
            this.reminders[i].setLastRemindedDateTime(curDateTime);
        }
    }

    addToNotifyList() {
        nextNotifications

    }
}