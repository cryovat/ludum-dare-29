ig.module(
    'game.entities.diver'
    )
    .requires(
        'impact.sound',

        'plusplus.abstractities.character',
        'plusplus.entities.conversation',

        'game.entities.airSource',
        'game.entities.treasure',
        'game.entities.refuge',

        'game.ui.airMeter'
    )
    .defines(function () {

        var DiverParameters = {
            AirDrainDelay: 1,
            AirDrainAmount: 1,

            AirAmount: 10
        },
        DiverPriority = {
            TREASURE: 1,
            AIR: 2,
            GOING_HOME: 3,

            CHANGE_THRESHOLD: 0.4
        },
        diverCount = 0;

        function getTreasures() {
            return ig.game.getEntitiesByClass(EntityTreasure);
        };

        function getAirSources() {
            return ig.game.getEntitiesByClass(EntityAirSource).filter(function (v, i, a) {
                return v.energy > 0;
            });
        };

        function getRefuges() {
            return ig.game.getEntitiesByClass(EntityRefuge);
        };

        ig.EntityDiver = ig.global.EntityDiver = ig.Character.extend({

            type: ig.Entity.TYPE.A,

            size: { x: 10, y: 16 },
            origin: { x: 5, y: 8 },

            airTimer: null,
            carriedTreasures: 0,

            collides: ig.Entity.COLLIDES.PASSIVE,
            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
            canPathfind: true,

            currentPriority: DiverPriority.TREASURE,

            energy: DiverParameters.AirAmount,
            energyMax: DiverParameters.AirAmount,

            lowAirSound: new ig.Sound('sfx/lowair.*'),

            animSheet: new ig.AnimationSheet('media/player.png', 10, 16),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0], frameTime: 1 }
            },

            init: function (x, y, settings) {
                this.parent(x, y, settings);

                if (ig.editor) {
                    return;
                }

                this.airTimer = new ig.Timer();
                this.airTimer.set(DiverParameters.AirDrainDelay);

                this.meter = ig.game.spawnEntity(UIAirMeter, 0, 0, {
                    targetEntity: this
                });

                diverCount++;
                this.name = "diver" + diverCount;
            },

            say: function (text) {
                if (this.textbubble) {
                    this.textbubble.kill();
                }

                this.textbubble = ig.game.spawnEntity(ig.EntityConversation, 0, 0);
                this.textbubble.addStep(text, this.name);
                this.textbubble.activate();
            },

            update: function () {

                this.parent();

                this.airTimer.tick();
                if (this.airTimer.delta() >= 0) {
                    this.drainEnergy(DiverParameters.AirDrainAmount, null, true);
                    this.airTimer.set(DiverParameters.AirDrainDelay);
                }

                if (this.energy / this.energyMax < DiverPriority.CHANGE_THRESHOLD && this.currentPriority !== DiverPriority.AIR) {
                    this.currentPriority = DiverPriority.AIR;
                    this.say("Oh no!");
                    this.lowAirSound.play();
                }

                if (this.currentPriority == DiverPriority.AIR) {
                    var sources = getAirSources();

                    if (sources.length > 0) {
                        this.moveTo(sources[0]);
                    }
                }
                else if (this.currentPriority == DiverPriority.TREASURE) {
                    var sources = getTreasures();

                    if (sources.length > 0) {
                        this.moveTo(sources[0]);
                    }
                    else {
                        this.currentPriority = DiverPriority.GOING_HOME;
                    }
                }

                if (this.currentPriority == DiverPriority.GOING_HOME) {
                    var refuges = getRefuges();

                    if (refuges.length > 0) {
                        this.moveTo(refuges[0]);
                    }
                }

                if (this.energy <= 0) {
                    this.kill();
                }
            },

            addTreasure: function () {
                this.carriedTreasures++;
            },

            isDone: function () {
                return this.currentPriority === DiverPriority.GOING_HOME || getTreasures().length === 0;
            },

            receiveEnergy: function (amount, from) {
                if (this.currentPriority == DiverPriority.AIR && ((this.energy + amount) / this.energyMax > DiverPriority.CHANGE_THRESHOLD)) {
                    this.say("Whew");

                    this.currentPriority = getTreasures().length === 0 ? DiverPriority.GOING_HOME : DiverPriority.TREASURE;
                }

                this.parent(amount, from);
            },

            kill: function (silent) {
                if (!silent) {
                    while (this.carriedTreasures > 0) {
                        this.carriedTreasures--;
                        ig.game.spawnEntity(ig.EntityTreasure, this.pos.x, this.pos.y);
                    }
                }

                this.parent(silent);
                this.meter.kill();
            }

        });
    });