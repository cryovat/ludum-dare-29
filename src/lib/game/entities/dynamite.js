ig.module(
    'game.entities.dynamite'
    )
    .requires(
        'impact.sound',

        'plusplus.core.entity',
        'plusplus.entities.explosion',
        'plusplus.abstractities.particle'
    )
    .defines(function () {

        ig.EntityDynamite = ig.global.EntityDynamite = ig.EntityExtended.extend({

            size: { x: 7, y: 25 },
            origin: { x: 0, y: 0 },

            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
            collides: ig.Entity.COLLIDES.ACTIVE,
            minBounceVelocity: 9999,

            animSheet: new ig.AnimationSheet('media/dynamite.png', 7, 25),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0, 1, 2, 3], frameTime: 1 }
            },

            soundEffect: new ig.Sound('sfx/boom.*'),

            update: function () {

                this.parent();

                if (!this.movingY) {
                    this.boom();
                }


            },

            boom: function () {
                this.kill();
                this.soundEffect.play();
                ig.game.spawnEntity(ig.EntityExplosion, this.pos.x, this.pos.y, {
                    spawnCountMax: 40
                });

                ig.game.spawnEntity(ig.EntityExtended.extend({
                    check: function (other) {
                        other.receiveDamage(100, this);
                    },
                    update: function () {
                        this.parent();

                        if (this.done) {
                            this.kill(true);
                        }
                        this.done = true;
                    }
                }), this.pos.x - 16, this.pos.y - 16, {
                    checkAgainst: ig.Entity.TYPE.A,
                    size: { x: this.size.x + 32, y: this.size.y + 32 }
                });
            }

        });
    });