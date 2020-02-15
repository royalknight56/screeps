/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('build.ob');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    ob(obr){
        if(obr==undefined){
            return -1;
        }
        let rn="W"
        let last="W10N";
        rn+='10';
        rn+='N';
        rn+=30+Game.time%10;
        last+=30+(Game.time-1)%10;
        obr.observeRoom(rn);
        //console.log(rn+'--'+last)
        if(Game.rooms[last]==undefined){
            return;
        }
        const targets=Game.rooms[last].find(FIND_DEPOSITS);
        if(targets.length>0){
            //console.log('type:'+targets[0].depositType+' cool:'+targets[0].lastCooldown+' pos:'+last);
        }
        const ptargets=Game.rooms[last].find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_POWER_BANK }
        });
        if(ptargets.length>0){
            //console.log('Decay:'+ptargets[0].ticksToDecay+' pos:'+last);
        }
    }
};