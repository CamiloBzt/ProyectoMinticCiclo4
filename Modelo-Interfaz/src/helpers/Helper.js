

const dateToInputDate = ( date ) => {

    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    if (month < 10) month = '0' + month;

    if (day < 10) day = '0' + day;

    return `${year}-${month}-${day}`;
};

export {
    dateToInputDate
};


const capitalize = ( text = '') => {

    return text.charAt(0).toUpperCase() + text.slice(1);

}