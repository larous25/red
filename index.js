'use strict';

// list of users
var users = [];


const one  = 1;
const four = 4;
const zero = 0; 

/** 
 * add a user name
 * @param { String } name       [ name of a user]
 * @param {String} nameFather [ name's user father  ]
 */
function add(name, nameFather = ''){
	
	let array = [];
	let user  = {};
	
	if(nameFather !== ''){

		let fatherArray = find(nameFather).group; 
	
		array = fatherArray.map((user) => {
			return Object.assign({}, user);
		});

		if(array.length == four){
			 array.shift();	
		}

		for (var i = zero; i < array.length; i++) {
			if(array[i].level){
				array[i].level += one;
			}
		}

 		array.push({
 			name  : nameFather,
 			level : one
 		});

	}

	user = tempalte(name, array);

	users.push(user);

}


function remove(name){
	
	let user    = find(name);
	let usersOf = findChildrens(name);

	if(usersOf.length > zero){
		// search a element whit a level four and change the father
		if(user.group[zero].nivel == four){
				
				usersOf.forEach(e => {
					if((e.group[zero].nivel == four) && (e.group[zero].name == name)){
						e.group[zero].name = user.group[zero].name;
					}
				});
		}else{
			for (let j = 0; j < usersOf.length; j++) {

				for (let i = 0; i < usersOf[j].group.length; i++) {
					usersOf[j].group[i].level -= one;
					if(usersOf[j].group[i].name == name){
						usersOf[j].group.splice(i, one);
						break;
					}
				}
			}
		}
	}

	for (let i = 0; i < users.length; i++) {
		if(users[i].name == name){
			users.splice(i, one);
			break;
		}

	}
	
}



/**
 * search one user by name
 * @param  {String} name
 * @return {Object} 
 */
function find(name){
	return users.find(user => {
		return (user.name == name);
	});
}


function findChildrens(name){
	let usersOf = [];

	usersOf = users.filter(user => {

		let s = user.group.some( user => {
			return (user.name == name); 
		});

		if(s){
			return user;
		}

	});

	return usersOf;
}

/**
 * create a user's schema 
 * @return { Object }        [create a users schema]
 */
function tempalte(string, array){
	return {
		name  :string,
		group :array,
	};
}






module.exports = {
	add,
	remove,
	find,
	findChildrens,
	users
};
