'use strict';

// Глобальные переменные

;var app = {
    block: null,
    body: null,

    init: function () {
        if (!this.block) {
            this.block = document.querySelector('.app');
            this.body = this.block.querySelector('.app__body');
        }
    },

    inactivate: function () {
        this.init();
        this.block.classList.add('app_state_inactive');
    },

    activate: function () {
        this.init();
        this.block.classList.remove('app_state_inactive');
    },
};

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

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

;var shadows = {
    block: null,
    overlay: null,
    shadowContent: {
        block: null,
        toggleClass: null,
    },

    init: function () {
        if (!this.block) {
            this.block = document.querySelector('.shadows');
            this.overlay = this.block.querySelector('.shadows__overlay');
            this.overlay.addEventListener('click', this.overlayClick, false);
        }
    },

    show: function (shadowContentBlock, shadowContentToggleClass) {
        this.init();
        app.inactivate();
        this.overlay.classList.add('shadows__overlay_show');
        this.contentShow(shadowContentBlock, shadowContentToggleClass);
    },

    hide: function () {
        this.init();
        app.activate();
        this.overlay.classList.remove('shadows__overlay_show');
        this.contentHide();
    },

    contentShow: function (shadowContentBlock, shadowContentToggleClass) {
        this.init();

        if (shadowContentBlock && shadowContentToggleClass) {
            if (this.shadowContent.block && this.shadowContent.toggleClass) {
                shadowContentBlock.addEventListener('transitionend', this.contentTransitionEnd, false);
                this.contentHide();
                this.shadowContent.block = shadowContentBlock;
                this.shadowContent.toggleClass = shadowContentToggleClass;
            } else {
                this.shadowContent.block = shadowContentBlock;
                this.shadowContent.toggleClass = shadowContentToggleClass;
                shadowContentBlock.scrollTop = 0;
                this.shadowContent.block.classList.add(this.shadowContent.toggleClass);
            }
        }
    },

    contentHide: function () {
        this.init();

        if (this.shadowContent.block && this.shadowContent.toggleClass) {
            this.shadowContent.block.classList.remove(this.shadowContent.toggleClass);
            this.shadowContent.block = null;
            this.shadowContent.toggleClass = null;
        }
    },

    contentTransitionEnd: function (event) {
        this.removeEventHandler('transitionend', shadows.contentTransitionEnd);

        if (shadows.shadowContent.block && shadows.shadowContent.toggleClass) {
            shadows.contentShow(shadows.shadowContent.block, shadows.shadowContent.toggleClass);
        }
    },

    overlayClick: function (event) {
        event.preventDefault();
        shadows.hide();
    },
};

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
