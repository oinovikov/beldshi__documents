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
