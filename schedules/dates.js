var UNCdates = {
    year: 2022,
    semester: "Fall",
    days: "T-TH",
    time: '10:00am-11:30am',
    officeHours:"Tuesday from 4pm to 5pm",
    feriados:['Fri Aug 19', 'Mon Sep 5', 'Wed Oct 12',
             'Tues Sept 6', 'Mon Sept 26', 'Thur Oct 20' ,
            'Fri Oct 21', 'Wed Nov 23', 'Thur Nov 24', 'Fri Nov 25'],
    firstMonday: 'Mon Aug 15 2022',
    firstDayOfClass: 'Tue Aug 16 2022',
    classesEnd: 'Wed Nov 30 2022',
    conflict:0,
    alert: 'on',
    hw:{
        'hw1':9,
        'hw2':7,
        'hw3':7,
        'hw4':7,
        'hw5':7,
        'hw6pt1':7,
        'hw6pt2':2,
        'hw7': 10,
        'hw8':16,
        'hw9':7,
        'hw10':12,
        },
        topics:{
            day1:'Introduction to class',
            day2:'Introduction to data types',  
            day3:'How we model the world',
            day4:'Sharing our maps pt1 / Github',
            day5:'Sharing our maps pt2 / GPS',
            day6:'Projections',
            day7:'Projections and Georeferencing',
            day8:'Exercise: georeference UNC maps and create tiles',
            day9:'Webmaps',
            day10: 'Test 1',
            day11: 'Tables',
            day12: 'Choropoleths',// check date
            day13: 'Classification Schemes and Ratios',
            day14: 'Apply classification and ratios to your data',
            day15: 'Cartography',
            day16: 'Share your maps / RECAP',
            day17: 'Test 2',
            day18: 'Vector Spatial Analysis',
            day19: 'Vector Spatial Analysis Practical',
            day20: 'Introduction to Rasters and to GEE',
            day21: 'Share your maps / Answer GEE questions',
            day22: 'Intro to remote sensing',
            day23: 'Raster Spatial Analysis',
            day24: 'Test 3',
            day25: 'Remote Sensing Presentation',
            day26: 'Remote Sensing Presentation',
            day27: 'Topography and elevation models',
            day28: 'Discuss Test 3 / RECAP',
            // day29: 'RECAP',
            FinalExam: 'FINAL EXAM'
        },
    addDatesToHTML(){
        this.sumDates();
        this.writeDates()
    },
    sumDates(){
            var t = new Date(this.firstMonday)
            Object.keys(this.hw).forEach((e,i)=>{
                    t.setDate(t.getDate()+ this.hw[e])
                // console.log(t.toDateString())
                this.hw[e] = t.toDateString()
                this.verifyDates(t,e)
                })
    } ,  
    writeDates(){
        var tagDates = document.getElementsByClassName('date')
        for (var i=0; i<tagDates.length; i++){
        tagDates[i].innerHTML = this.hw[tagDates[i].innerHTML]  + ' at 11:55 pm'
    }
    },
    verifyDates(hwDate, daHW){
        if (hwDate > new Date(this.classesEnd)) {alert(daHW + " is after the last day")}
        this.feriados.forEach((e)=>
            
        {   
            feriado = new Date(e + ' ' + this.year);       
            if (feriado.toDateString() == hwDate.toDateString()) {
                if (this.alert == 'on'){alert(daHW + " has a conflict on " + feriado.toDateString())}
                return this.conflict = 1;
                }     
                
            })
        },

    fromTuesdayToThursday(daDate) {
        if (daDate.getDay() == 2){
        daDate.setDate(daDate.getDate()+ 2)}
        else {
        daDate.setDate(daDate.getDate()+ 5)}
    },
    makeTable(daTopic, daDateString)
        { 
        // daTable = document.getElementById(tableID)
        // console.log(daTable)    
        const tr = document.createElement('tr');
        const thDay = document.createElement('th');
        const thActivity = document.createElement('th');
        thDay.innerHTML = daDateString
        tr.appendChild(thDay)
        thActivity.innerHTML = daTopic;
        daObj[daDateString] = daTopic;
        tr.appendChild(thActivity);
        daTable.appendChild(tr)},

    makeSchedule(tableID){
        daObj = { }
        daTable = document.getElementById(tableID)
        var daDate = new Date(this.firstDayOfClass)
        Object.keys(this.topics).forEach((e,i)=>{
        if(e == 'FinalExam'){
            this.makeTable("Final Exam", 'Check official calendar')
            return}
        // console.log(i)
        if(i>0){this.fromTuesdayToThursday(daDate)}
        this.verifyDates(daDate,e)
        while (this.conflict == 1){ 
            // console.log('conflict')
            this.conflict = 0;
            var daTopic = 'No Classes'
            this.makeTable(daTopic, daDate.toDateString())
            this.fromTuesdayToThursday(daDate)
            this.verifyDates(daDate,e)
        }
        if (this.conflict == 0){
            this.makeTable(this.topics[e], daDate.toDateString())
        }
        
    })},
    assignScheduleDate(schedule) { // requires a JSON with the schedule verified. 
        var sch = document.getElementsByClassName('schedule')
        for (var i=0;i<sch.length;i++){
            // var e = sch[i].innerHTML.split('{').filter(e => e.includes('}'))[0].split('}')[0]
            var words = sch[i].innerHTML.split('{')
            console.log(words.toString())
            for (var j=0; j < words.length; j++)
            {
                if (words[j].match('}') != null){
                    
                    var daKey = words[j].split('}')[0]
                    Object.keys(schedule).forEach((e)=>{
                        if (schedule[e]==daKey) { 
                            var words2 = words[j].split('}')
                            words2[0] = e
                            words[j] = words2.join(' ')
                            sch[i].innerHTML = words.join(' ')
                        }

                    })
                }
            }
        }
}
}

// UNCdates.sumDates()
// UNCdates.writeDates()

