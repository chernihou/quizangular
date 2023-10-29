import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories=[
    {
      cid:'',
      title:''
    }
  ]

  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:'true',
    category:{
      cid:'',
    },

  };

  constructor(private _cat:CategoryService,
    private snack:MatSnackBar, private _quiz:QuizService) {}

  ngOnInit(): void {

  this._cat.categories().subscribe(
    (data: any) => {
     //categories load
  this.categories=data;
  //console.log(data);
    },
    (error) => {
      console.log(error);
      Swal.fire('Error !!','Error in loading data from server','error');}
      );
    }
    
    //add quiz
    formSubmit(){
      if(this.quiz.title.trim() =='' || this.quiz.title == null){
        this.snack.open('Title is required !!' ,'',{
          duration:2000,
          verticalPosition:'top',
        });
        return;
        
      }      

      //call server
      this._quiz.addQuiz(this.quiz).subscribe(
        (data: any) => {
          Swal.fire('Success','Quiz is added','success')
          this.quiz={
            title:'',
            description:'',
            maxMarks:'',
            numberOfQuestions:'',
            active:'true',
            category:{
              cid:'',

          }
        };
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error while adding quiz','error');
        console.log(error);}
        );
      

    }
}
