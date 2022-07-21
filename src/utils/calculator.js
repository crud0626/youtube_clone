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
        publishedDate = Date.parse(publishedDate);
        const now = Date.now();
        const minutesDiff = parseInt((now - publishedDate) / 60000);

        switch (true) {
            case 0 < minutesDiff && minutesDiff < 60:
                return `${minutesDiff}분 전`;
                
            case 59 < minutesDiff && minutesDiff < 1440:
                return `${parseInt(minutesDiff / 60)}시간 전`;
                
            case 1439 < minutesDiff && minutesDiff < 20160:
                return `${parseInt(minutesDiff / 1440)}일 전`;
                
            case 20159 < minutesDiff && minutesDiff < 40320:
                return `${parseInt(minutesDiff / 10080)}주 전`;
                
            case 40319 < minutesDiff && minutesDiff < 525600:
                return `${parseInt(minutesDiff / 40320)}달 전`;
                
            case 525599 < minutesDiff:
                return `${parseInt(minutesDiff / 525600)}년 전`;
                
            default:
                console.error(`날짜 값이 잘못되었습니다. ${minutesDiff}`);
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
