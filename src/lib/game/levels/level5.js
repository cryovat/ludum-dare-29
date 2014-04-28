ig.module( 'game.levels.level5' )
.requires( 'impact.image','game.entities.scoreTracker','game.entities.treasure','game.entities.shell','game.entities.boulder' )
.defines(function(){
LevelLevel5=/*JSON[*/{"entities":[{"type":"EntityScoreTracker","x":40,"y":72,"settings":{"bellsLeft":1,"dnamiteLeft":1}},{"type":"EntityTreasure","x":44,"y":116},{"type":"EntityShell","x":4,"y":72},{"type":"EntityBoulder","x":160,"y":160},{"type":"EntityBoulder","x":128,"y":160},{"type":"EntityTreasure","x":236,"y":148}],"layer":[{"name":"background","width":30,"height":15,"linkWithCollision":false,"visible":1,"tilesetName":"media/tiles.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[7,2,2,2,2,2,2,6,2,2,7,2,2,2,2,2,2,2,2,2,6,6,6,6,6,7,6,6,6,6],[8,8,8,8,8,8,8,18,2,2,2,2,25,8,8,8,8,8,8,8,6,6,6,6,6,6,6,6,6,6],[1,1,1,1,1,1,1,19,2,2,2,2,26,1,1,1,1,1,1,1,2,6,6,6,6,6,6,6,6,6],[1,20,30,30,30,30,30,21,2,2,2,2,26,1,1,1,1,1,1,1,2,6,6,6,7,6,6,6,6,6],[1,19,2,6,6,6,6,2,2,2,2,2,26,1,1,1,1,1,1,1,2,6,6,6,6,6,6,6,6,6],[1,1,2,2,2,2,2,2,6,6,6,6,24,30,30,30,30,23,1,1,2,6,6,6,6,6,6,6,6,6],[1,28,8,8,8,8,8,18,6,6,6,6,6,6,6,6,6,26,1,1,2,6,6,6,6,6,6,6,6,6],[28,1,1,1,1,1,1,19,6,2,2,6,6,6,6,6,6,26,1,1,9,6,6,6,6,6,6,6,6,6],[0,1,1,1,1,1,1,19,2,2,2,2,25,8,8,8,8,27,1,1,8,8,8,8,8,8,8,8,8,8],[1,1,1,1,1,1,1,19,2,2,2,2,26,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,8,8,8,8,8,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,8],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"collision","width":30,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelLevel5Resources=[new ig.Image('media/tiles.png')];
});