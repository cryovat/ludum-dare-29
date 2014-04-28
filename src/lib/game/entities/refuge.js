ig.module(
    'game.entities.refuge'
    )
    .requires(
        'game.entities.airSource'
    )
    .defines(function () {

        var AirSourceParameters = {
            RefillAmount: 10
        };

        ig.EntityRefuge = ig.global.EntityRefuge = ig.EntityAirSource.extend({

        });
    });