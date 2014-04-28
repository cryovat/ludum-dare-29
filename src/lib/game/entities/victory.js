ig.module(
    'game.entities.victory'
    )
    .requires(
        'plusplus.core.entity',
        'plusplus.entities.explosion'
    )
    .defines(function () {

        ig.EntityVictory = ig.global.EntityVictory = ig.EntityExtended.extend({

            size: { x: 212, y: 83 },

            animSheet: new ig.AnimationSheet('media/victory.png', 212, 83),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0], frameTime: 1 }
            }

        });
    });