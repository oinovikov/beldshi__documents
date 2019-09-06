document.addEventListener('DOMContentLoaded', function () {
    app.init();
    shadows.init();
    select.init();

    var docs = document.querySelectorAll('.document');
    for (var i = 0, c = docs.length; i < c; i++) {
        docs[i].addEventListener('click', function (event) {
            event.preventDefault();
            var docModal = document.querySelector('.documentModal');

            var docModalId = docModal.querySelector('.documentModalHeader__id');
            docModalId.innerHTML = docModalId.textContent.split(' ').map(function (val) {
                return '<span class="documentModalHeader__textChunk"><span>' + val + '</span></span>';
            }).join(' ');

            var docModalTitle = docModal.querySelector('.documentModalHeader__title');
            docModalTitle.innerHTML = docModalTitle.textContent.split(' ').map(function (val) {
                return '<span class="documentModalHeader__textChunk"><span>' + val + '</span></span>';
            }).join(' ');

            shadows.show(docModal, 'documentModal_show');
        }, false);
    }
}, false);
