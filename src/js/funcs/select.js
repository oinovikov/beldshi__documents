;var select = {
    collection: null,
    className: 'select',
    onChange: [],

    init: function () {
        this.collection = document.querySelectorAll('.' + this.className);

        for (var i = 0, c = this.collection.length; i < c; i++) {
            var field = this.collection[i].querySelector('.' + this.className + '__field');
            var options = this.collection[i].querySelectorAll('.' + this.className + '__option');
            var inputs = this.collection[i].querySelectorAll('.' + this.className + '__input');
            var inputChecked = this.collection[i].querySelector('.' + this.className + '__input:checked');

            field.removeEventListener('click', this.open);
            field.addEventListener('click', this.open, false);
            // this.collection[i].querySelector('.' + this.className + '__dropdown').removeEventListener('click', this.open);
            // this.collection[i].querySelector('.' + this.className + '__dropdown').addEventListener('click', this.open, false);

            for (var ii = 0, cc = inputs.length; ii < cc; ii++) {
                inputs[ii].removeEventListener('click', this.change);
                inputs[ii].addEventListener('click', this.change, false);
                // options[ii].removeEventListener('click', this.close);
                // options[ii].addEventListener('click', this.close, false);
            }

            this.collection[i].setAttribute('data-value', inputChecked.getAttribute('value'));
            field.querySelector('.' + this.className + '__value').textContent = inputChecked.parentNode.querySelector('.' + this.className + '__label').textContent;

            Object.defineProperty(this.collection[i], 'addEventListener', {
                value: function (name, func, opt) {
                    name = name.toLowerCase();
                    opt = opt || false;

                    if (func) {
                        switch (name) {
                            case 'change': {
                                var options = this.querySelectorAll('.' + select.className + '__option');

                                for (var i = 0, c = options.length; i < c; i++) {
                                    options[i].addEventListener('click', function (event) {
                                        func.call(event.currentTarget.querySelector('.' + select.className + '__input'), event);
                                    }, opt);
                                }
                            }
                            default: {
                                this.querySelector('.' + select.className + '__field').addEventListener(name, func, opt);
                                break;
                            }
                        }
                    }
                },
            });
        }
    },

    open: function (event) {
        event.preventDefault();
        // event.stopPropagation();

        var selectElement = event.currentTarget.closest('.' + select.className);
        // var dropdown = selectElement.querySelector('.' + select.className + '__dropdown');
        var menu = selectElement.querySelector('.' + select.className + '__menu');

        // dropdown.style.maxHeight = 'auto';
        menu.scrollTop = 0;

        var offsetTop = selectElement.querySelector('.' + select.className + '__input[value="' + selectElement.getAttribute('data-value') + '"]').closest('.' + select.className + '__item').offsetTop;

        menu.scrollTop = Math.abs(offsetTop) - 24;

        // if (selectElement.getBoundingClientRect().top - offsetTop < 0) {
        //     dropdown.style.maxHeight = (selectElement.getBoundingClientRect().top + pageYOffset + 48) + 'px';
        //     selectElement.querySelector('.' + select.className + '__list').scrollTop = (Math.abs(selectElement.getBoundingClientRect().top - offsetTop));
        // }
        // dropdown.style.transformOrigin = 'center ' + (offsetTop + 24 - 1) + 'px';
        // dropdown.style.top = (-1 * offsetTop + 4 - (selectElement.getBoundingClientRect().top - offsetTop < 0 ? selectElement.getBoundingClientRect().top - offsetTop : 0)) + 'px';
        // selectElement.getBoundingClientRect().top - offsetTop
        // console.log(selectElement.getBoundingClientRect().top + pageYOffset, offsetTop)

        select.toggle(selectElement);
    },

    change: function (event) {
        // event.preventDefault();

        var selectElement = event.currentTarget.closest('.' + select.className);

        var field = selectElement.querySelector('.' + select.className + '__value');
        var input = event.currentTarget.parentNode.querySelector('.' + select.className + '__input');
        var label = event.currentTarget.parentNode.querySelector('.' + select.className + '__label');

        selectElement.setAttribute('data-value', input.getAttribute('value'));
        field.textContent = label.textContent;

        select.toggle(selectElement);
    },

    close: function (event) {
        // event.preventDefault();
        // event.stopPropagation();
        console.log(event)
        var selectElement = event.currentTarget.closest('.' + select.className);
        select.toggle(selectElement);
    },

    toggle: function (selectElement) {
        selectElement.classList.toggle(select.className + '_expanded');
    },
};
