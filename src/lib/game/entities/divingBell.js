ig.module(
    'game.entities.divingBell'
    )
    .requires(
        'plusplus.core.entity',
        'game.entities.airSource'
    )
    .defines(function () {

        ig.EntityDivingBell = ig.global.EntityDivingBell = ig.EntityAirSource.extend({

            size: { x: 32, y: 32 },
            origin: { x: 0, y: 0 },

            energy: 100,
            energyMax: 100,

            animSheet: new ig.AnimationSheet('media/divingbell.png', 32, 32),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0], frameTime: 1 }
            },

            init: function (x, y, settings) {
                this.parent(x, y, settings);

                if (!ig.editor) {
                    this.meter = ig.game.spawnEntity(UIAirMeter, 10, 10);
                    this.meter.setTarget(this);
                }
            },

            update: function () {

                this.parent();
            }

        });
    });