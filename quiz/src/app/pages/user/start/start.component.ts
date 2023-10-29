import { LocationStrategy } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:any;
  timer:any;
  questions:any=[
    {
      quesid:'',
      answer:'',
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      quiz:{
        title:''
      }
      

    }
  ];

  marksGot =0;
  correctAnswers=0;
  attempted=0;

  isSubmit=false;

  constructor(private locationST:LocationStrategy, private _route:ActivatedRoute,private _question:QuestionsService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid']
    console.log(this.qid)
    this.loadQuestions();

  }


  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data)=>{
      this.questions=data;

      this.timer=this.questions.length*2*60;

      this.questions.forEach((q:any) => {
        q['givenAnswer']='';
        
      });

      console.log(this.questions);
      this.startTimer();

    },
    (error)=>{
      console.log("Error");
      Swal.fire("Error","Error in loading questions of quiz",'error');
    })
  }



  preventBackButton(){
      history.pushState(null,location.href);
      this.locationST.onPopState(()=>{
        history.pushState(null, location.href)
      })
      }

      submitQuiz(){
       
        Swal.fire({
          title: 'Do you want to submit the quiz ?',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          icon:'info'
        }).then((e) => {
          if (e.isConfirmed) {
            this.isSubmit=true;
        
            this.questions.forEach((q:any)=>{
             if(q.givenAnswer==q.answer)
             {this.correctAnswers++
             let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length
           this.marksGot+=marksSingle}
 
 if(q.givenAnswer.trim()!=''){
   this.attempted++;
 }
 
           console.log("Correct Answers : "+ this.correctAnswers)
           console.log("Marks Got : "+ this.marksGot)
           console.log("Attempted : "+ this.attempted)
           console.log(this.questions)
            })
     
           } else if (e.isDenied) {
             Swal.fire('Changes are not saved', '', 'info')
           }
        });
         
       }
      
    
      startTimer(){
      let t=  window.setInterval(()=>{
          if(this.timer<=0){
            this.submitQuiz();
            clearInterval(t);
          }else{
            this.timer--;
          }
        },1000);
      }
     
 


      getFormattedTime(){
        let mm=Math.floor(this.timer/60);
        let ss=this.timer-mm*60;
        return `${mm} min : ${ss} sec `
      }

  }

