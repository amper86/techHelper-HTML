$(() => {
    const pm = $('#pm');
    const width = $('#width');
    const cell = $('#cell');
    const printArea = $('#print-area');
    const k = 0.3;
    const mmToM = 1000;

    const calculate = (pmNumber, widthNumber, cellNumber, printAreaNumber) => {
        let answer = pmNumber * (widthNumber / mmToM) * k * cellNumber * printAreaNumber / 1000;
        return answer.toFixed(3)
    };

    const print = (cal) => {
        console.log(cal);
        //todo: нужно сделать вывод информации и проверить еще раз вычисления
    };


    $('.ink-calc__btn').on('click', e => {
        e.preventDefault();

        let pmNumber = pm.val();
        let widthNumber = width.val();
        let cellNumber = cell.val();
        let printAreaNumber = printArea.val();

        let kg = calculate(pmNumber, widthNumber, cellNumber, printAreaNumber);
        print(kg);
    })
});