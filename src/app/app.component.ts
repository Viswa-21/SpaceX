import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { SpacexService } from './spacex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'spaceX';
  launchYears : number[];
  filters= [
    {type:'launch_year', value:undefined},
    {type:'launch_success',value: undefined},
    {type:'land_success',value: undefined},
  ]
  details =[];

  constructor(private spacexService: SpacexService,private router:Router){}

  ngOnInit(){
    this.router.navigate(['']);
    this.launchYears = Array(15).fill(2006).map((_, index) => 2006 + index);
    this.fetchData(this.filters);
  }

 

  updateFilters(type, value) {
    let url='limit=100';
    this.filters.forEach((element) => {
      if(element.type === type){
        if(element.value === value){
          element.value = undefined;
        }else{
          element.value = value;
        }
      }
      if(element.value != undefined){
        url = url + '&'+ element.type + '=' +element.value;
      }
    });
   this.router.navigate([],{queryParams:{url},queryParamsHandling : 'merge'});
    this.fetchData(this.filters);
  }

  fetchData(filters) {
    const URL = this.spacexService.getUpdatedApiUrl(filters);
    this.spacexService.getData(URL).subscribe((response) => {
    this.details =  response.map(e =>{
        return { 
          flight_number : e.flight_number,
          mission_name :e.mission_name,
          mission_id : e.mission_id,
          launch_year :e.launch_year,
          launch_success:e.launch_success,
          imageSrc:e.links.mission_patch_small,
          land_success:e.rocket.first_stage.cores[0].land_success
        }
      }
        );
    })
  }

}
