import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fruit } from '../fruit';
import { FruitService } from '../fruit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  constructor(private fruitService: FruitService,
    private router: Router,
    private route: ActivatedRoute) { }


    formdata:Fruit={
      id:0, 
      name:'',
      quantity:0,
      price:0
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = Number(param.get('id'))
      this.getByid(id)
    })
  }
  getByid(id: number) {
    this.fruitService.edit(id).subscribe((data) => { 
      this.formdata = data;
      // console.log("edit data  : ", data);
    })


  }

  update(){
     this.fruitService.update(this.formdata).subscribe({
      next:(data)=>{
        this.router.navigate(["/fruit/home" ])
      },
      error : (er)=>{
        console.log(er)
      }
    })
  }


}
