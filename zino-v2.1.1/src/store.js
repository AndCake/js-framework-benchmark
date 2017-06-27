(function() {
	'use strict';

	var data = [],
		id = 1,
		selected = -1;

	function _random(max) {
	    return Math.round(Math.random()*1000)%max;
	}

	function buildData(count) {
		count = count || 1000;
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({id: id++, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)], selected: i === selected ? 'danger' : ''});

        return data;
    }

	function updateData(data, mod) {
		mod = mod || 10;
		data = [].concat(data);
        for (let i = 0; i < data.length; i += 10) {
            data[i] = {label: data[i].label + ' !!!', id: data[i].id};
        }
		return data;
    }

	window.store = {
		run: function() {
			selected = -1;
			data = buildData();
			Zino.trigger('data-changed', data);
		},
		update: function() {
			data = updateData(data);
			Zino.trigger('data-changed', data);
		},
		runLots: function() {
			selected = -1;
			data = buildData(10000);
			Zino.trigger('data-changed', data);
		},
		clear: function() {
			data = [];
			id = 1;
			Zino.trigger('data-changed', data);
		},
		select: function(idx) {
			if (selected >= 0) {
				data[selected].selected = '';
			}
			data[idx].selected = 'danger';
			selected = idx;
			Zino.trigger('data-changed', data);
		},
		swapRows: function() {
			if (data.length > 10) {
				var a = data[4];
				data[4] = {label: data[9].label, id: data[9].id};
				data[9] = {label: a.label, id: a.id};
				Zino.trigger('data-changed', data);
			}
		},
		add: function() {
			data = data.concat(buildData());
			Zino.trigger('data-changed', data);
		},
		delete: function(idx) {
			data.splice(idx, 1);
			Zino.trigger('data-changed', data);
		}
	};
}());
