import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http:HttpClient){}
    
 //load all questions
  public getQuestionsOfQuiz(qid:any){
  return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);}

  public getQuestionsOfQuizForTest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);}

//add question
public addQuestion(question:any){
  return this._http.post(`${baseUrl}/question/`, question);
}

   //delete question
   public deleteQuestion(questionid:any){
    return this._http.delete(`${baseUrl}/question/${questionid}`);
  }

  //ebal quiz
  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);}

}


