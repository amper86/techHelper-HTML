$(() => {
    const pm = $('#pm');
    const width = $('#width');
    const cell = $('#cell');
    const printArea = $('#print-area');
    const k = 0.3;
    const mmToM = 1000;
    let answerBlock = $('.answer__block-row');

    let calculate = (pmNumber, widthNumber, cellNumber, printAreaNumber) => {
        let answer = pmNumber * (widthNumber / mmToM) * k * cellNumber * (printAreaNumber / 100)/ 1000;
        return answer.toFixed(3)
    };

    let print = (cal) => {
        let answerCal = cal + ' кг';
        let answerHTML = '<p>' + answerCal + '</p>';
        answerBlock.append(answerHTML);
        //console.log(cal);
    };

    let clear = () => {
        pm.val('');
        width.val('');
        cell.val('');
        printArea.val('');
    };


    $('.ink-calc__btn').on('click', e => {
        e.preventDefault();

        let pmNumber = pm.val();
        let widthNumber = width.val();
        let cellNumber = cell.val();
        let printAreaNumber = printArea.val();

        /*console.log(pmNumber);
        console.log(widthNumber);
        console.log(cellNumber);
        console.log(printAreaNumber);*/

        let kg = calculate(pmNumber, widthNumber, cellNumber, printAreaNumber);
        print(kg);

        clear();
    })
});