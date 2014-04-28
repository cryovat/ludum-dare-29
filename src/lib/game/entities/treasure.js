ig.module(
    'game.entities.treasure'
    )
    .requires(
        'impact.sound',
        'plusplus.core.entity',
        'plusplus.abstractities.character',

        'game.entities.scoreTracker'
    )
    .defines(function () {

        var TreasureParameters = {
            StandardAmount: 20
        };

        ig.EntityTreasure = ig.global.EntityTreasure = ig.EntityExtended.extend({

            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
            collides: ig.Entity.COLLIDES.LITE,
            checkAgainst: ig.Entity.TYPE.A,
            scoreAmount: TreasureParameters.StandardAmount,

            size: { x: 14, y: 11 },

            animSheet: new ig.AnimationSheet('media/treasure.png', 14, 11),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0], frameTime: 1 }
            },

            coinSound: new ig.Sound('sfx/coin.*'),

            collides: ig.Entity.COLLIDES.NEVER,

            check: function (other) {

                if (other instanceof ig.Character && other.addTreasure) {

                    var st = ig.game.getEntitiesByClass(EntityScoreTracker);

                    if (st.length == 0) {
                        throw new Error("Score tracker not found!!");
                    }

                    st[0].addScore(this.scoreAmount);
                    
                    other.addTreasure(1);

                    this.coinSound.play();
                    this.kill();

                }
            }

        });
    });