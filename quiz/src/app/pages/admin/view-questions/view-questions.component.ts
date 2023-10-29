import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  qId:any;
  qTitle:any;
  questions=[
    {
      quesid:'',
      answer:'',
      content:'',
      image:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      

    }
  ];

  constructor(private _router:ActivatedRoute, private _questions:QuestionsService) { }

  ngOnInit(): void {
    this.qId=this._router.snapshot.params['quesid']
    this.qTitle=this._router.snapshot.params['title']
    this._questions.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      console.log(data)
      this.questions=data;
    },
    (error)=>{
      console.log(error)
    }
    )
    
    
  }
  //delete question
  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure you want to delete this question ?',
      confirmButtonText:'Delete',
      showCancelButton:true
  
  
  
    }).then((result)=>{
   if(result.isConfirmed){
    //delete
    this._questions.deleteQuestion(qid).subscribe(
      (data: any) => {
        this.questions=this.questions.filter((q)=> q.quesid !=qid)
        Swal.fire('Success','Question deleted succefully','success');},
      
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error in deleting question','error');}
        );
      
  }
    });
  
    }

}
