const calculateTimeLeft = (finalDate) => {
    let total = Date.parse(finalDate) - Date.parse(new Date());
    let timeLeft = {};

    if (total > 0) {
        timeLeft = {
            days: Math.floor(total / (1000 * 60 * 60 * 24)),
            hours: Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((total / 1000 / 60) % 60),
            seconds: Math.floor((total / 1000) % 60)
        };
    } else {
        timeLeft = {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00"
        };
    }

    const final = `${('0' + timeLeft.days).slice(-2)}:${('0' + timeLeft.hours).slice(-2)}:${('0' + timeLeft.minutes).slice(-2)}:${('0' + timeLeft.seconds).slice(-2)}`

    return final;
}

export default calculateTimeLeft;