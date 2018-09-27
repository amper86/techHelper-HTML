$(() => {
    const pmAcc = $('#pm-accurate');
    const widthAcc = $('#width-accurate');
    const rateAcc = $('#rate-accurate');
    const printAreaAcc = $('#print-area-accurate');
    const mmToMAcc = 1000;
    let answerBlockAcc = $('.answer__block-row');

    let calculateAcc = (pmNumberAcc, widthNumberAcc, rateNumberAcc, printAreaNumberAcc) => {
        let answerAcc = pmNumberAcc * (widthNumberAcc / mmToMAcc) * (printAreaNumberAcc / 100) * rateNumberAcc;
        return answerAcc.toFixed(3)
    };

    let printAcc = (kgAcc) => {
        let answerKgAcc = kgAcc + ' кг';
        let answerHTMLAcc = '<p>' + answerKgAcc + '</p>';
        answerBlockAcc.append(answerHTMLAcc);
    };

    let clearAcc = () => {
        pmAcc.val('');
        widthAcc.val('');
        rateAcc.val('');
        printAreaAcc.val('');
    };

    $('.ink-calc-accurate__btn').on('click', (e) => {
        e.preventDefault();

        let pmNumberAcc = pmAcc.val();
        let widthNumberAcc = widthAcc.val();
        let rateNumberAcc = rateAcc.val();
        let printAreaNumberAcc = printAreaAcc.val();

        let kgAcc = calculateAcc(pmNumberAcc, widthNumberAcc, rateNumberAcc, printAreaNumberAcc);

        printAcc(kgAcc);

        clearAcc();

        console.log('tik');
    })
});