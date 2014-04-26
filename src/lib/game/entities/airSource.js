ig.module(
    'game.entities.airSource'
    )
    .requires(
        'plusplus.core.entity',
        'plusplus.abstractities.character'

    )
    .defines(function () {

        var AirSourceParameters = {
            RefillAmount: 10
        };

        ig.EntityAirSource = ig.global.EntityAirSource = ig.EntityExtended.extend({

            checkAgainst: ig.Entity.TYPE.A,

            check: function (other) {

                if (other instanceof ig.Character && other.energy < other.energyMax && this.energy > 0) {

                    var needed = Math.min(AirSourceParameters.RefillAmount, other.energyMax - other.energy);

                    if (needed < 0)
                    {
                        return;
                    }

                    var amount = needed;

                    if (this.energy < needed)
                    {
                        amount = this.energy % needed;
                    }

                    this.energy -= amount;

                    other.receiveEnergy(amount, this);
                }
            }

        });
    });