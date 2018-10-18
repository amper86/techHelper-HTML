$(() => {
    const pm = $('#pm');
    const width = $('#width');
    const cell = $('#cell');
    const printArea = $('#print-area');
    const rate =  $('#rate');
    const k = 0.3;
    const mmToM = 1000;

    const cellBlock = $('#cellBlock');
    const rateBlock = $('#rateBlock');

    //const checkbox = $('#rateCalc');

    let answerBlock = $('.answer__block-row');
    let checkboxFlag = true;

    cellBlock.addClass('hide');

    let cellRateLabel = () => {

        //console.log(checkbox.prop('checked'));

        if (cellBlock.hasClass('hide')) {
            //console.log(1);
            rateBlock.addClass('hide');
            cellBlock.removeClass('hide');
        } else {
            //console.log(2);
            cellBlock.addClass('hide');
            rateBlock.removeClass('hide');
        }
    };

    let calculate = (pmNumber, widthNumber, cellNumber, printAreaNumber, rateNumber) => {

        let answer;

        //console.log(checkbox.prop('checked'));

        if (checkboxFlag) {
            answer = (pmNumber * (widthNumber / mmToM) * (printAreaNumber / 100)) / 1000 * rateNumber;
        } else {
            answer = pmNumber * (widthNumber / mmToM) * k * cellNumber * (printAreaNumber / 100)/ 1000;
        }
        return answer.toFixed(3);
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
        rate.val('');
    };


    $('.ink-calc__btn').on('click', e => {
        e.preventDefault();

        let pmNumber = pm.val();
        let widthNumber = width.val();
        let cellNumber = cell.val();
        let printAreaNumber = printArea.val();
        let rateNumber = rate.val();

        /*console.log(pmNumber);
        console.log(widthNumber);
        console.log(cellNumber);
        console.log(printAreaNumber);*/

        let kg = calculate(pmNumber, widthNumber, cellNumber, printAreaNumber, rateNumber);
        print(kg);

        clear();
    });

    $('#rateCalcLabel').on('click', () => {

        if (checkboxFlag) {
            checkboxFlag = false;
        } else {
            checkboxFlag = true;
        }

        //console.log('hi');
        cellRateLabel();
    });
});