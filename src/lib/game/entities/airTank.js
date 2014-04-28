ig.module(
    'game.entities.airTank'
    )
    .requires(
        'plusplus.core.entity',

        'game.entities.airSource'
    )
    .defines(function () {

        ig.EntityAirTank = ig.global.EntityAirTank = ig.EntityAirSource.extend({

            size: { x: 16, y: 16 },
            origin: { x: 0, y: 0 },

            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
            collides: ig.Entity.COLLIDES.PASSIVE,
            type: ig.Entity.TYPE.A,

            energy: 10,
            energyMax: 10,
            capacity: 1,
            occupancy: 1,
            treasureCount: 0,

            animSheet: new ig.AnimationSheet('media/airtank.png', 16, 16),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0], frameTime: 1 }
            },

            init: function (x, y, settings) {
                this.parent(x, y, settings);

                if (!ig.editor) {
                    this.meter = ig.game.spawnEntity(UIAirMeter, 10, 10, {
                        targetEntity: this
                    });
                }
            },

            kill: function (silent) {
                this.parent(silent);
                this.meter.kill();
            }

        });
    });