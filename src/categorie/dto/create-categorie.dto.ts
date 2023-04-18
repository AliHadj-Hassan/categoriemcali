/* eslint-disable prettier/prettier */
export interface CreateCategorieDto{
    title: string;
    code: string;
    absolutePath: string;
    Parent: CreateCategorieDto;
   // Childs: CreateCategorieDto[];
}