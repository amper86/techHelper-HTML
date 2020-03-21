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

        //console.log(checkbox.prop('checked')); //сначала сдела по св-ву checked потом из-за бага сделал по флагу

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
            answer = (pmNumber * (widthNumber / mmToM) * rateNumber * (printAreaNumber / 100)) / 1000;

          //console.log(answer, pmNumber, widthNumber, cellNumber, printAreaNumber, rateNumber);
        } else {
            answer = pmNumber * (widthNumber / mmToM) * k * cellNumber * (printAreaNumber / 100) / 1000;
        }

        return answer.toFixed(3);
    };


    let print = (kg, pmNumber, widthNumber, cellNumber=0, printAreaNumber, rateNumber=0) => {
        //console.log(kg, pmNumber, widthNumber, cellNumber, rateNumber, printAreaNumber);
      
      const answerWrapper = document.querySelector('.answer__wrapper');
        const answerBlockElement = document.createElement('div');
        const shortAnswerElement = document.createElement('div');
        const blockElement = document.createElement('div');
        const iElement = document.createElement('i');
        const spanElement = document.createElement('span');
        const spanElement2 = document.createElement('span');
        const ulElement = document.createElement('ul');


        const makeLi = (text, number, dim) => {
            let liElement = document.createElement('li');
            liElement.innerHTML = `${text} ${number}${dim}`;
            return liElement;
        }
        
        shortAnswerElement.classList.add('answer__short-answer');
        spanElement.innerHTML = `${kg} кг`;
        shortAnswerElement.append(spanElement);
        iElement.classList.add('fas');
        iElement.classList.add('fa-arrow-alt-circle-down');
        spanElement2.append(iElement);
        shortAnswerElement.append(spanElement2);
        answerBlockElement.classList.add('answer__block-row');
        blockElement.classList.add('answer__block');

        ulElement.classList.add('answer__description');

        ulElement.append(makeLi('погонных метров:', pmNumber, 'м'));
        ulElement.append(makeLi('ширина:', widthNumber, 'мм'));
        if (!cellNumber) {
            ulElement.append(makeLi('краскоперенос:', rateNumber, 'г/м2'));
        } else {
            ulElement.append(makeLi('объем ячейки:', cellNumber, 'см3/м2'));
        }
        ulElement.append(makeLi('площадь запечатки:', printAreaNumber, '%'));
        
        answerBlockElement.append(shortAnswerElement);
        answerBlockElement.append(ulElement);
        blockElement.append(answerBlockElement);
        answerWrapper.append(blockElement);
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
        print(kg, pmNumber, widthNumber, cellNumber, printAreaNumber, rateNumber);

        clear();
    });

    $('#rateCalcLabel').on('click', () => {

        if (checkboxFlag) {
            checkboxFlag = false;
        } else {
            checkboxFlag = true;
        }

        cellRateLabel();
    });
});
