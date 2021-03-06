import Component, { tracked } from "@glimmer/component";

function _random(max) {
    return Math.round(Math.random() * 1000) % max;
}

let startTime;
let lastMeasure;
let startMeasure = function(name) {
    startTime = performance.now();
    lastMeasure = name;
}
let stopMeasure = function() {
    let last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            let stop = performance.now();
            let duration = 0;
            console.log(last+" took "+(stop-startTime));
        }, 0);
    }
}

export default class Glimmerjs extends Component {
    maxId = 1;
    @tracked rows = {
        selected: undefined,
        data: []
    }

    buildData(count = 1000) {
        let adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        let colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        let nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        let data = [];
        for (let i = 0; i < count; i++) {
            data.push({ id: this.maxId++, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
        }
        return data;
    }

    run() {
        startMeasure("run");
        this.rows = { selected: undefined, data: this.buildData(1000) };
        stopMeasure();
    }

    runLots() {
        startMeasure("runLots");
        this.rows = { selected: undefined, data: this.buildData(10000) };
        stopMeasure();
    }

    add() {
        startMeasure("add");
        this.rows = { ...this.rows, data: this.rows.data.concat(this.buildData(1000)) };
        stopMeasure();
    }

    update() {
        startMeasure("update");
        let data = this.rows.data.map((item, index) => {
            if (index % 10 === 0) {
                return { ...item, label: `${item.label} !!!` };
            }
            return item;
        });
        this.rows = { ...this.rows, data }
        stopMeasure();
    }

    clear() {
        startMeasure("clear");
        this.rows = { selected: undefined, data: [] }
        stopMeasure();
    }

    swapRows() {
        startMeasure("swapRows");
        if(this.rows.data.length > 10) {
            let data = this.rows.data;
            let d4 = data[4];
            data[4] = data[9];
            data[9] = d4;
            this.rows = { ...this.rows, data }
        }
        stopMeasure();
    }

    select(id) {
        startMeasure("select");
        this.rows = { ...this.rows, selected: id }
        stopMeasure();
    }

    delete(id) {
        startMeasure("delete");
        let idx = this.rows.data.findIndex(item => item.id === id);
        let data = this.rows.data;
        data.splice(idx, 1);
        this.rows = { selected: undefined, data };
        stopMeasure();
    }
}
