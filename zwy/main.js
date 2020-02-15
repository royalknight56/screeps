var buds = require('role.buil');
var upds = require('role.upd');
var rep = require('role.rep');
var toee = require('build.tower');
var car = require('role.carry');
var carr = require('role.carr');
var task = require('task.main');
var luo = require('task.luo');
var link = require('build.link');
var wor2 = require('role.work2');
var con = require('config');
var comm = require('task.comm');
var tas = require('task.carry');
var pow = require('role.pc');
var obb = require('build.ob');
require('buildMemory');
//require('prototype.Creep.move')
//Game.task=task.test();

//Object.defineProperty(global, 'test', { get: () => { console.log('执行命令'+global.getPrototypeOf('test') } });
var timeout = 0;
var cons = 0;
var stat = 0;
var ifbuil = 0;
module.exports.loop = function () {
    
    //Memory.grafana.progress = Game.getObjectById('5bbcac7c9099fc012e635893').progress;
    //Memory.grafana.progress2 = Game.getObjectById('5bbcac889099fc012e635a4f').progress;
    //Memory.grafana.progress3 = Game.getObjectById('5bbcac5e9099fc012e63558b').progress;
    //Memory.grafana.storage = Game.getObjectById('5e19fdb5ea8896486b87d6cf').store[RESOURCE_ENERGY];
    //Memory.grafana.storage2 = Game.getObjectById('5e1b0c8bca55d77f9772a5b0').store[RESOURCE_ENERGY];
    //Memory.grafana.storage3 = Game.getObjectById('5e20669e4bbaeae8418612df').store[RESOURCE_ENERGY];
    //tas.groupdef('W7N33');
    
    luo.center('W7N33');
    luo.center('W9N32');
    pow.fun('Knight');
    if (Game.time % 100 == 30) {
        luo.fun();
    }
    if (Game.time % 400 == 30) {
        if(Game.spawns['Spawn4']==undefined){
        }else{
            Game.spawns['Spawn4'].memory.often['shar'].need=1;
        }
    }
    
    obb.ob(Game.getObjectById('5e38190630e4a20d05a8e5e6'))
    //luo.clslocal();
    if(Memory.stat==undefined){
        Memory.stat={'war':0}
    }
    if (Memory.stat.war == 1) {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'heal') {
                if(creep.memory.stat=='selfheal'){
                    creep.moveTo(Game.flags['heal']);
                    creep.heal(creep);
                }else if(creep.memory.stat=='heal'){
                    const targets = creep.room.find(FIND_MY_CREEPS, {
                    filter: (c) => c.hits < c.hitsMax
                    });
                    if (targets) {
                        if (creep.heal(targets) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets);
                        }
                    }
                }else if(creep.memory.stat=='dis'){
                    const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                    if (target) {
                    if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        }
                    }
                }else if(creep.memory.stat=='boost'){
                    creep.moveTo(Game.flags['heal']);
                }
                //creep.claimController(Game.getObjectById('5bbcac5e9099fc012e63558f'));
                //creep.signController(creep.room.controller,"I'm Alien,I love the earth.");
                //reep.attack(Game.getObjectById('5e322729635fc850bfe0aff7'))


            } else if (creep.memory.role == 'wor') {
                creep.moveTo(Game.flags['atk']);
                const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES//, {
                   // filter: function (object) {
                    //    return object.structureType != STRUCTURE_STORAGE && object.structureType != STRUCTURE_TERMINAL;
                   // }
                //});
                );
                if (target) {
                    if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                        //creep.moveTo(target);
                        creep.moveTo(Game.flags['atk']);
                    }
                } else {
                    const targetc = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (targetc) {
                        if (creep.attack(targetc) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetc);
                        }
                    } else {
                        creep.moveTo(Game.flags['atk']);
                    }
                }
            } else if (creep.memory.role == 'clm') {
                creep.moveTo(Game.flags['clm']);
                creep.claimController(creep.room.controller);
            }
        }
    }
    Memory.brn=0;
    if(Memory.brn==undefined){
        Memory.brn=1;
    }
    if (Memory.brn == 0) {



        var spawnTotal = ['Spawn1', 'Spawn2', 'Spawn3', 'Spawn1-1', 'Spawn4'];
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                var jj = 0;
                ///////////////////////////////
                for (jj = 0; jj < spawnTotal.length; jj++) {
                    if(Game.spawns[spawnTotal[jj]]==undefined){
                        continue;
                    }
                    if (Game.spawns[spawnTotal[jj]].memory.often[name.slice(0, -8)] == undefined) {
                    } else {
                        if (Game.spawns[spawnTotal[jj]].memory.often[name.slice(0, -8)].need == undefined) {
                            Game.spawns[spawnTotal[jj]].memory.often[name.slice(0, -8)].need = 0;
                        }
                        var bntest1 = _.filter(Game.creeps, (creep) => creep.name.slice(0, -8) == name.slice(0, -8));
                        if (bntest1.length < Game.spawns[spawnTotal[jj]].memory.often[name.slice(0, -8)].amount) {
                            if(name.slice(0, -8)=='shar'){
                                
                            }else{
                                Game.spawns[spawnTotal[jj]].memory.often[name.slice(0, -8)].need = Game.spawns[spawnTotal[jj]].memory.often[name.slice(0, -8)].amount - bntest1.length;
                            }
                            
                        }
                    }
                }
                delete Memory.creeps[name];
            }
        }

        var jj = 0;
        for (jj = 0; jj < spawnTotal.length; jj++) {
            if(Game.spawns[spawnTotal[jj]]==undefined){
                continue;
            }
            if (Game.spawns[spawnTotal[jj]].memory.need.length > 0) {//紧急需要孵化序列
                var ned = Game.spawns[spawnTotal[jj]].memory.need[0];
                var stat = Game.spawns[spawnTotal[jj]].spawnCreep(ned.body, ned.name + Game.time, { memory: ned.memory });
                if (stat == 0) {
                    Game.spawns[spawnTotal[jj]].memory.need.shift();
                }
            } else {
                if (Game.spawns[spawnTotal[jj]].memory.often != undefined) {//常驻需要孵化序列
                    for (var item in Game.spawns[spawnTotal[jj]].memory.often) {
                        if (Game.spawns[spawnTotal[jj]].memory.often[item].need > 0) {
                            
                            var newName = item + Game.time;
                            var bodyTotal = new Array();

                            var i = 0;
                            for (i = 0; i < Game.spawns[spawnTotal[jj]].memory.often[item].bodyamount; i++) {
                                bodyTotal.push(...Game.spawns[spawnTotal[jj]].memory.often[item].body);
                            }//处理重复body部件
                            var stat = Game.spawns[spawnTotal[jj]].spawnCreep(bodyTotal, newName,
                                {
                                    memory: {
                                        role: Game.spawns[spawnTotal[jj]].memory.often[item].role,
                                        taskid: Game.spawns[spawnTotal[jj]].memory.often[item].taskid,
                                        tasking: false,
                                        taskrole: Game.spawns[spawnTotal[jj]].memory.often[item].taskrole,
                                        taskfrom: Game.spawns[spawnTotal[jj]].memory.often[item].taskfrom,
                                        taskto: Game.spawns[spawnTotal[jj]].memory.often[item].taskto,
                                        taskrestype: Game.spawns[spawnTotal[jj]].memory.often[item].taskrestype,
                                        task: new Array()
                                    }
                                });
                            if (stat == 0) {
                                Game.spawns[spawnTotal[jj]].memory.often[item].need--;
                            }
                        }
                    }
                }
            }
        }

    } else {
        /////////////////////////
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {

                delete Memory.creeps[name];
                //console.log("delete uninstintse creeps  " + name);
            }
        }
        ////////////////
        var j = 0;
        var jj = 0;
        var spawnTotal = ['Spawn1', 'Spawn2', 'Spawn3', 'Spawn1-1', 'Spawn4'];
        
        for (jj = 0; jj < spawnTotal.length; jj++) {
            if(Game.spawns[spawnTotal[jj]]==undefined){
                continue;
            }
            if(Game.spawns[spawnTotal[jj]].memory.need==undefined){
                continue;
            }
            if (Game.spawns[spawnTotal[jj]].memory.need.length > 0) {
                var ned = Game.spawns[spawnTotal[jj]].memory.need[0];
                //Game.spawns[Memory.type[j].spawn].memory.need.shift();
                var stat = Game.spawns[spawnTotal[jj]].spawnCreep(ned.body, ned.name + Game.time, { memory: ned.memory });
                //var stat=Game.spawns[spawnTotal[jj]].spawnCreep(ned.body, ned.name+Game.time,{memory:{role:ned.role,taskid:ned.taskid,tasking:false}});
                //console.log(stat);
                if (stat == 0) {
                    Game.spawns[spawnTotal[jj]].memory.need.shift();
                }
            } else {
                for (j = 0; j < Memory.type.length; j++) {
                    var bntest1 = _.filter(Game.creeps, (creep) => creep.memory.role == Memory.type[j].role && creep.memory.taskrole == Memory.type[j].taskrole && creep.memory.taskid == Memory.type[j].taskid);
                    //console.log(bntest1.length);
                    if (bntest1.length < Memory.type[j].amount && Memory.type[j].spawn == spawnTotal[jj]) {
                        var newName = Memory.type[j].name + Game.time;
                        var bodyTotal = new Array();
                        var i = 0;
                        for (i = 0; i < Memory.type[j].bodyamount; i++) {
                            bodyTotal.push(...Memory.type[j].body);
                        }

                        var stat = Game.spawns[Memory.type[j].spawn].spawnCreep(bodyTotal, newName,
                            {
                                memory: {
                                    role: Memory.type[j].role, taskid: Memory.type[j].taskid, tasking: false,
                                    taskrole: Memory.type[j].taskrole,
                                    taskfrom: Memory.type[j].taskfrom,
                                    taskto: Memory.type[j].taskto,
                                    taskrestype: Memory.type[j].taskrestype,
                                    task: new Array()
                                }
                            });
                        Game.rooms['W7N33'].visual.text(newName, 10, 20 + 0.1 * j, { color: '#ffffff', font: 0.2 });
                        break;
                    }

                }
            }
        }
    }
    ///////////////////////////////////////////////////////////////////建筑
    //Game.getObjectById('5e28f788101cfef7c4d60d94').produce(RESOURCE_ENERGY);

    link.fromto(['5e1c2f8dc25ca482a11984f7'], '5e1c3deb91e04f681646fff3');
    link.fromto(['5e1ece54101cfe12e8d1cae7'], '5e1ecead7b3e973f3304d98d');
    link.fromto(['5e252c882c9761450696bc53'], '5e2532e83e6bf279c9076a84');
    
    link.fromto(['5e3afd808c0dfc99168f94ff'], '5e3b0656c41b42c7c32c2d8a');
    ///  2 3 
    ///    1 4
    ///  0   5
    ///  

    var lab2 = ['5e3595e410da2851f5eb1c0b', '5e35fd65025d5c04963b1a26', '5e3534cf0f27bd6405b4406b'];
    /////Game.getObjectById(lab2[2]).runReaction(Game.getObjectById(lab2[0]), Game.getObjectById(lab2[1]));

    //Game.getObjectById('5e20b2bbe9b1857fa0c88872').runReaction(Game.getObjectById('5e20c28829303d1dfd4b3411'),Game.getObjectById('5e20d1e46e043f519998f474'));

    /*
    
    //const linkFrom2 = Game.rooms['W17S21'].lookForAt('structure', 39, 9)[0];
    //linkFrom2.transferEnergy(linkTo);
    */
    ///////////////////---------------------建筑---------------------------/////////////////////////////////////
    for (var name in Game.structures) {
        var stru = Game.structures[name];
        if (stru.structureType == STRUCTURE_TOWER) {
            toee.trepair(stru);
        } else if (stru.structureType == STRUCTURE_LAB) {
            if (stru.mineralType != undefined) {
                stru.room.visual.text(stru.mineralType, stru.pos.x, stru.pos.y, { color: '#000000', font: 0.3 });
            }
            if (Memory.stru[stru.id] != undefined) {
                if (Memory.stru[stru.id].boost == true) {
                    stru.boostCreep(stru.pos.findInRange(FIND_MY_CREEPS, 1,{
                    filter: function(object) {
                    return object.memory.role == 'repairer';
                    }
                    })[0]);
                } else {

                }
                if (Memory.stru[stru.id].left != undefined) {
                    stru.runReaction(Game.getObjectById(Memory.stru[stru.id].left), Game.getObjectById(Memory.stru[stru.id].right));
                }
            }

        } else if (stru.structureType == STRUCTURE_POWER_SPAWN) {
            stru.processPower();
        } else if (stru.structureType == STRUCTURE_FACTORY) {
            if(Memory.stru[stru.id]!=undefined){
                stru.produce(Memory.stru[stru.id].pro);
            }
        }else if (stru.structureType == STRUCTURE_LINK) {
            if(Memory.stru[stru.id]!=undefined){
                link.fromto([stru.id], Memory.stru[stru.id].to);
            }
        }
        //else if(stru.structureType==STRUCTURE_SPAWN){
        //if(stru.hits<stru.hitsMax){
        //   stru.room.controller.activateSafeMode();
        //}
        //}
    }
    
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive < 50) {
            if (creep.store.getUsedCapacity() == 0) {
                // terminal is empty
                creep.suicide();
            }
        }
        if (creep.memory.role == 'builder') {////////////////////////////////////////////////////////////////////////////====builder
            creep.moveTo(Game.flags['to2']);
            /*
                if(creep.memory.taskid==0){
                    var ta=Game.rooms['W7N33'].find(FIND_STRUCTURES, {
                    filter: (c) => c.structureType == 'storage' && c.store[RESOURCE_ENERGY] > 0
                });
                if(ta.length>0){
                    if(buds.fun(creep,ta[0].id)==-5){
                        creep.moveTo(Game.flags['to2']);
                        
                    };
                }else{
                    
                }
                    
                }
                */
        } else if (creep.memory.role == 'upgrader') {////////////////////////////////////////////////////////////////////////////====upgrader
            if (creep.memory.taskid == 0) {
                upds.fun(creep, '5e1c3deb91e04f681646fff3', '5bbcac7c9099fc012e635893');
            } else if (creep.memory.taskid == 1) {
                if (upds.fun(creep, 'storage', '5bbcac889099fc012e635a4f') == -5) {
                    creep.moveTo(Game.flags['to3']);
                    creep.withdraw(Game.getObjectById('5e19fdb5ea8896486b87d6cf'), RESOURCE_ENERGY);
                }
            } else if (creep.memory.taskid == 2) {
                upds.fun(creep, '5e20669e4bbaeae8418612df', '5bbcac5e9099fc012e63558b');
            } else if (creep.memory.taskid == 3) {
                upds.fun(creep, '5e36a9798172c65d2e350aea', '5bbcac5e9099fc012e63558f');
            }
        } else if (creep.memory.role == 'worker') {////////////////////////////////////////////////////////////////////////////====worker
            wor2.fun(creep, Memory.mine[creep.memory.taskid].from, Memory.mine[creep.memory.taskid].to, Memory.mine[creep.memory.taskid].rest, Memory.mine[creep.memory.taskid].type);
        } else if (creep.memory.role == 'workerout') {////////////////////////////////////////////////////////////////////////////====worker
            if (creep.memory.taskid == 0) {
                wor2.funout(creep, '5bbcac7c9099fc012e635891', 24, 29, 'W7N34', '5e1c3deb91e04f681646fff3', 26, 18, 'W7N33', false);
                //creep.moveTo(Game.flags['dis']);
                //creep.dismantle(Game.getObjectById('5e19ef86e15215ad9710af2f'))
            } else if (creep.memory.taskid == 1) {
                wor2.funout(creep, '5bbcac5e9099fc012e63558c', 3, 28, 'W9N32', '5e20669e4bbaeae8418612df', 10, 26, 'W9N32', true);
                //creep.moveTo(Game.flags['dis']);
                //creep.dismantle(Game.getObjectById('5e19ef86e15215ad9710af2f'))
            }
        } else if (creep.memory.role == 'carrier') {///////////////////////////////////////////////////////////////////////////====carrier

            if (creep.memory.taskid == 0) {
                //任务0
                carr.task(creep, ['storage', 'extension', 'spawn', 'tower']);

            } else if (creep.memory.taskid == 1) {
                carr.task(creep, ['storage', 'extension', 'spawn', 'tower']);
            } else if (creep.memory.taskid == 2) {
                car.task(creep, ['5e1b0c8bca55d77f9772a5b0', '5e19fdb5ea8896486b87d6cf']);
            } else if (creep.memory.taskid == 3) {
                car.task(creep, ['5e28f788101cfef7c4d60d94', '5e20a1d411c660bd9a6e71ab', '5e19fdb5ea8896486b87d6cf', '5e1c2f8dc25ca482a11984f7'], RESOURCE_ENERGY);
                //car.task(creep,['5e20a1d411c660bd9a6e71ab','5e28f788101cfef7c4d60d94'],RESOURCE_BATTERY);
            } else if (creep.memory.taskid == 4) {
                carr.task(creep, ['storage', 'extension', 'spawn', 'tower']);
            } else if (creep.memory.taskid == 5) {
                //car.task(creep,['5e1ecead7b3e973f3304d98d','5e1b0c8bca55d77f9772a5b0']);//右房搬运
                car.task(creep, ['5e1ecead7b3e973f3304d98d', '5e1b0c8bca55d77f9772a5b0']);//右房搬运
            } else if (creep.memory.taskid == 6) {
                car.task(creep, ['5e2532e83e6bf279c9076a84', '5e3534cf0f27bd6405b4406b']);
                //car.task(creep,['5e20669e4bbaeae8418612df','5e2820e946f9f51ad774e2a6'],'L');

            } else if (creep.memory.taskid == 7) {
                if (creep.store['H'] == 0) {
                    if (creep.withdraw(Game.getObjectById('5d619fc7734d2c211a9bddbd'), 'H') == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.flags['lca']);
                    } else {
                        creep.moveTo(Game.flags['lca']);
                    }
                } else {
                    if (creep.transfer(Game.getObjectById('5e23f8e546f9f5778773230d'), 'H') == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById('5e23f8e546f9f5778773230d'));
                    }
                }
            } else if (creep.memory.taskid == 8) {
                carr.task(creep, ['storage', 'extension', 'spawn', 'tower']);
            }
        } else if (creep.memory.role == 'repairer') {
            if (creep.memory.taskid == 0) {
                rep.fun(creep, 'storage', Memory.stat.wellhit);
            } else if (creep.memory.taskid == 1) {
                rep.fun(creep, '5e20669e4bbaeae8418612df');
            } else if (creep.memory.taskid == 2) {
                rep.fun(creep, '5e2820e946f9f51ad774e2a6');
            }
            else if (creep.memory.taskid == 3) {
                rep.fun(creep, '5e36a9798172c65d2e350aea');
            }
        } else if (creep.memory.role == 'tasker') {
            tas.loadtask(creep);
            tas.runtask(creep);
        }else if(Game.shard.name=='shard2'){
            creep.memory.role = 'tasker';
            creep.memory.taskrole = 'build';
        }
    }
    //Memory.grafana.cpu = Game.cpu.getUsed();
}