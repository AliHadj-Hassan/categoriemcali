/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { Categorie } from './schemas/Categorie.schema';
 

@Controller()
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}
  
 //@Post('add')
  @MessagePattern('add')
  async Add(@Payload() categorie:CreateCategorieDto){
    
categorie.code=categorie.title.toUpperCase();

if (categorie.Parent==null || categorie.Parent==undefined)
   {categorie.absolutePath="/"+categorie.code;}
else
 {  
  
  /* this.http.get('http://localhost:3000/categorie/get/'+categorie.Parent)
  .toPromise()
  .then(res => {res.data; 
    console.log(res.data["absolutePath"]+"/"+categorie.code);
    categorie.absolutePath=res.data["absolutePath"]+"/"+categorie.code;
    this.categorieService.create(categorie);
  })
  .catch(err => console.log(err))*/
  
 const cat=await this.findOne(categorie.Parent);
 categorie.absolutePath=cat["absolutePath"]+"/"+categorie.code;
}


      return await this.categorieService.create(categorie);
     
  }

  @MessagePattern('all')
  async findAll() {

    const lista=await this.categorieService.findAll();

    return  lista;
     
  }


  
  @MessagePattern('getbyId')
   findOne( id):Promise<Categorie> {
    return   this.categorieService.findOne(id);
  }
  

  @MessagePattern('childrens')
  async getChilds(id) {
    return await this.categorieService.getAllChilds(id);
     
  }


/*
  @Patch(':id')
  update(@Param('id') id: string, @Body()  ) {
    return this.categorieService.update( );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieService.remove(+id);
  }*/
}
