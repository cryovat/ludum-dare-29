ig.module(
    'game.entities.divingBell'
    )
    .requires(
        'impact.sound',
        'plusplus.core.entity',

        'game.ui.airMeter',

        'game.entities.treasure',
        'game.entities.refuge',
        'game.entities.diver',
        'game.entities.scoreTracker'
    )
    .defines(function () {

        var BellStates = {
            GOING_DOWN: 1,
            IDLE: 2,
            GOING_UP: 3
        }, BellParameters = {
            DIVER_SCORE: 20,
            TREASURE_SCORE: 50,
            BELL_SCORE: 30
        };


        ig.EntityDivingBell = ig.global.EntityDivingBell = ig.EntityRefuge.extend({

            size: { x: 32, y: 32 },
            origin: { x: 0, y: 0 },

            health: 50,
            energy: 100,
            energyMax: 100,
            capacity: 1,
            occupancy: 1,
            treasureCount: 0,

            landSound: new ig.Sound('sfx/land.*'),
            returnSound: new ig.Sound('sfx/return.*'),

            animSheet: new ig.AnimationSheet('media/divingbell.png', 32, 32),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0], frameTime: 1 }
            },

            currentState: BellStates.GOING_DOWN,
            type: ig.Entity.TYPE.A,
            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
            collides: ig.Entity.COLLIDES.LITE,

            init: function (x, y, settings) {
                this.parent(x, y, settings);

                if (!ig.editor) {
                    this.meter = ig.game.spawnEntity(UIAirMeter, 10, 10, {
                        targetEntity: this
                    });
                }
            },

            update: function () {

                this.parent();

                if (this.grounded && this.currentState === BellStates.GOING_DOWN) {
                    this.currentState = BellStates.IDLE;
                    this.landSound.play();

                    while (this.occupancy > 0) {
                        ig.game.spawnEntity(EntityDiver, this.pos.x, this.pos.y);
                        this.occupancy--;
                    }
                }
                else if (this.grounded && this.currentState === BellStates.IDLE && this.occupancy > 0)
                {
                    var treasureLeft = ig.game.getEntitiesByClass(EntityTreasure).length;
                    var diverLeft = ig.game.getEntitiesByClass(EntityDiver).length;

                    if (treasureLeft === 0 && diverLeft === 0)
                    {
                        this.returnSound.play();
                        this.currentState = BellStates.GOING_UP;
                        this.gravityFactor = 0;
                        this.accel = { x: 0, y: -100 };
                    }
                    
                    if (treasureLeft > 0 && diverLeft === 0 && this.occupancy > 0)
                    {
                        ig.game.spawnEntity(EntityDiver, this.pos.x, this.pos.y);
                        this.occupancy--;
                    }
                }
                else if (this.currentState === BellStates.GOING_UP && !this.visible)
                {
                    var st = ig.game.getEntitiesByClass(EntityScoreTracker);

                    if (st.length == 0) {
                        throw new Error("Score tracker not found!!");
                    }

                    st[0].addScore(BellParameters.BELL_SCORE);
                    st[0].addScore(BellParameters.DIVER_SCORE * this.occupancy);
                    st[0].addScore(BellParameters.TREASURE_SCORE * this.occupancy);                    

                    this.kill(true);
                }

            },

            check: function (other) {
                if (other instanceof EntityDiver && other.isDone()) {
                    other.kill(true);
                    this.treasureCount += other.carriedTreasures;
                    this.occupancy++;
                }
                else {
                    this.parent(other);
                }

            },

            kill: function (silent) {

                if (!silent) {
                    while (this.treasureCount > 0) {
                        this.treasureCount--;
                        ig.game.spawnEntity(ig.EntityTreasure, this.pos.x, this.pos.y);
                    }
                }

                this.parent(silent);
                this.meter.kill();
            }

        });
    });