export const daysLeftCalculator = endsParameter => {
    const now = new Date().getTime();
    const ends = new Date(endsParameter).getTime();

    const diffTime = Math.abs(ends - now);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

export const dateRightFormat = (day = 0) => {
    const newDate = new Date();
    const today = new Date(newDate.getTime() + day * 24 * 60 * 60 *1000);

    let dd = today.getDate()
    let mm =  today.getMonth() + 1
    let yyyy = today.getFullYear()
    
    if (dd < 10) {
        dd = '0' + dd
    }
    
    if (mm < 10) {
        mm = '0' + mm
    }
    
    const date = `${mm}/${dd}/${yyyy}`

    return date
}