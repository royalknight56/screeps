/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('build.link');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    fromto(froml,tol){
        var i=0;
        var j=0;
        for(i=0;i<froml.length;i++){
            linkFrom=Game.getObjectById(froml[i]);
            if(linkFrom==null){
                continue;
            }
            
            linkTo=Game.getObjectById(tol)
            if(linkTo==null){
                break;
            }
            linkFrom.transferEnergy(linkTo);
        }
        //const linkFrom = Game.rooms['W17S21'].lookForAt('structure', 43, 39)[0];
    }
};