import { Component, OnInit } from '@angular/core';
import {LaunchService} from '../services/launch.service';
import { prototype } from 'events';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit {
  
  counterVars = {
    sign : '-',
    hr : 0,
    min : 0,
    sec : 0,
    totalMilliseconds:0,
    negativeCountDone:true
  }

  rocketParams = {
    altitude:0,
    inclination:0,
    freefall: 0,
    velocityH:0,
    velocityV:0,
    velocityInMS:0,
    accelarationH:0,
    accelarationV:0,
    travelH:0,
    travelV:0,
    surfaceArea:0,
    orbitHeight:0
  }//

  rocketPayloadMass:number;
  pressure:number;
  temperature:number;
  weather:String;
  weatherIco:String;

  strapons = {
    thrust:0,
    burntime:0,
    mass:0
  }

  firststage = {
    thrust:0,
    burntime:0,
    mass:0
  }

  secondstage = {
    thrust:0,
    burntime:0,
    mass:0
  }

  thirdstage = {
    thrust:0,
    burntime:0,
    mass:0
  }

  
  
  constructor(private LaunchService:LaunchService,private route:ActivatedRoute) { 
    this.counterVars.sign = '-';
    this.counterVars.hr = 0;
    this.counterVars.min = 0;
    this.counterVars.sec = 10;
    this.counterVars.totalMilliseconds = 0;
    this.counterVars.negativeCountDone = false;

    this.rocketParams.altitude = 0;    
    this.rocketParams.inclination = 0;
    this.rocketParams.velocityV = 0.4;
    this.rocketParams.velocityH = 0;
    this.rocketParams.velocityInMS = 0;
    this.rocketParams.travelV =0;
    this.rocketParams.travelH = 0;
    this.rocketParams.accelarationH = 0;
    this.rocketParams.accelarationV = 0;


    this.route.params.subscribe(params => {
      this.rocketPayloadMass = parseFloat(params['rocketAndPayloadMass']);
      this.pressure = parseFloat(params['pressure']);
      this.temperature = parseFloat(params['temperature']);
      this.weather = params['weather'];
      this.weatherIco = params['weatherIco'];
      this.rocketParams.surfaceArea = parseFloat(params['surfaceArea']);
      this.rocketParams.orbitHeight = parseFloat(params['orbitHeight']);

      this.strapons.thrust = parseFloat(params['straponsThrust']);
      this.strapons.burntime = parseFloat(params['straponsBurntime']);
      this.strapons.mass = parseFloat(params['straponsMass']);

      this.firststage.thrust = parseFloat(params['firststageThrust']);
      this.firststage.burntime = parseFloat(params['firststageBurntime']);
      this.firststage.mass = parseFloat(params['firststageMass']);//

      this.secondstage.thrust = parseFloat(params['secondstageThrust']);
      this.secondstage.burntime = parseFloat(params['secondstageBurntime']);
      this.secondstage.mass = parseFloat(params['secondstageMass']);

      this.thirdstage.thrust = parseFloat(params['thirdstageThrust']);
      this.thirdstage.burntime = parseFloat(params['thirdstageBurntime']);
      this.thirdstage.mass = parseFloat(params['thirdstageMass']);

      this.rocketParams.accelarationV = this.LaunchService.calculateAccelarationV((this.strapons.thrust+this.firststage.thrust),this.rocketPayloadMass,this.rocketParams,this.pressure,this.temperature);
    });
  }

  ngOnInit() {
    document.getElementById('launch-container').style.background = 'linear-gradient(to bottom,rgb(0,170,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255))';
  }



  launchClicked(){
    let iteration = 0;
    document.getElementById('loadscreen-info').style.display = 'none';

    var currentThrust = this.strapons.thrust + this.firststage.thrust;
    var mass = this.rocketPayloadMass;
    this.rocketParams.accelarationV = this.LaunchService.calculateAccelarationV(currentThrust,mass,this.rocketParams,this.pressure,this.temperature);

    let skyColor = {
      One : [0,170,255],
      Two : [255,255,255],
      Three : [255,255,255],
      Four : [255,255,255],
    }

    const rocketComponents = {
      fireL : document.getElementById('fireL'),
      fireR:document.getElementById('fireR'),
      fireC:document.getElementById('fireC'),
      earthSurface:document.getElementById('launch-center-image'),
      crow:document.getElementById('assets-crow'),
      smokeC:document.getElementById('smokeC'),
      smokeR:document.getElementById('smokeRight'),
      smokeL:document.getElementById('smokeLeft'),
      wholeBackground:document.getElementById('whole-bg')
    }

    setInterval(()=>{

      iteration++;
      document.getElementById('launch-container').style.background = `linear-gradient(to bottom,rgb(${skyColor.One[0]},${skyColor.One[1]},${skyColor.One[2]}),rgb(${skyColor.Two[0]},${skyColor.Two[1]},${skyColor.Two[2]}),rgb(${skyColor.Three[0]},${skyColor.Three[1]},${skyColor.Three[2]}),rgb(${skyColor.Four[0]},${skyColor.Four[1]},${skyColor.Four[2]})`;

      if(iteration%100==0){
        this.LaunchService.counter(this.counterVars);
        mass = mass-140;
        this.rocketParams.accelarationV = this.LaunchService.calculateAccelarationV(currentThrust,mass,this.rocketParams,this.pressure,this.temperature);
        this.rocketParams.accelarationH = this.LaunchService.calculateAccelarationH(currentThrust,mass,this.rocketParams,this.pressure,this.temperature);
      }
      if(iteration%500 == 0){

        skyColor.One[1]= 170 - Math.trunc(this.rocketParams.altitude/1000);
        skyColor.One[2] =255 - Math.trunc(this.rocketParams.altitude/1000);

        skyColor.Two[0] = 255 - Math.trunc(this.rocketParams.altitude/100);
        skyColor.Two[1] = 255 - Math.trunc(this.rocketParams.altitude/850);
        skyColor.Two[2] = 255 - Math.trunc(this.rocketParams.altitude/1000);


        skyColor.Three[0] = 255 - Math.trunc(this.rocketParams.altitude/150);
        skyColor.Three[1] =255 - Math.trunc(this.rocketParams.altitude/900);
        skyColor.Three[2] = 255 - Math.trunc(this.rocketParams.altitude/1500);


        skyColor.Four[0] =255 - Math.trunc(this.rocketParams.altitude/200);
        skyColor.Four[1] =255 - Math.trunc(this.rocketParams.altitude/1200);
        skyColor.Four[2] = 255 - Math.trunc(this.rocketParams.altitude/2000);
      }
      
      

      if(iteration==600){
        rocketComponents.smokeL.style.display = 'block';
        rocketComponents.smokeR.style.display ='block';
        rocketComponents.fireR.style.display = 'block';
        rocketComponents.fireL.style.display = 'block';
      }
      
      

      if(iteration == 1000){
        setTimeout(()=>{
          rocketComponents.smokeL.style.display = 'none';
          rocketComponents.smokeR.style.display = 'none';
          rocketComponents.smokeC.style.display = 'none';
        },1500)
        rocketComponents.fireC.style.display = 'block';
      }
      
      

      if(this.counterVars.sec>0 && this.counterVars.sign =='+'){
        this.LaunchService.Launch(this.rocketParams,rocketComponents);
      }
      
      

      if(this.rocketParams.altitude > 20000 && this.rocketParams.inclination<90){
        this.LaunchService.rocketInclination(this.rocketParams);
      }
      
      

      if(iteration == this.strapons.burntime*100){
        mass = this.rocketPayloadMass - (this.strapons.mass+this.firststage.mass);
        currentThrust = this.secondstage.thrust;
      }
      
      
      
      
      if(iteration > this.strapons.burntime*100){
        this.LaunchService.stage1Separation(this.rocketParams,this.counterVars);
      }
      
      
      

      if(iteration == (this.strapons.burntime+this.secondstage.burntime)*100){
        mass = this.rocketPayloadMass - (this.strapons.mass+this.firststage.mass+this.secondstage.mass+10);
        currentThrust = this.thirdstage.thrust;
      }
      
      
      
      if(iteration > (this.secondstage.burntime+this.strapons.burntime)*100){
        this.LaunchService.stage2Separation(this.rocketParams,rocketComponents);
      }
      
      
      
      
      if(iteration == (this.strapons.burntime+this.secondstage.burntime+this.thirdstage.burntime)*100){
        mass = this.rocketPayloadMass - (this.strapons.mass+this.firststage.mass+this.secondstage.mass+10);
        currentThrust = this.thirdstage.thrust;
        // this.rocketParams.velocityH = 0;
        // this.rocketParams.velocityV = 0;
        // this.rocketParams.altitude = 0;//
      }
      
      
      
      
      if(iteration > (this.thirdstage.burntime+this.secondstage.burntime+this.strapons.burntime)*100){
        this.LaunchService.stage3Separation(this.rocketParams,rocketComponents);
      }
      
      
      

      if(iteration > (this.strapons.burntime+60)*100){
        mass = this.rocketPayloadMass - (this.strapons.mass + this.firststage.mass)
        this.LaunchService.stage4Separation(this.rocketParams,rocketComponents);
      }

      

    },10)
    
    
    }

}
