module.exports = {
    group(tow){
        const targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length==0){

        }else{
            const cen = new RoomPosition(38, 38, 'W7N33');
            var tarlen=targets.length;
            var i=0;
            for(i=0;i<tarlen;i++){
                if(cen.getRangeTo(targets[i])<12){

                }else{
                    
                }
            }
            
            var len=tow.length;
        }


    }
};