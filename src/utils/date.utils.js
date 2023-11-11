import moment from "moment";

export const momentDateToNumber = (date, startOf = "min") => {
    switch (startOf) {
        case "min":
            return date.startOf("minute").valueOf() / 1000;
        case "hour":
            return date.startOf("hour").valueOf() / 1000;
        case "day":
            return date.startOf("day").valueOf() / 1000
    }
}

export const numberDateToMoment = (dateNumber) => {
    return moment(dateNumber * 1000);
}
