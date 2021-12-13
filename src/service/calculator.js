export default class Calculator {
    
    getViewCount(num) {
        let result = "";
        
        switch (true) {
            case (num > 1000 && num < 10000):
                if (num < 2000) {
                    result = `${parseInt(num / 100) / 10}천회`;
                    break;
                }
                result =`${parseInt(num / 1000)}천회`;
                break;
            case (num > 10000 && num < 100000000):
                if (num < 20000) {
                    result = `${parseInt(num / 1000) / 10}만회`;
                    break;
                }
                result = `${parseInt(num / 10000)}만회`;
                break;
            case (num > 100000000):
                if (num < 200000000) {
                    result = `${parseInt(num / 10000000) / 10}억회`;
                    break;
                }
                result = `${parseInt(num / 100000000)}억회`;
                break;
            default:
                result = `${num}회`;
                break;
        }
        return result;
    }
}