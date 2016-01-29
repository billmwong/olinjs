var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');

possibleNames = ['Alfie','Angel','Argus','Arwen','Ashton','Baby','Bailey','Bassil','Beage','Bender','Benny','Big Red','Big Sammy','Binka','Binx','Blackie','Bobo','Boogie','Boris','Bowser','Brandy','Buddy','Butterscotch','Cally','Caramel','Casey','Catherine','Cece','Celine','Cherio','Chloe','Churchill','Cinders','Clarence','Claude','Cleo','Coffee','Cookie','Cooper','Cosmo','Couch Potato','Daisy','Dakota','Dark Moon','David','Denver','Diesel','Dilon','Disney','Dissy','Divine','Dude','Ebony','Enzo','Faggie','Fagison','Felix','Ferris','Fifi','Flowerbee','Fluffernet','Fluffy','Fosters','Freckles','Frollo','Freckuls','Fudge','Fudge','Fuffie','Gabrielle','Gadget','Gary','Ginger','Gipsy','Gizmo','Gore','Grace','Griswald','Grizz','Grizzabella','Harley','Hazel','Henry','Hex','Hoppy','Indy','Izzy','Jasmine','Jay','Jinx','Jon','Jymes Dean','Katie','Kelee','Kenny','Kirby','Kitty','Kliff','Kool Kat','Lady','Larry','Lera','Lexie','Lincoln','Little','Lucy','Mac','Mackie','Marbles','Mario','Marley','Marmelade','Martin','Max','Maxine','Merlin','Micky','Midnight','Mippen','Misty','Missy','Mittens','Mitzy','Molly','Moon Pie','Moriarty','Moritz','Moses','Mozart','Ms Kitty','Myah','Nala','Natasha','Nemo','Niglet','Nikita','Noodles','Noodlehead','Oliver','Oreo','Orwell','Oscar','Panda','Patsy','Paws','Peanut','Peter','Phoebe','Pinkle','Plinky','Poocat','Pooder','Pookie','Prince','Princess','Pumpkin','Punkin','Purr','Rajha','Ralph','Rascal','Romeo','Roxie','Rylie','Sadie','Salem','Sammy','Sasha','Scooter','Scout','Secret','Shadow','Shane','Shelby','Simba','Simon','Simpson','Slippers','Smudge','Sophie','Soushi','Sparkle','Sputnick','Stanley','Starlett','Sticky','Stimpy','Stray','Sugar','Sunny','Tater','Tigger','Tinkerbell','Tina','Tiny','Tobi','Tori','Tricia','Tucker','Tuna','Twiggy','Walter','Whiskers','Willow','Wyatt','Xman','Zakkie','Zebra'];
possibleColors = ['black','blue','brown','gray','green','orange','pink','purple','red','white','yellow'];

function Cat(name, age, colors) {
	var cat = {
		name: name,
		age: age,
		colors: colors,
	};
	return cat;
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cats', function(req, res, next) {
	var cats = db.getAll();
	var sortedCats = cats.sort(function(a,b) {
		return a.age - b.age;
	})
	res.render('cats', {
		catsByAge: sortedCats,
		showing: 'all cats'
	});
});

router.get('/cats/new', function(req, res, next) {
	var name = possibleNames[Math.floor(Math.random()*possibleNames.length)];
	var age = Math.floor(Math.random()*100);
	// Give it two random colors
	var colors = [];
	colors.push(possibleColors[Math.floor(Math.random()*possibleColors.length)]);
	colors.push(possibleColors[Math.floor(Math.random()*possibleColors.length)]);
	db.add(Cat(name, age, colors));
	res.render('newcat', {name: name});
});

router.get('/cats/delete/old', function(req, res, next) {
	var cats = db.getAll();
	console.log(cats.length);
	if (cats.length === 0) {
		res.render('nocats');
	}
	else {
		oldestCatIndex = 0;
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].age > cats[oldestCatIndex].age) {
				oldestCatIndex = i;
			}
		};
		oldestCat = cats[oldestCatIndex];
		db.remove(oldestCatIndex);
		// console.log(oldestCat.name)

		res.render('deleteOld',{cat: oldestCat});
	}
});

router.get('/cats/bycolor/:color', function(req,res,next) {
	var color = req.params.color;
	var allCats = db.getAll();
	var filteredCats = allCats.filter(function(cat) {
		return (cat.colors.indexOf(color) > -1);
	})
	var sortedCats = filteredCats.sort(function(a,b) {
		return a.age - b.age;
	})
	res.render('cats', {
		catsByAge: sortedCats,
		showing: color + '-colored cats'
	})
})

module.exports = router;
