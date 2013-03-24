   
function SpawnShip(entry, exit) {

    GameEngine.spawn(new factory['SimpleShip'](entry.x, entry.y, exit.x, exit.y));
}

//DRAFT - to be modified area start
Player0 = {
	turret: null

}


assets = { 
	'background': 'img/black.jpg',
	'turret'	: 'img/turret.jpg',
	'ship' 		: 'img/ship.jpg',
	'bullet'	: 'img/bullet.jpg'
}

factory = {};

//DRAFT - to be modified area stop

GameEngine = { 

	ctx: null,
	canvas: null,

    // DRAFT - Entries and exit points should be defined at the AI module.

    entry1: {
        x: 1,
        y: 1
    },

    entry2: {
        x: 400,
        y: 1
    },

    entry3: {
        x: 750,
        y: 1
    },

    exit1: {
        x: 1,
        y: 600
    },

    exit2: {
        x: 800,
        y: 600
    },      


	Entities: [],

	init: function (canvas) {

		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
	
		PhysicsEngine.addContactListener({
			
			PostSolve: function(A,B) {
				if( A.GetUserData().id == 'bullet' ) {
					B.GetUserData().ent.kill();
					A.GetUserData().ent.kill();
				}
			}

		});
	},

	draw: function () {

		var ctx = this.ctx;
		
		//DRAFT start
		ctx.drawImage( Loader.load(assets['background']),
						0, 0, 
						this.canvas.width, this.canvas.height);
		//DRAFT end
		
		var ent = this.Entities;

		for ( i in ent ) {
			ent[i].draw(ctx);	
		}

	},
	update: function () {
		
		//DRAFT start
		if(InputEngine.actions['fire-primary']) {
			Player0.turret._fireTrigger = true;	
		}
		else {
			Player0.turret._fireTrigger = false;	
		}
		if(InputEngine.actions['look-up']) {
			if (InputEngine.mouse.x<420){
				InputEngine.mouse.x+=20;
				InputEngine.mouse.y=-1;}
			else if (InputEngine.mouse.x>420){
				InputEngine.mouse.x-=20;
				InputEngine.mouse.y=-1;}
			
		};
		if(InputEngine.actions['look-right']) {
			if(InputEngine.mouse.x<880){
				InputEngine.mouse.x+=20;
				InputEngine.mouse.y=100;
			}
		};
		if(InputEngine.actions['look-left']) {
			if (InputEngine.mouse.x>-20){
				InputEngine.mouse.x-=20;
				InputEngine.mouse.y=134;
			}
		};
		//DRAFT end

		
		var ent = this.Entities;
		var dead = [];	

		for (var i=ent.length; i-- ; i) {
		
			if (ent[i]._killed === true) {
				dead.push(i);
			} 
			else {
				ent[i].update();	
			}
		}

		for (var i=0; i < dead.length; i++) {
			
			if (ent[dead[i]].physBody !== null) {
				PhysicsEngine.removeBodyAsObj(ent[dead[i]].physBody);			
			}
			ent.splice(dead[i], 1);

		}

	},

	//DRAFT spawn must use String of Classname as param
	spawn: function (Entity) {
		
		this.Entities.push(Entity); 
		return Entity;
	},
	

	removeEntity: function(ent) {

		ent._killed = true;
	}

}


