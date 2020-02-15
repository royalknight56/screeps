/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('task.comm');
 * mod.thing == 'a thing'; // true
 */
//Object.defineProperty(global, 'test', { get: () => { console.log('执行命令'),console.log('执行命令2') } } );
global.listBoard=function(role){
    var i = 0;
    var len = Memory.board[role].length;
    for (i = 0; i < len; i++) {
        console.log('<a style="color:#fff000">'+Memory.board[role][i].type+'</a>-----'
        +
        '<a style="color:#7FFFD4">'+Memory.board[role][i].restype+'</a>-----'
        +Memory.board[role][i].to);
    }
}

global.clearBoard=function(role){
        Memory.board[role]=new Array();
    },
global.clearAllLab=function(){
        clearBoard('tester');
        var lab=['5e20d1e46e043f519998f474','5e20c28829303d1dfd4b3411','5e293150e5d008083fea3078','5e2976dd69b91bf8b5342b10','5e2955f527eb82e859794648',
        '5e38151eddebf0852bf034cd','5e380a2751cc184221bee382','5e37ff2283e0218ad031467d','5e37f7e5d632bc7dfe85b05e','5e37f7e5d632bc7dfe85b05e','5e20b2bbe9b1857fa0c88872'];
        Memory.board['tester'].push({type:'withdraw',to:lab[0],restype:Game.getObjectById(lab[0]).mineralType});
        Memory.board['tester'].push({type:'withdraw',to:lab[1],restype:Game.getObjectById(lab[1]).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(lab[0]).mineralType});
        Memory.board['tester'].push({type:'withdraw',to:lab[2],restype:Game.getObjectById(lab[2]).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(lab[2]).mineralType});
        Memory.board['tester'].push({type:'withdraw',to:lab[3],restype:Game.getObjectById(lab[3]).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(lab[3]).mineralType});
        Memory.board['tester'].push({type:'withdraw',to:lab[4],restype:Game.getObjectById(lab[4]).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(lab[4]).mineralType});
        Memory.board['tester'].push({type:'withdraw',to:lab[5],restype:Game.getObjectById(lab[5]).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(lab[5]).mineralType});
        Memory.board['tester'].push({type:'withdraw',to:lab[6],restype:Game.getObjectById(lab[6]).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(lab[6]).mineralType});
        Memory.board['tester'].push({type:'withdraw',to:lab[7],restype:Game.getObjectById(lab[7]).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(lab[7]).mineralType});
        Memory.board['tester'].push({type:'withdraw',to:lab[8],restype:Game.getObjectById(lab[8]).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(lab[8]).mineralType});
        Memory.board['tester'].push({type:'withdraw',to:lab[9],restype:Game.getObjectById(lab[9]).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(lab[9]).mineralType});
    },
global.clearLab=function(id){
        clearBoard('tester');
        Memory.board['tester'].push({type:'withdraw',to:id,restype:Game.getObjectById(id).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(id).mineralType});
    },
global.pushBoardFromTo=function(role,from,to,restype){
        Memory.board[role].push({type:'withdraw',to:from,restype:restype});
        Memory.board[role].push({type:'transfer',to:to,restype:restype});
        Memory.board[role].push({type:'transfer',to:from,restype:restype});
    },
global.pushBoard=function(role,typel,tol,restypel){
        Memory.board[role].push({type:typel,to:tol,restype:restypel});
    },
global.popBoard=function(role){
        Memory.board[role].pop();
    },
global.deal=function(orderid,amount,dis){
    var roomss=["W7N33",'W6N33','W9N32'];
    Game.market.deal(orderid, amount, roomss[dis]);
}
global.suan=function(orderid,dis=0){
    var roomss=["W7N33",'W6N33','W9N32'];
    var ro=Game.market.getOrderById(orderid).roomName;
    var amount=Game.market.getOrderById(orderid).amount;
    var cost = Game.market.calcTransactionCost(amount, ro, roomss[dis]);
    var tocost=amount+cost;
    console.log('路费'+cost+'-Tota-'+tocost);
    //Game.market.deal(orderid, amount, roomss[dis]);
}
global.listTerminal=function(){
    var div="<div>";
    for(var room in Game.rooms){
        if(Game.rooms[room].terminal!=undefined){
            //console.log(room+'--Terminal');
            div+="<div><a style='color:#ff5a40'>"+room+'--Terminal'+"</a>";
            
            var ter=Game.rooms[room].terminal;
            var lap=3;
            var total=0;
            for(var re in ter.store){
                var s="<img src='https://s3.amazonaws.com/static.screeps.com/upload/mineral-icons/"+re+".png'>"
                if(lap>0){
                    div+=s;
                    div+="&nbsp;";
                    div+=ter.store[re];
                    total+=ter.store[re];
                    div+="&nbsp;&nbsp;&nbsp;";
                    lap--;
                }else{
                    div+=s;
                    div+="&nbsp;&nbsp;";
                    div+=ter.store[re];
                    total+=ter.store[re];
                    div+="&nbsp;&nbsp;&nbsp;";
                    div+="<br>";
                    lap=3;
                }
                //console.log(s+ter.store[re]);
            }
            div+='<a style="color:#fff000">Total--'+total+"</a>";
            total=0;
            div+="</div>"
            //https://s3.amazonaws.com/static.screeps.com/upload/mineral-icons/LHO2.png
        }
    }
    div+="</div>"
    console.log(div);
}
global.send=function(from,to,type,amount){
    var roomss=["W7N33",'W6N33','W9N32','W9N31'];
    var cons;
    if(to>=0&&to<=roomss.length){
        cons=Game.rooms[roomss[from]].terminal.send(type, amount, roomss[to]);
    }else{
        cons=Game.rooms[roomss[from]].terminal.send(type, amount,to);
    }
    return cons;
    
}
global.creepNum=function(role,id){
        var num=0;
        for(var name in Game.creeps){
            var creep=Game.creeps[name];
            if(creep.memory.role==role){
                if(creep.memory.taskid==id){
                    num++;
                }
            }
        }
        return num;
    },
global.spawnAttack=function(level){
    if(level==1){
        body1=[TOUGH,WORK,HEAL,MOVE]
    }else if(level==2){
        body1=[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]//10heal 5tough 5attack 10move 3550
        Game.spawns['Spawn1'].memory.need.push({name:'att',body:body1,memory:{role:'tasker',taskid:0,tasking:false}});
    }
    
    //Game.spawns['Spawn1'].memory.need.push({name:'att',body:[TOUGH,],memory:{role:'tasker',taskid:0,tasking:false}});
    //Game.spawns['Spawn1-1'].memory.need.push({name:'att',body:bodyl,memory:{role:'tasker',taskid:0,tasking:false}});
}
global.pushTask=function(creep,typel,tol,restypel){
    //var creep=Game.getObjectById(creep);
    if(creep){
        if(creep.memory.task==undefined){
        creep.memory.task=new Array();
        }
        creep.memory.task.push({type:typel,to:tol,restype:restypel});
    }
},
global.setTasker=function(creep,role,from,to,type){
    var creep=Game.getObjectById(creep);
    if(creep.memory.task==undefined){
        creep.memory.task=new Array();
    }
        creep.memory.taskrole=role;
        creep.memory.taskfrom=from;
        creep.memory.taskto=to;
        creep.memory.taskrestype=type;
    },
global.upGo=function(fieldData,index){
    console.log('控制中心已接收-上移');
    if(index!=0){
        fieldData[index] = fieldData.splice(index-1, 1, fieldData[index])[0];
    }else{
        fieldData.push(fieldData.shift());
    }
    
}
global.downGo=function(fieldData,index){
    console.log('控制中心已接收-下移');
    if(index!=fieldData.length-1){
        fieldData[index] = fieldData.splice(index+1, 1, fieldData[index])[0];
    }else{
        fieldData.unshift( fieldData.splice(index,1)[0]);
    }
}
global.listTask=function(){
    console.log('控制中心已接收');
    var i=0;
    for(i=0;i<Memory.mine.length;i++){
        console.log(JSON.stringify(Memory.mine[i]));
    }
    return '控制中心执行命令结束';
}
global.setMine=function(from,key,after){
    console.log('控制中心已接收-设置挖矿任务');
    if(after==undefined||key==undefined){
        var tar=_.findIndex(Memory.mine, function(o) { return o.from== from; });
        console.log(JSON.stringify(Memory.mine[tar]));
        return '控制中心执行命令结束'+'---未更改当前数值==';
        
        
    }
    var tar=_.findIndex(Memory.mine, function(o) { return o.from== from; });
    Memory.mine[tar][key]=after;
    return '控制中心执行命令结束'+'---当前数值=='+Memory.mine[tar][key];
}
global.listSpawn=function(){
    console.log('控制中心已接收');
    var i=0;
    for(i=0;i<Memory.type.length;i++){
        console.log(JSON.stringify(Memory.type[i]));
    }
    return '控制中心执行命令结束';
}
global.setSpawn=function(name,key,after){
    //console.log('控制中心已接收-设置孵化');
    if(after==undefined||key==undefined){
        var spawnTotal = ['Spawn1', 'Spawn2', 'Spawn3', 'Spawn1-1', 'Spawn4'];
        var i=0;
        var tar;
        for(i=0;i<spawnTotal.length;i++){
            if(Game.spawns[spawnTotal[i]].memory.often[name]==undefined){
                
            }else{
                tar=Game.spawns[spawnTotal[i]].memory.often[name];
            }
        }
        //var tar=_.findIndex(Memory.type, function(o) { return o.name== name; });
        console.log(JSON.stringify(tar));
        return '控制中心执行命令结束'+'---未更改当前数值==';
    }else{
        
        var spawnTotal = ['Spawn1', 'Spawn2', 'Spawn3', 'Spawn1-1', 'Spawn4'];
        var i=0;
        var tar;
        for(i=0;i<spawnTotal.length;i++){
            if(Game.spawns[spawnTotal[i]].memory.often[name]==undefined){
                
            }else{
                tar=Game.spawns[spawnTotal[i]].memory.often[name];
                break;
            }
        }
        //var tar=_.findIndex(Memory.type, function(o) { return o.name== name; });
        Game.spawns[spawnTotal[i]].memory.often[name][key]=after;
        if(key=='amount'){
            var bntest = _.filter(Game.creeps, (creep) => creep.name.slice(0, -8) ==name );
            
            Game.spawns[spawnTotal[i]].memory.often[name].need=after-bntest.length;
        }
        return Game.spawns[spawnTotal[i]].memory.often[name][key];
    }
}
global.addTasker=function(role,from,to,res){
    console.log('控制中心已接收-添加孵化任务');
    Game.spawns['Spawn1'].memory.need.push({name:'tasker',body:[CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],memory:{role:'tasker',taskid:0,tasking:false,task:[],taskrole:role,taskfrom:from,taskto:to,taskrestype:res}});
    //Game.spawns['Spawn1'].memory.need.push({role:'tasker',name:'tasker',body:[CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],taskid: 0});
    //Memory.type.push({role:rolel,name:namel,amount:amountl,body:bodyl,bodyamount:bodyamountl,taskid:taskidl,spawn:spawnl});
    return '控制中心执行命令结束'+'---当前数值=='+Memory.type[Memory.type.length-1];
}
global.addSpawnTask=function(rolel,bodyl,spawnl){
    var namel=rolel+'task';
    console.log('控制中心已接收-添加孵化任务');
    //{memory:{role:ned.role,taskid:ned.taskid,tasking:false}}
    Game.spawns[spawnl].memory.need.push({name:namel,body:bodyl,memory:{role:rolel,taskid:0,tasking:false}});
    //Memory.type.push({role:rolel,name:namel,amount:amountl,body:bodyl,bodyamount:bodyamountl,taskid:taskidl,spawn:spawnl});
    return '控制中心执行命令结束'+'---当前数值=='+Memory.type[Memory.type.length-1];
}
global.addSpawn=function(spawnl,rolel,namel,amountl,bodyl,bodyamountl,taskidl){
    console.log('控制中心已接收-添加孵化类型');
    Game.spawns[spawnl].memory.often[namel]={role:rolel,name:namel,amount:amountl,body:bodyl,bodyamount:bodyamountl,taskid:taskidl};
    //Memory.type.push({role:rolel,name:namel,amount:amountl,body:bodyl,bodyamount:bodyamountl,taskid:taskidl,spawn:spawnl});
    return '控制中心执行命令结束'+'---当前数值=='+Game.spawns[spawnl].memory.often[namel];
}
global.setSpawnAmount=function(str,amount){
    console.log('控制中心已接收-设置孵化数量');
    var i=0;
    for(i=0;i<Memory.type.length;i++){
        if(Memory.type[i].name==str){
            if(amount==undefined){
                return '控制中心执行命令结束'+'---未更改当前数值=='+Memory.type[i].amount;
            }
            Memory.type[i].amount=amount;
            break;
        }
    }
    return '控制中心执行命令结束'+'---当前数值=='+Memory.type[i].amount;
}
global.setSpawnBody=function(str,body){
    var i=0;
    console.log('控制中心已接收-设置孵化组件');
    for(i=0;i<Memory.type.length;i++){
        if(Memory.type[i].name==str){
            if(body==undefined){
                return '控制中心执行命令结束'+'---未更改当前数值=='+Memory.type[i].body;
            }
            Memory.type[i].body=body;
            break;
        }
    }
    return '控制中心执行命令结束'+'---当前数值=='+Memory.type[i].body;
}
global.setSpawnBodyAmount=function(str,amount){
    var i=0;
    console.log('控制中心已接收-设置孵化部件数量');
    for(i=0;i<Memory.type.length;i++){
        if(Memory.type[i].name==str){
            if(amount==undefined){
                return '控制中心执行命令结束'+'---未更改当前数值=='+Memory.type[i].bodyamount;
            }
            Memory.type[i].bodyamount=amount;
            break;
        }
    }
    return '控制中心执行命令结束'+'---当前数值=='+Memory.type[i].bodyamount;
}
Object.defineProperty(global, 'creepMax', { get: () => { 
    console.log('控制中心已接收-计算组件最大值')
    for(var name in Game.rooms){
        if(Game.rooms[name].controller==undefined){
            
        }else{
        var tar=Game.rooms[name].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        var spw=Game.rooms[name].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_SPAWN }
        });
        if(Game.rooms[name].controller.level==7){
            console.log(name+':---'+(tar.length*100+spw.length*300));
        }else if(Game.rooms[name].controller.level==8){
            console.log(name+':---'+(tar.length*200+spw.length*300));
        }else{
            console.log(name+':---'+(tar.length*50+spw.length*300));
        }
        }
        
    }
    return '控制中心执行命令结束'
} } );
Object.defineProperty(global, 'storage', { get: () => { 
    console.log('控制中心已接收-计算STORAGE存储')
    for(var name in Game.rooms){
        var tar=Game.rooms[name].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_STORAGE }
        });
        
        if(tar.length>0){
            var ke=new Array();
            ke=Object.keys(tar[0].store);
            console.log(name+':---');
            var i=0;
            for (i=0;i<ke.length;i++){
                console.log('|'+ke[i]+':---'+tar[0].store[ke[i]]);
            }
        }else{
            
        }
        
    }
    return '控制中心执行命令结束'
} } );

Object.defineProperty(global, 'terminal', { get: () => { 
    console.log('控制中心已接收')
    for(var name in Game.rooms){
        var tar=Game.rooms[name].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TERMINAL }
        });
        
        if(tar.length>0){
            var ke=new Array();
            ke=Object.keys(tar[0].store);
            console.log(name+':---');
            var i=0;
            for (i=0;i<ke.length;i++){
                console.log('|'+ke[i]+':---'+tar[0].store[ke[i]]);
            }
        }else{
            
        }
        
    }
    return '控制中心执行命令结束'
} } );
module.exports = {

};