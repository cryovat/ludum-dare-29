ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'impact.input',
    'impact.sound',
    'plusplus.core.plusplus',

    //'impact.debug.debug',
    //'plusplus.debug.debug',

    'plusplus.ui.ui-element',
    'plusplus.ui.ui-button',

    'game.entities.airSource',

    'game.levels.level1',
    'game.levels.level2',
    'game.levels.level3',
    'game.levels.level4'
)
.defines(function(){

MyGame = ig.GameExtended.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

    currentLevel: LevelLevel1,

	reset: function (level) {

	    var arr = this.getEntitiesByClass(UIElement), i;

	    for (i = 0; i < arr.length; i++) {
	        arr[i].kill(false);
	    }

	    if (level) {
	        this.currentLevel = window['Level' + level];
	    }

	    this.unloadLevelDeferred();
	},

	init: function() {
	    // Initialize your game here; bind keys etc.

	    ig.input.initMouse();
	    ig.input.bind(ig.KEY.MOUSE1, 'click');

	    ig.music.add('sfx/music.*');
	    ig.music.volume = 0.2;
	    ig.music.play();

	    this.reset();
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		if (!this.hasLevel)
		{
		    this.loadLevelDeferred(this.currentLevel);
		}

		// Add your own, additional update code here
	},
	
	draw: function () {
	    // Draw all entities and backgroundMaps
	    this.parent();


	    // Add your own drawing code here
	    var x = ig.system.width / 2,
			y = ig.system.height / 2;

	    //this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}

});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2, ig.LoaderExtended );

});
