import { Injectable } from '@angular/core';
import {LaunchComponent} from '../launch/launch.component';
@Injectable()
export class LaunchService{
  constructor(){
  }
  freefallS1 = 0;
  freefallS2 = 0;
  freefallS3 = 0;
  freefallS4 = 0;


  counter(counterVars){
      if(counterVars.negativeCountDone == false)
      {
        counterVars.sign = '-';
        counterVars.sec-=1;
      }
      if(counterVars.negativeCountDone == true)
      {
        counterVars.sign = '+';
        counterVars.sec+=1;
      }
      if(counterVars.sec == 0)
      {
        counterVars.negativeCountDone = true 
      }
      if(counterVars.sec == 60){
        counterVars.sec = 0;
        counterVars.min+=1;
        if(counterVars.min == 60){
          counterVars.min = 0;
          counterVars.hr+=1;
        }
      }
  }


  public Launch(rocketParams,rocketComponents){
    //Altitude Calculation
    let velocity = Math.sqrt((rocketParams.velocityH*rocketParams.velocityH)+(rocketParams.velocityV*rocketParams.velocityV));
    rocketParams.altitude = Math.trunc(rocketParams.travelV/10);
    rocketParams.velocityInMS = Math.trunc(velocity*10);
    rocketParams.velocityV = rocketParams.velocityV + rocketParams.accelarationV;
    rocketParams.velocityH = rocketParams.velocityH + rocketParams.accelarationH;
    if(rocketParams.inclination < 90){
      rocketParams.travelV = rocketParams.travelV + rocketParams.velocityV;
      rocketComponents.wholeBackground.style.bottom = 0 - (rocketParams.travelV)+'px';//
    }
    rocketParams.travelH = rocketParams.travelH + rocketParams.velocityH;
    rocketComponents.wholeBackground.style.left = 0 - (rocketParams.travelH) + 'px';
  }

  public stage1Separation(rocketParams,counterVars){
    this.freefallS1 = this.freefallS1 + 3;
    document.getElementById("fireL").style.display = 'none';
    document.getElementById("fireR").style.display = 'none';
    document.getElementById("fireC").style.bottom = '300px';
    document.getElementById('launch-rocket-image-stage1').style.bottom =50-this.freefallS1+'px';
    document.getElementById('launch-rocket-image-stage1').style.transform ='rotate('+this.freefallS1/10+'deg)';    
  }

  public stage2Separation(rocketParams,rocketComponents){
    rocketComponents.fireC.style.bottom = '380px';
    this.freefallS2 = this.freefallS2 + 2;
    document.getElementById('launch-rocket-image-stage2').style.bottom =199-this.freefallS2+'px';
    document.getElementById('launch-rocket-image-stage2').style.transform ='rotate('+this.freefallS2/10+'deg)';      
  }

  public stage3Separation(rocketParams,rocketComponents){
    rocketComponents.fireC.style.display = 'none';
    this.freefallS3 = this.freefallS3 + 1;
    document.getElementById('launch-rocket-image-stage3').style.bottom =278-this.freefallS3+'px';
    document.getElementById('launch-rocket-image-stage3').style.transform ='rotate('+this.freefallS3/10+'deg)';      
  }

  public stage4Separation(rocketParams,rocketComponents){
    this.freefallS4 = this.freefallS4 + 3;
    document.getElementById('launch-rocket-image-stage4').style.bottom =321-this.freefallS4+'px';
    document.getElementById('launch-rocket-image-stage4R').style.left =48+this.freefallS4+'px';
    document.getElementById('launch-rocket-image-stage4L').style.left =58-this.freefallS4+'px';
    document.getElementById('launch-rocket-image-stage4R').style.transform ='rotate('+this.freefallS4/10+'deg)';      
    document.getElementById('launch-rocket-image-stage4L').style.transform ='rotate('+ -this.freefallS4/10+'deg)';      
  }

  public rocketInclination(rocketParams){
    rocketParams.inclination = rocketParams.inclination + 0.004;
    document.getElementById('rocketAndSmokeFire').style.transform = 'rotate('+rocketParams.inclination+'deg)';    
  }

  public calculateAccelarationH(thrust,mass,rocketParams,pressure,temperature){
    let density = pressure*100/(temperature*287.05);
    let force = ((thrust*1000)*Math.sin(rocketParams.inclination*Math.PI/180));
    let accelaration = force/mass;
    return accelaration/1000;
  }


  public calculateAccelarationV(thrust,mass,rocketParams,pressure,temperature){
    let density = pressure*100/(temperature*287.05);
    let drag =  0.2*density*rocketParams.velocityV*rocketParams.velocityV*rocketParams.surfaceArea*0.5/100;
    let force = ((thrust*1000 - drag)*Math.cos(rocketParams.inclination*Math.PI/180)-mass*9.80566 + mass*rocketParams.velocityH*rocketParams.velocityH/(rocketParams.altitude+6371000));
    let accelaration = force/mass;
    return accelaration/1000;
  }

}
