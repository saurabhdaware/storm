import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';
import {LaunchComponent } from './launch/launch.component';

const routes:Routes = [
  { path: 'main', component: MainComponent },
  { path:'', component:HomeComponent},
  {path:'launch/:rocketAndPayloadMass/:pressure/:temperature/:weather/:weatherIco/:surfaceArea/:orbitHeight/:straponsThrust/:straponsBurntime/:straponsMass/:firststageThrust/:firststageBurntime/:firststageMass/:secondstageThrust/:secondstageBurntime/:secondstageMass/:thirdstageThrust/:thirdstageBurntime/:thirdstageMass',component:LaunchComponent}
  
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes) 
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule {
 }
