ig.module(
    'game.entities.gameOver'
    )
    .requires(
        'plusplus.core.entity',
        'plusplus.entities.explosion'
    )
    .defines(function () {

        ig.EntityGameOver = ig.global.EntityGameOver = ig.EntityExtended.extend({

            size: { x: 212, y: 81 },

            animSheet: new ig.AnimationSheet('media/gameOver.png', 212, 81),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0], frameTime: 1 }
            }

        });
    });