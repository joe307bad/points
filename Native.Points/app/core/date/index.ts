import moment from 'moment-timezone';

const DateUtilities = {
    relativeFormat: (date: Date): string => {
        const userDate = moment.utc(date);
        const now = moment(new Date());
        if (now.diff(userDate, "hours") < 24) {
            return 'about ' + userDate.fromNow();
        } else {
            return 'on ' + userDate.format("MMM Do");
        }

    }
}

export default DateUtilities;