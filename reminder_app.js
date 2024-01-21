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
        // A potential problem I see is if the user gets a notification while they currently have another notification open.
        // then, it could cause a conflict.
        // Solution could be to A: only send notifications every 5 minutes at most.
        //                      B: not send a notification if another one is currently being active (or if the user is in "being notified" state)
        // Making nextNotifications into a field variable (rather than a local variable) allows the while loop to run multiple times, potentially adding different notifications into the nextNotifications list each loop
        // without losing data from the previous loop, this way notifications can be sent only every 5 minutes.
        this.nextNotifications =[];
        runApp();
    }

    runApp() {
        const d = new Date();

        let keepGoing = true;
        while (keepGoing) {
            let curDateTime = d.getTime();
            checkIfAnyEndpointsCalled();
            this.checkReminders(curDateTime);
            if (d.getMinutes() % 5 === 0) {
                this.checkNotifications();
            }

        }
    }

    checkNotifications() {
        if (this.nextNotifications >= 0) {
            // TODO: notify the user
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
            this.addToNotifyList(i);
            this.reminders[i].setLastRemindedDateTime(curDateTime);
        }
    }

    addToNotifyList(i) {
        this.nextNotifications.push(this.reminders[i])
    }
}