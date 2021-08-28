module.exports = {
    modify_date: (date) => {
        const dateArray = date.split("-");
        return dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
    }
}