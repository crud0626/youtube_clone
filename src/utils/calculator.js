export default class Calculator {
    convertCount(num) {
        num = +num;
        switch (true) {
            case 1000 < num && num < 10000:
                return num < 2000 
                ? `${parseInt(num / 100) / 10}천` 
                : `${parseInt(num / 1000)}천`;
            case 10000 < num && num < 100000000:
                return num < 20000 
                ? `${parseInt(num / 1000) / 10}만` 
                : `${parseInt(num / 10000)}만`;

            case 100000000 < num:
                return num < 200000000 
                ? `${parseInt(num / 10000000) / 10}억`
                : `${parseInt(num / 100000000)}억`;

            default:
                return num;
        }
    }

    getTimeDiff(publishedDate) {
        const publishTime = Date.parse(publishedDate);
        const currentTime = Date.now();

        const secondsDiff = parseInt((currentTime - publishTime) / 1000);

        switch (true) {
            case 0 <= secondsDiff && secondsDiff < 60:
                return `${secondsDiff}초 전`;

            case secondsDiff < 3600:
                const secondToMinute = 60;
                return `${parseInt(secondsDiff / secondToMinute)}분 전`;
                
            case secondsDiff < 86400:
                const secondToHour = 3600;
                return `${parseInt(secondsDiff / secondToHour)}시간 전`;
                
            case secondsDiff < 604800:
                const secondToDay = 86400;
                return `${parseInt(secondsDiff / secondToDay)}일 전`;
                
            case secondsDiff < 2419200:
                const secondToWeek = 604800;
                return `${parseInt(secondsDiff / secondToWeek)}주 전`;
                
            case secondsDiff < 29030400:
                const secondToMonth = 2419200;
                return `${parseInt(secondsDiff / secondToMonth)}달 전`;
                
            case 29030400 < secondsDiff:
                const secondToYear = 29030400;
                return `${parseInt(secondsDiff / secondToYear)}년 전`;

            default:
                console.error(`날짜 값이 잘못되었습니다. ${publishTime}`);
                return null;
        }
    }

    convertVideoDuration(time) {
        if (time === "P0D") return "LIVE NOW";
    
        let duration = time.split("PT")[1];
        let hours = "", minutes = "", seconds = "";
    
        if (duration.match("H")) {
            [hours, duration] = duration.split("H");
            hours += ":";
        }
        
        const minutePadCount = hours ? 2 : 1;
        if (duration.match("M")) {
            [minutes, duration] = duration.split("M");
        }
        minutes = `${minutes.padStart(minutePadCount, "0")}:`;
    
        if (duration.split("S").length === 2) {
            seconds = duration.split("S")[0];
        }
        seconds = seconds.padStart(2, "0");
    
        return `${hours}${minutes}${seconds}`;
    }
}

const calculator = new Calculator();

export const {convertCount, getTimeDiff, convertVideoDuration} = calculator;