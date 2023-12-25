'use strict'

class Coffee {
    constructor(wrapper, items, coffee) {
        this.wrap = $(wrapper);
        this.menu_items = $(items);
        this.coffee = document.querySelector('.coffee');
    }

    clicked(e) {
        this.menu_items.css('background-color', '').css('color', '');
        $(e.target).css('background-color', 'rgb(87, 41, 8)').css('color', '#fff');
        this.getinfo($(e.target).text())
        $('.coffee').empty()
    }

    getinfo(name) {
        fetch('coffee.json')
            .then(resp => { return resp.json() })
            .then(resp => { this.build((resp.find(obj => obj.name === name)).recipe) })
    }

    build(obj) {
        obj.forEach(element => {
            let div = document.createElement('div');
            div.style.height = `${element.volume * 60}px`
            div.className = element.className;
            this.coffee.insertAdjacentElement('beforeend', div);
        });
    }

    init() {
        this.menu_items.click(this.clicked.bind(this));
    }
}