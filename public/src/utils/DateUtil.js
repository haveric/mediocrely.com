export default class DateUtils {
  static MS_IN_HOUR = 3600000;
  static lastTimezone = -1;
  static shortMonths = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

  constructor() {
  }

  static getHoursBetween(start, end) {
    return (new Date(end) - new Date(start)) / this.MS_IN_HOUR;
  }

  static getExpandedDay(day) {
    let expanded = "th";
    if (day === 1 || day === 21 || day === 31) {
      expanded = "st";
    } else if (day === 2 || day === 22) {
      expanded = "nd";
    } else if (day === 3 || day === 23) {
      expanded = "rd";
    }

    return day + expanded;
  }

  static getFormattedTime(hours, minutes) {
    let formattedHours;
    let ampm = "AM";
    if (hours > 12) {
      hours -= 12;
      formattedHours = hours;
      ampm = "PM";
    } else if (hours === 0) {
      formattedHours = "12";
    } else if (hours === 12) {
      formattedHours = "12";
      ampm = "PM";
    } else {
      formattedHours = hours;
    }

    if (minutes !== undefined) {
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      formattedHours += ":" + minutes;
    }

    formattedHours += " " + ampm;

    return formattedHours;
  }

  static getTimeZoneDisplay(timezone) {
    // Don't use hardcoded timezones
    /*
    let timezoneDisplay = "";
    if (timezone === 300) {
      timezoneDisplay = " (CDT)";
    } else if (timezone === 360) {
      timezoneDisplay = " (CST)";
    }

    return timezoneDisplay;
    */
    return "";
  }

  static resetLastTimezone() {
    this.lastTimezone = -1;
  }

  static getTime(start, additionalHours) {
    const date = new Date(start);
    date.setTime(date.getTime() + (additionalHours * this.MS_IN_HOUR));

    let hours = date.getHours();
    let hoursString = this.getFormattedTime(hours);

    const timezone = date.getTimezoneOffset();
    if (timezone !== this.lastTimezone) {
      hoursString += this.getTimeZoneDisplay(timezone);

      this.lastTimezone = timezone;
    }
    return hoursString;
  }

  static getFormattedStartTime(start) {
    let formattedStart = "Begins ";
    const startDate = new Date(start);

    const month = startDate.getMonth();
    formattedStart += this.shortMonths[month];

    const dayOfMonth = startDate.getDate();
    formattedStart += " " + this.getExpandedDay(dayOfMonth) + " At ";

    formattedStart += this.getFormattedTime(startDate.getHours(), startDate.getMinutes());

    const timezone = startDate.getTimezoneOffset();
    formattedStart += this.getTimeZoneDisplay(timezone);

    return formattedStart;
  }
}
