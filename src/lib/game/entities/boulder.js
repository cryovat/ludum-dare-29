ig.module(
    'game.entities.boulder'
    )
    .requires(
        'plusplus.core.entity',
        'plusplus.entities.explosion'
    )
    .defines(function () {

        ig.EntityBoulder = ig.global.EntityBoulder = ig.EntityExtended.extend({

            size: { x: 32, y: 32 },
            origin: { x: 0, y: 0 },

            collides: ig.Entity.COLLIDES.ACTIVE,
            minBounceVelocity: 9999,
            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
            type: ig.Entity.TYPE.A,

            health: 50,

            animSheet: new ig.AnimationSheet('media/boulder.png', 32, 32),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0], frameTime: 1 }
            },

            kill: function (silent) {

                this.parent(silent);
                
                if (!silent) {
                    ig.game.spawnEntity(EntityExplosion, this.pos.x, this.pos.y, {
                        spawnCountMax: 20
                    });
                }
            }

        });
    });