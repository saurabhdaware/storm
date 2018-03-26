import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../home/home.component'
import {MainService} from '../services/main.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  launchTime:String;
  rocketMass:number;
  payloadMass:number;
  surfaceArea:number;

  straponsThrust:number;
  straponsBurntime:number;
  straponsMass:number;

  firststageThrust:number;
  firststageBurntime:number;
  firststageMass:number;

  secondstageThrust:number;
  secondstageBurntime:number;
  secondstageMass:number;

  thirdstageThrust:number;
  thirdstageBurntime:number;
  thirdstageMass:number;

  accelaration1:number;
  accelaration2:number;
  accelaration3:number;


  pressure:number;
  orbitHeight:number;
  temperature:number;
  weather:String;
  weatherIcon:String;

  constructor(private MainService:MainService) { 
    
  }

  ngOnInit() {
    this.launchTime = "09:00";
    this.rocketMass = 414750;
    this.payloadMass = 0;
    this.surfaceArea = 1;
    this.orbitHeight = 200000;

    this.straponsThrust = 3040;
    this.straponsBurntime = 160;
    this.straponsMass = 42700*4;

    this.firststageThrust = 4700;
    this.firststageBurntime = 100;
    this.firststageMass = 138200;

    this.secondstageThrust = 800;
    this.secondstageBurntime = 150;
    this.secondstageMass = 39500;

    this.thirdstageThrust = 75;
    this.thirdstageBurntime = 720;
    this.thirdstageMass = 12800;

    this.MainService.getWeather().subscribe(data=>{
      this.pressure = data.main.pressure;
      this.temperature = data.main.temp;
      this.weather = data.weather[0].main;
      this.weatherIcon = data.weather[0].icon;
    })

    let massInitial = this.rocketMass+this.payloadMass
    let massAfterStage1Separation = this.rocketMass+this.payloadMass - (this.firststageMass+this.straponsMass);
    let massAfterStage2Separation = this.rocketMass+this.payloadMass - (this.firststageMass + this.secondstageMass + this.straponsMass)



  }

  // firstStageAccelaration(){
  //   let accelaration1
  // }
  
  rocketSelectionScreen(status){
    var screen = document.getElementById('rocket-select-screen');
    screen.style.display = status
  }

  prepareLaunchClicked(){
    // Validations of data will come over here
    window.location.href=`launch/${this.rocketMass+this.payloadMass}/${this.pressure}/${this.temperature}/${this.weather}/${this.weatherIcon}/${this.surfaceArea}/${this.orbitHeight}/${this.straponsThrust}/${this.straponsBurntime}/${this.straponsMass}/${this.firststageThrust}/${this.firststageBurntime}/${this.firststageMass}/${this.secondstageThrust}/${this.secondstageBurntime}/${this.secondstageMass}/${this.thirdstageThrust}/${this.thirdstageBurntime}/${this.thirdstageMass}`;
  }

}
