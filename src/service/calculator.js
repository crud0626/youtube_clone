export default class Calculator {
    convertCount(num) {
        let result = "";
        
        switch (true) {
            case (num > 1000 && num < 10000):
                if (num < 2000) {
                    result = `${parseInt(num / 100) / 10}천`;
                    break;
                }
                result =`${parseInt(num / 1000)}천`;
                break;
            case (num > 10000 && num < 100000000):
                if (num < 20000) {
                    result = `${parseInt(num / 1000) / 10}만`;
                    break;
                }
                result = `${parseInt(num / 10000)}만`;
                break;
            case (num > 100000000):
                if (num < 200000000) {
                    result = `${parseInt(num / 10000000) / 10}억`;
                    break;
                }
                result = `${parseInt(num / 100000000)}억`;
                break;
            default:
                result = num ;
                break;
        }
        return result;
    }
    // convertCount함수도 아래처럼 수정하기.

    getDiffTime(minutesDiff) {
        switch (true) {
            case (minutesDiff < 60):
                return `${minutesDiff}분`;
            case (minutesDiff > 59 && minutesDiff < 1440):
                return `${parseInt(minutesDiff / 60)}시간`;
            case (minutesDiff > 1439 && minutesDiff < 20160):
                return `${parseInt(minutesDiff / 1440)}일`;
            case (minutesDiff > 20159 && minutesDiff < 40320):
                return `${parseInt(minutesDiff / 10080)}주`;
            case (minutesDiff > 40319 && minutesDiff < 525600):
                return `${parseInt(minutesDiff / 40320)}달`;
            case (minutesDiff > 525599):
                return `${parseInt(minutesDiff / 525600)}년`;
            default:
                return console.log("날짜 값이 잘못되었습니다.");
        }
    }
}
