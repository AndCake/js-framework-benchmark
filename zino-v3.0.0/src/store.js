var store = (function() {
	var data = [];
	var selected = -1;
	var id = 1;
	function buildData(count) {
		count = count || 1000;
        var adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy']
        var colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange']
        var nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard']
        var data = []
        for (var i = 0; i < count; i++) {
            data.push({id: id++, label: adjectives[_random(adjectives.length)] + ' ' + colours[_random(colours.length)] + ' ' + nouns[_random(nouns.length)], selected: selected === i ? 'danger' : '' })
        }
        return data
    }

	function _random(max) {
	    return Math.round(Math.random()*1000)%max
	}

	return {
		add: function() {
			data = data.concat(buildData());
			Zino.trigger('rows-updated', {rows: data, action: 'add'});
		},

		run: function() {
			data = buildData();
				Zino.trigger('rows-updated', {rows: data, action: 'run'});
		},

		swapRows: function() {
			if (data.length > 10) {
				var a = data[9];
				data[9] = data[4];
				data[4] = a;
				Zino.trigger('rows-updated', {rows: data, action: 'swapRows'});
			}
		},

		runLots: function() {
			data = buildData(10000);
			Zino.trigger('rows-updated', {rows: data, action: 'runLots'});
		},

		update: function() {
		    for (let i = 0; i < data.length; i += 10) {
	            data[i].label += ' !!!';
		    }
			Zino.trigger('rows-updated', {rows: data, action: 'update'});
		},

		clear: function() {
			data = [];
			id = 1;
			Zino.trigger('rows-updated', {rows: data, action: 'clear'});
		},

		delete: function(idx) {
			data.splice(idx, 1);
			Zino.trigger('rows-updated', {rows: data, action: 'delete'});
		}
	};
}());