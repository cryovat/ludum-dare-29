ig.module(
    'game.entities.scoreTracker'
    )
    .requires(
        'plusplus.core.entity',
        'plusplus.abstractities.character',

        'plusplus.ui.ui-text'

    )
    .defines(function () {

        ig.EntityScoreTracker = ig.global.EntityScoreTracker = ig.EntityExtended.extend({

            size: { x: 32, y: 32 },

            _wmScalable: false,
            _wmDrawbox: true,
            _wmBoxColor: 'rgba(0,0,255,0.5)',

            score: 0,

            init: function (x, y, settings) {

                this.parent(x, y, settings);

                if (ig.editor) {
                    return;
                }

                var _c = ig.CONFIG;

                this.label = score = ig.game.spawnEntity(ig.UIText, 40, 40, {
                    font: new ig.Font(_c.PATH_TO_MEDIA + '04b03.font.png'),
                    text: 'Score: ' + this.score,
                    margin: { x: 0.2, y: 0.2 }
                });
            },

            addScore: function (amount) {
                this.score += amount;
                this.label.text = 'Score: ' + this.score;
            },

            kill: function () {

                if (this.label)
                {
                    this.label.kill();
                }
            }


        });
    });