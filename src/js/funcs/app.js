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
