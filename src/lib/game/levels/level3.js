ig.module( 'game.levels.level3' )
.requires( 'impact.image','game.entities.scoreTracker','game.entities.treasure','game.entities.shell','game.entities.boulder' )
.defines(function(){
LevelLevel3=/*JSON[*/{"entities":[{"type":"EntityScoreTracker","x":40,"y":72,"settings":{"bellsLeft":1,"dnamiteLeft":1,"tanksLeft":0,"nextLevel":"Level4"}},{"type":"EntityTreasure","x":24,"y":132},{"type":"EntityShell","x":4,"y":72},{"type":"EntityBoulder","x":144,"y":112},{"type":"EntityBoulder","x":144,"y":80}],"layer":[{"name":"background","width":30,"height":15,"linkWithCollision":false,"visible":1,"tilesetName":"media/tiles.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[7,2,2,2,2,2,2,2,2,2,7,2,2,2,2,2,2,2,2,2,6,6,6,6,6,7,6,6,6,6],[2,2,2,7,2,2,2,2,2,2,2,2,2,2,2,2,7,2,2,2,6,6,6,6,6,6,6,6,6,6],[8,8,8,8,8,8,8,8,18,6,2,25,8,8,18,2,2,2,25,8,2,6,6,6,6,6,6,6,6,6],[1,1,1,1,1,1,1,1,19,6,2,26,1,1,19,2,2,2,26,1,2,6,6,6,7,6,6,6,6,6],[20,30,30,30,30,30,30,30,21,6,2,24,30,30,21,2,2,2,26,1,2,6,6,6,6,6,6,6,6,6],[19,6,6,7,6,6,6,6,6,6,6,6,6,6,7,6,2,2,26,1,2,6,6,6,6,6,6,6,6,6],[19,12,33,6,6,32,9,12,9,9,9,9,9,12,9,12,9,9,26,1,2,6,6,6,6,6,6,6,6,6],[28,8,18,6,6,25,8,8,8,8,8,8,8,8,8,8,8,8,8,1,9,6,6,6,6,6,6,6,6,6],[0,0,19,12,9,26,1,1,1,1,1,1,1,0,0,0,0,0,1,1,8,8,8,8,8,8,8,8,8,8],[1,0,8,8,8,8,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,8],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"collision","width":30,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],[1,1,1,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelLevel3Resources=[new ig.Image('media/tiles.png')];
});