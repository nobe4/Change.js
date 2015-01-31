function type(t){return Object.prototype.toString.call(t).split(' ')[1].replace(']','').toLowerCase();}
function write(s){console.log('%c ' + s + ' ', 'background: #222; color: #bada55');}
function log(args){
	console.log.apply(console, arguments);
}

var change = function(){
	// source
	var source = '';

	// registered key
	var registeredKeys = {
		'array2' : ['array',2],
		'array' : ['alert'],
		'alert' : 'ok',
		'sup' : function(a,b){return a>b;}
	};

	// last parsed keys
	var parsedKeys = [];

	// stack
	var stack = {};

	// main parse function
	var parse = function(){
		log('Parsing ', source);
		var splittedSource = source.split(' ');
		// grammar verification
		for(var i in splittedSource){
			var currentParsedKey = splittedSource[i];
			if(currentParsedKey != ''){
				if(registeredKeys[currentParsedKey] == undefined){
					throw 'Error parsing the code : ' + currentParsedKey + ' ('+ (++i) +'th key)';
				}else{
					parsedKeys.push(currentParsedKey);
				}
			}
		}
	}

	var execute = function(){
		if(parsedKeys.length == 0) throw 'Cannot execute an empty code';
		executeRecursively(parsedKeys);
	}

	var executeRecursively = function(keys){
		log('Keys : ', keys);
		for(var i in keys){
			var currentKey = registeredKeys[keys[i]];
			if(type(keys[i]) == 'number'){ currentKey = keys[i]; }
			log('Executing : ', keys[i], ' (' + type(currentKey)+ ')');
			log('\t=> ',currentKey);
			switch(type(currentKey)){
				case 'string':
					write(currentKey);
					break;
				case 'number':
					write(currentKey);
					break;
				case 'object':
					executeRecursively(currentKey);
					break;
				case 'array':
					executeRecursively(currentKey);
					break;
				case 'function':
					log(currentKey);
				default :
					log('Nothing here, passing ...');
			}
		}
	}

	var addToStack = function(key, value){ stack[key] = value; }
	var getFromStack = function(key){ return stack[key]; }

	var load = function(newSource){
		log('Loading ', newSource);
		source = newSource;
	}

	return {
		parse : parse,
		load : load,
		execute : execute
	};
}

var c = new change();
c.load('alert array2 sup');
c.parse();
c.execute();
