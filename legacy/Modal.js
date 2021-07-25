/**
 * Simple class to open and close a modal.
 * @param popup = DOMelement
 * @param closeBtn = DOMelement or null
 * @param openBtns = DOMelements or null
 * @param isOpen = boolean or false // set true if you want modal open on start
 * @param animationIn = string or null (format: "animationName Timing function")
 * @param animationOut = string or null (format: "animationName Timing function")*
 *
 * TODO: Animation script when modal close.
 */

class Modal {
    constructor(
        popup,
        closeBtn = null,
        openBtns = null,
        isOpen = false,
        animationIn = null,
        animationOut = null,
    ) {
        this.popup = popup;
        this.closeBtn = closeBtn;
        this.openBtns = openBtns;
        this.isOpen = isOpen;
        this.animationIn = animationIn;
        this.animationOut = animationOut;
        this.uniqId = Math.random().toString(36).substr(2, 5);
        this.scrollY = 0;
        this.addBackground();
        this.listeners();
        this.setInitialState();
    }

    addBackground() {
        let div = document.createElement('div');
        div.id = 'underpopup_' + this.uniqId;
        div.style.zIndex = '100000';
        div.style.backgroundColor = 'rgba(0,0,0,0.5)';
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.bottom = '0';
        div.style.right = '0';
        div.style.left = '0';
        div.style.visibility = !this.openBtns || this.isOpen ? 'visible' : 'hidden';
        div.style.overflowY = 'auto';
        div.style.overflowX = 'hidden';
        this.popup.style.zIndex = '100001';

        if (this.openBtns) {
            [...this.openBtns].forEach((btn) =>
                btn.setAttribute('data-modalid', this.uniqId)
            );
        }

        div.insertAdjacentElement('afterbegin', this.popup);
        document.body.insertAdjacentElement('afterbegin', div);
    }

    setInitialState() {
        if (!this.openBtns || this.isOpen) {
            this.open();
        } else {
            this.close();
        }
    }

    open() {
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollY}px`;
        document.body.style.right = '0';
        document.body.style.left = '0';

        if (this.animationIn != null) {
            this.popup.style.animation = this.animationIn;
        }
        if (document.querySelector('#underpopup_' + this.uniqId + ' video')) {
            document.querySelector('#underpopup_' + this.uniqId + ' video').play();
        }

        document.getElementById('underpopup_' + this.uniqId).style.visibility =
            'visible';
        this.popup.style.visibility = 'visible';

        if (this.count) {
            this.addCount();
        }
    }

    close() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.right = '';
        document.body.style.left = '';
        window.scrollTo(0, this.scrollY);

        if (this.animationIn != null) {
            this.popup.style.animation = 'unset';
        }
        if (document.querySelector('#underpopup_' + this.uniqId + ' video')) {
            document.querySelector('#underpopup_' + this.uniqId + ' video').pause();
        }

        document.getElementById('underpopup_' + this.uniqId).style.visibility =
            'hidden';
        this.popup.style.visibility = 'hidden';
    }

    listeners() {
        if (this.openBtns != null) {
            const openBtnsID = document.querySelectorAll('[data-modalid]');
            [...openBtnsID].forEach((openBtn) => {
                if (openBtn.getAttribute('data-modalid') == this.uniqId) {
                    openBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.open();
                    });
                }
            });
        }

        window.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target === document.getElementById('underpopup_' + this.uniqId)) {
                this.close();
            }
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                this.scrollY = window.scrollY;
            }
        });

        if (this.closeBtn !== null) {
            this.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.close();
            });
        }

        if (this.isMobile()) {
            window.addEventListener('scroll', () => {
                this.close();
            });
        }
    }

    isMobile() {
        const whatUser = navigator.userAgent;
        if (
            whatUser.match(/Android/i) ||
            whatUser.match(/Iphone/i) ||
            whatUser.match(/webOS/i) ||
            whatUser.match(/Ipad/i) ||
            whatUser.match(/Ipod/i) ||
            whatUser.match(/BlackBerry/i) ||
            whatUser.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }
    }
}