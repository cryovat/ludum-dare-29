ig.module(
    'game.entities.shell'
    )
    .requires(
        'impact.sound',
        'plusplus.core.entity',
        'plusplus.abstractities.character',

        'plusplus.ui.ui-button',

        'game.entities.scoreTracker',

        'game.entities.diver',
        'game.entities.treasure',
        'game.entities.divingBell',
        'game.entities.dynamite',
        'game.entities.airTank',

        'game.entities.gameOver',
        'game.entities.victory'
    )
    .defines(function () {

        var clampXToWorld = function (i) {
            return Math.max(16, Math.min(i.worldX, 304));
        }, getDropperPosition = function () {
            return clampXToWorld(ig.input.getInputPoint(ig.KEY.MOUSE1));
        }, GameStates = {
            RUNNING: 1,
            VICTORY: 2,
            FAILURE: 3
        };

        ig.EntityShell = ig.global.EntityShell = ig.EntityExtended.extend({

            size: { x: 32, y: 32 },

            gameState: GameStates.RUNNING,

            _wmScalable: false,
            _wmDrawbox: true,
            _wmBoxColor: 'rgba(0,255,0,0.5)',

            selectSound: new ig.Sound('sfx/select.*'),
            dropSound: new ig.Sound('sfx/drop.*'),
            victorySound: new ig.Sound('sfx/victory.*'),
            deathSound: new ig.Sound('sfx/death.*'),

            init: function (x, y, settings) {

                this.parent(x, y, settings);

                if (ig.editor) {
                    return;
                }

                this.tank = new ig.Image('media/airtank.png');
                this.bell = new ig.Image('media/divingbell.png');
                this.dyno = new ig.Image('media/dynamite.png');

                this.button1 = ig.game.spawnEntity(UIButton, 0, 0, {
                    margin: { x: 0.1, y: 1.7 },
                    size: { x: 32, y: 32 },
                    animSheet: new ig.AnimationSheet('media/buttons.png', 32, 32),
                    animSettings: {
                        released: { sequence: [0], frameTime: 1 },
                        tappedX: { sequence: [1], frameTime: 0.1 },
                        disabledX: { sequence: [2], frameTime: 0.25 }
                    },
                    alwaysToggleActivate: true
                });

                this.button2 = ig.game.spawnEntity(UIButton, 0, 0, {
                    margin: { x: 2.3, y: 1.7 },
                    size: { x: 32, y: 32 },
                    animSheet: new ig.AnimationSheet('media/buttons.png', 32, 32),
                    animSettings: {
                        released: { sequence: [4], frameTime: 1 },
                        tappedX: { sequence: [5], frameTime: 0.1 },
                        disabledX: { sequence: [6], frameTime: 0.25 }
                    },
                    alwaysToggleActivate: true
                });

                this.button3 = ig.game.spawnEntity(UIButton, 0, 0, {
                    margin: { x: 0.4, y: 1.7 },
                    size: { x: 32, y: 32 },
                    animSheet: new ig.AnimationSheet('media/buttons.png', 32, 32),
                    animSettings: {
                        released: { sequence: [8], frameTime: 1 },
                        tappedX: { sequence: [9], frameTime: 0.1 },
                        disabledX: { sequence: [10], frameTime: 0.25 }
                    },
                    alwaysToggleActivate: true
                });

                this.button4 = ig.game.spawnEntity(UIButton, 0, 0, {
                    margin: { x: 0.7, y: 1.7 },
                    size: { x: 32, y: 32 },
                    animSheet: new ig.AnimationSheet('media/buttons.png', 32, 32),
                    animSettings: {
                        released: { sequence: [12], frameTime: 1 },
                        tappedX: { sequence: [13], frameTime: 0.1 },
                        disabledX: { sequence: [14], frameTime: 0.25 }
                    },
                    alwaysToggleActivate: true
                });

                this.button2.onActivated.add(function (btn) {

                    this.selectSound.play();
                    ig.game.reset();

                }, this);

                this.button1.onActivated.add(function (btn) {

                    this.selectSound.play();
                    this.spawn = 'bell';

                }, this);


                this.button3.onActivated.add(function (btn) {

                    this.selectSound.play();
                    this.spawn = 'tank';

                }, this);

                this.button4.onActivated.add(function (btn) {

                    this.selectSound.play();
                    this.spawn = 'dyno';

                }, this);
            },

            getGameState: function () {

                var treasure = ig.game.getEntitiesByClass(EntityTreasure),
                    divers = ig.game.getEntitiesByClass(EntityDiver),
                    bells = ig.game.getEntitiesByClass(EntityDivingBell),
                    tracker = this.tracker,
                        i;

                if (treasure.length === 0 && bells.length === 0) {
                    return GameStates.VICTORY;
                }

                if (tracker.bellsLeft === 0 && divers.length === 0 && treasure.length > 0) {

                    if (bells.length === 0) {
                        return GameStates.FAILURE
                    }

                    for (i = 0; i < bells.length; i++) {
                        if (bells[i].occupancy > 0) {
                            return GameStates.RUNNING;
                        }
                    }

                    return GameStates.FAILURE;
                }

                return GameStates.RUNNING;
            },

            update: function () {

                this.parent();

                if (this.gameState == GameStates.RUNNING) {
                    if (!this.tracker) {
                        var trackers = ig.game.getEntitiesByClass(EntityScoreTracker);
                        if (trackers.length == 0) {
                            throw new Error("Score tracker not found!!");
                        }

                        this.tracker = trackers[0];
                    }

                    var point = ig.input.getInputPoint(ig.KEY.MOUSE1), st;

                    if (this.spawn && point.tapped) {

                        if (this.spawn === 'bell') {
                            ig.game.spawnEntity(EntityDivingBell, clampXToWorld(point) - this.bell.width / 2, 0);
                            this.dropSound.play();
                            this.tracker.bellsLeft--;
                        }
                        else if (this.spawn === 'dyno') {
                            ig.game.spawnEntity(EntityDynamite, clampXToWorld(point) - this.dyno.width / 4 / 2, 0);
                            this.dropSound.play();
                            this.tracker.dynamiteLeft--;
                        }
                        else if (this.spawn === 'tank') {
                            ig.game.spawnEntity(EntityAirTank, clampXToWorld(point) - this.tank.width / 2, 0);
                            this.dropSound.play();
                            this.tracker.tanksLeft--;
                        }

                        this.spawn = null;
                        return;
                    }

                    if (this.tracker.bellsLeft === 0) {
                        this.button1.disable();
                    }

                    if (this.tracker.dynamiteLeft === 0) {
                        this.button4.disable();
                    }

                    if (this.tracker.tanksLeft === 0) {
                        this.button3.disable();
                    }

                    st = this.getGameState();

                    if (st === GameStates.VICTORY) {
                        this.gameState = st;
                        this.button1.disable();
                        this.button4.disable();
                        this.button3.disable();
                        this.victorySound.play();

                        this.button5 = ig.game.spawnEntity(UIButton, 0, 0, {
                            margin: { x: 2, y: 1.7 },
                            size: { x: 32, y: 32 },
                            animSheet: new ig.AnimationSheet('media/buttons.png', 32, 32),
                            animSettings: {
                                released: { sequence: [16], frameTime: 1 },
                                tappedX: { sequence: [17], frameTime: 0.1 },
                                disabledX: { sequence: [18], frameTime: 0.25 }
                            },
                            alwaysToggleActivate: true
                        });

                        this.button5.onActivated.add(function (btn) {

                            this.tracker.loadNextLevel();

                        }, this);

                        ig.game.spawnEntity(EntityVictory, 54, 78);
                    }
                    else if (st === GameStates.FAILURE) {
                        this.gameState = st;
                        this.button1.disable();
                        this.button4.disable();
                        this.button3.disable();
                        this.deathSound.play();

                        ig.game.spawnEntity(EntityGameOver, 54, 79);
                    }

                }

            },

            draw: function () {

                this.parent();

                if (this.spawn === 'bell') {
                    this.bell.draw(getDropperPosition() - this.bell.width / 2, 0);
                }
                else if (this.spawn === 'tank') {
                    this.tank.draw(getDropperPosition() - this.tank.width / 2, 0);
                }
                else if (this.spawn === 'dyno') {
                    this.dyno.draw(getDropperPosition() - this.dyno.width / 4 / 2, 0, 0, 0, 7, 25);
                };
            },

            kill: function () {

                if (this.button1) {
                    this.button1.kill();
                    this.button2.kill();
                }
            }


        });
    });