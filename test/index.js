'use strict';

const red    = require('../index.js');
const chai   = require('chai');
const expect = chai.expect;



describe('tests of functionality of ancestors network', () => {

	describe('tests create users', () => {


		it('Should create a user zero', (done) =>  {
			
			let name = 'pepe';

			red.add(name);
			let user = red.find(name);

			expect(user).to.be.a('object');
			expect(user).to.have.property('name', name);
			expect(user).to.have.property('group');
			expect(user.group).to.have.lengthOf(0);
			done();
		});


		it('Should create a user in one lv', (done) =>  {
			
			let nameFather = 'pepe';
			let name       = 'tito';
			
			red.add(name, nameFather);
			let user = red.find(name);
			
			expect(user).to.be.a('object');
			expect(user).to.have.property('name', name);
			expect(user).to.have.property('group');

			expect(user.group).to.have.lengthOf(1);
			expect(user.group[0]).to.have.property('name', nameFather);
			done();
		});


		it('Should create a user in two lv', (done) =>  {
			let nameGrandPa = 'pepe';
			let nameFather  = 'tito';
			let name        = 'roco';
			
			red.add(name, nameFather);
			
			let user = red.find(name);
			
			expect(user).to.be.a('object');
			expect(user).to.have.property('name', name);
			expect(user).to.have.property('group');
		
			expect(user.group).to.have.lengthOf(2);
			expect(user.group[0]).to.have.property('name', nameGrandPa);
			expect(user.group[0]).to.have.property('level', 2);
			expect(user.group[1]).to.have.property('name', nameFather);
			expect(user.group[1]).to.have.property('level', 1);
			done();
		});


		it('Should create a user in three lv', (done) => {
			let nameGrandGrandPa = 'pepe';
			let nameGrandPa      = 'tito';
			let nameFather       = 'roco';
			let name             = 'poco';
			
			red.add(name, nameFather);
			
			let user = red.find(name);
			
			expect(user).to.be.a('object');
			expect(user).to.have.property('name', name);
			expect(user).to.have.property('group');
		
			expect(user.group).to.have.lengthOf(3);
			expect(user.group[0]).to.have.property('name', nameGrandGrandPa);
			expect(user.group[0]).to.have.property('level', 3);
			expect(user.group[1]).to.have.property('name', nameGrandPa);
			expect(user.group[1]).to.have.property('level', 2);
			expect(user.group[2]).to.have.property('name', nameFather);
			expect(user.group[2]).to.have.property('level', 1);
			done();
		});


		it('Should create a user in fourth lv', (done) => {
			let nameGrandGrandGrandPa = 'pepe';
			let nameGrandGrandPa     = 'tito';
			let nameGrandPa          = 'roco';
			let nameFather           = 'poco';
			let name                 = 'claudio';
			
			red.add(name, nameFather);
			
			let user = red.find(name);
			
			expect(user).to.be.a('object');
			expect(user).to.have.property('name', name);
			expect(user).to.have.property('group');

			expect(user.group).to.have.lengthOf(4);
			expect(user.group[0]).to.have.property('name', nameGrandGrandGrandPa);
			expect(user.group[0]).to.have.property('level', 4);
			expect(user.group[1]).to.have.property('name', nameGrandGrandPa);
			expect(user.group[1]).to.have.property('level', 3);
			expect(user.group[2]).to.have.property('name', nameGrandPa);
			expect(user.group[2]).to.have.property('level', 2);
			expect(user.group[3]).to.have.property('name', nameFather);
			expect(user.group[3]).to.have.property('level', 1);
			done();
		});


		/* ------------------------   */
		it('Should create one user that not bound to first user', (done) => {
			let nameGrandGrandGrandPa = 'tito';
			let nameGrandGrandPa     = 'roco';
			let nameGrandPa          = 'poco';
			let nameFather           = 'claudio';
			let name                 = 'julio';
			
			red.add(name, nameFather);
			
			let user = red.find(name);

			expect(user).to.be.a('object');
			expect(user).to.have.property('name', name);
			expect(user).to.have.property('group');
		
			expect(user.group).to.have.lengthOf(4);
			expect(user.group[0]).to.have.property('name', nameGrandGrandGrandPa);
			expect(user.group[0]).to.have.property('level', 4);
			expect(user.group[1]).to.have.property('name', nameGrandGrandPa);
			expect(user.group[1]).to.have.property('level', 3);
			expect(user.group[2]).to.have.property('name', nameGrandPa);
			expect(user.group[2]).to.have.property('level', 2);
			expect(user.group[3]).to.have.property('name', nameFather);
			expect(user.group[3]).to.have.property('level', 1);
			done();
		});

		it('Should create one user that not bound to second user', (done) => {
			let nameGrandGrandGrandPa = 'roco';
			let nameGrandGrandPa      = 'poco';
			let nameGrandPa           = 'claudio';
			let nameFather            = 'julio';
			let name                  = 'dalia';
			
			red.add(name, nameFather);
			
			let user = red.find(name);

			expect(user).to.be.a('object');
			expect(user).to.have.property('name', name);
			expect(user).to.have.property('group');
		
			expect(user.group).to.have.lengthOf(4);
			expect(user.group[0]).to.have.property('name', nameGrandGrandGrandPa);
			expect(user.group[0]).to.have.property('level', 4);
			expect(user.group[1]).to.have.property('name', nameGrandGrandPa);
			expect(user.group[1]).to.have.property('level', 3);
			expect(user.group[2]).to.have.property('name', nameGrandPa);
			expect(user.group[2]).to.have.property('level', 2);
			expect(user.group[3]).to.have.property('name', nameFather);
			expect(user.group[3]).to.have.property('level', 1);
			done();
		});

	});


	describe('test for delete users', () => {

			
		before('', (done) => {

			let GrandGrandGrandPa  = 'rober';
			// they are rober's red 
			let GrandGrandPa       = 'trantino';
			let GrandPa            = 'carmelo';
			let Father             = 'jose obtudio';
			let GrandShon          = 'julio';
			let GrandDaughter      = 'jessica';
			
			red.add(GrandGrandGrandPa);
			red.add(GrandGrandPa, GrandGrandGrandPa);
			red.add(GrandPa, GrandGrandPa);
			red.add(Father, GrandPa);
			red.add(GrandShon, Father);
			red.add(GrandDaughter, Father);


			// she is tarantino's red
			let GreatGrandDaughter = 'penelope';


			red.add(GreatGrandDaughter, GrandDaughter);

			
			done();

		});

		it('Should by remove a user', (done) => {

			let name = 'jose obtudio';

			red.remove(name);

			let user = red.find(name);
			let childrens = red.findChildrens(name);

			expect(user).to.be.undefined;
			expect(childrens).to.be.empty;

			done();

		});

	});

});