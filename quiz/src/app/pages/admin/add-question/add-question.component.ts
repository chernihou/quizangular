import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions=
    {
    quiz:{
      qid:''
    },
      answer:'',
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:''
  };
  constructor(private _router:ActivatedRoute, private _question:QuestionsService) { }

  ngOnInit(): void {
    this.qId=this._router.snapshot.params['qid']
    this.qTitle=this._router.snapshot.params['title']
    this.questions.quiz['qid'] = this.qId;
  }

  forSubmit(){
    if(this.questions.content.trim() =='' || this.questions.content == null){

      return;
      
    } 
    if(this.questions.option1.trim() =='' || this.questions.option1 == null){

      return;
      
    } 
    if(this.questions.option2.trim() =='' || this.questions.option2 == null){

      return;
      
    } 
    if(this.questions.option3.trim() =='' || this.questions.option3 == null){

      return;
      
    } 
    if(this.questions.option4.trim() =='' || this.questions.option4 == null){

      return;
      
    } 
     //call server
     this._question.addQuestion(this.questions).subscribe(
      (data: any) => {
        Swal.fire('Success','Question is added','success')
    },
    (error) => {
      console.log(error);
      Swal.fire('Error !!','Error while adding question','error');
      console.log(error);}
      );
    
  }

}
