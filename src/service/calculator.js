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
}
