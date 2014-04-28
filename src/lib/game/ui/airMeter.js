ig.module(
    'game.ui.airMeter'
    )
    .requires(
        'plusplus.ui.ui-meter'
    )
    .defines(function () {

        ig.UIAirMeter = ig.global.UIAirMeter = ig.UIMeter.extend({

            backgroundStyle: '',
            fillStyle: 'rgb(150,150,255)',

            posAsPct: false,

            size: { x: 0, y: 0},

            init: function (x, y, settings) {

                settings.barSize = { x: Math.min(settings.targetEntity.energyMax, 30), y: 4 }

                this.parent(x, y, settings);
            },

            update: function () {
                if (this.targetEntity)
                {
                    this.pos = {
                        x: this.targetEntity.posDraw.x + this.targetEntity.sizeDraw.x / 2 - this.sizeDraw.x / 2,
                        y: this.targetEntity.posDraw.y - 8
                    };
                    this.posDraw = this.pos;

                    var val = this.targetEntity.energy / this.targetEntity.energyMax;

                    if (this.meterValue >= 0.3 && val < 0.3)
                    {
                        this.fillStyle = 'rgb(255,50,50)';
                        this.rebuild();
                    }

                    if (this.meterValue < 0.3 && val >= 0.3)
                    {
                        this.fillStyle = 'rgb(150,150,255)';
                        this.rebuild();
                    }

                    this.setMeterValue(val);
                }
            }

        });

    });