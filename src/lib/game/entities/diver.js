ig.module(
    'game.entities.diver'
    )
    .requires(
        'plusplus.abstractities.character',
        'plusplus.entities.conversation',

        'game.entities.airSource',
        'game.entities.treasure',

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

            CHANGE_THRESHOLD: 0.4
        },
        diverCount = 0;

        function getTreasures() {
            return ig.game.getEntitiesByClass(EntityTreasure).filter(function (v, i, a) {
                return v.health > 0;
            });
        };

        function getAirSources() {
            return ig.game.getEntitiesByClass(EntityAirSource).filter(function (v, i, a) {
                return v.health > 0;
            });
        };        

        ig.EntityDiver = ig.global.EntityDiver = ig.Character.extend({

            type: ig.Entity.TYPE.A,

            size: { x: 10, y: 16 },
            origin: { x: 5, y: 8 },

            airTimer: null,

            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
            canPathfind: true,

            currentPriority: DiverPriority.TREASURE,

            energy: DiverParameters.AirAmount,
            energyMax: DiverParameters.AirAmount,

            animSheet: new ig.AnimationSheet('media/player.png', 10, 16),
            animInit: 'def',
            animSettings: {
                def: { sequence: [0], frameTime: 1 }
            },

            init: function(x, y, settings)
            {
                this.parent(x, y, settings);

                if (ig.editor) {
                    return;
                }

                this.airTimer = new ig.Timer();
                this.airTimer.set(DiverParameters.AirDrainDelay);

                this.meter = ig.game.spawnEntity(UIAirMeter, 0, 0);
                this.meter.setTarget(this);

                diverCount++;
                this.name = "diver" + diverCount;
            },

            say: function (text)
            {
                if (this.textbubble)
                {
                    this.textbubble.kill();
                }

                this.textbubble = ig.game.spawnEntity(ig.EntityConversation, 0, 0);
                this.textbubble.addStep(text, this.name);
                this.textbubble.activate();
            },

            update: function () {

                this.parent();

                this.airTimer.tick();
                if (this.airTimer.delta() >= 0)
                {
                    this.drainEnergy(DiverParameters.AirDrainAmount, null, true);
                    this.airTimer.set(DiverParameters.AirDrainDelay);
                }

                if (this.energy / this.energyMax < DiverPriority.CHANGE_THRESHOLD && this.currentPriority == DiverPriority.TREASURE)
                {
                    this.currentPriority = DiverPriority.AIR;
                    this.say("Oh no!");
                }

                if (this.currentPriority == DiverPriority.AIR)
                {
                    var sources = getAirSources();

                    if (sources.length > 0)
                    {
                        this.moveTo(sources[0]);
                    }
                }
                else if (this.currentPriority == DiverPriority.TREASURE) {
                    var sources = getTreasures();

                    if (sources.length > 0) {
                        this.moveTo(sources[0]);
                    }
                }

                if (this.energy <= 0)
                {
                    this.kill();
                }
            },

            receiveEnergy: function (amount, from)
            {
                if (this.currentPriority == DiverPriority.AIR && ((this.energy + amount) / this.energyMax > DiverPriority.CHANGE_THRESHOLD))
                {
                    this.say("Whew");
                    this.currentPriority = DiverPriority.TREASURE;
                }

                this.parent(amount, from);
            },

            kill: function () {
                this.parent();
                this.meter.kill();
            }

        });
    });