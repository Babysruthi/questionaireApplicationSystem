import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Response } from 'src/app/model/response';

@Component({
  selector: 'app-view-course-quiz',
  templateUrl: './view-course-quiz.component.html',
  styleUrls: ['./view-course-quiz.component.css']
})
export class ViewCourseQuizComponent implements OnInit {

  response: Response = new Response;
  subjects:TeacherSubject[]|any
  questions:Question[]|any
  quizList:Quiz[]=[]
  quizLength:number=0
  staffId=localStorage.getItem("staffId")
  constructor(private subjectService:SubjectService,private quizService:QuizService,private questionService:QuestionService,private router:Router) {
   }
   StaffCourseForm=new FormGroup(
    {
      staffId:new FormControl({value:'',disabled:true}),
      code:new FormControl(''),
      name:new FormControl('')
      
    }
  )
  ngOnInit(): void {
    
  }

  getCourse()
  {
      console.log(this.StaffCourseForm.get('staffId')?.value)
    this.subjectService.getCourseById(this.StaffCourseForm.get('staffId')?.value).subscribe(
      data=>{
        this.response=data
        this.subjects=this.response.data
        console.log(this.subjects)
      }
    )
  }

  onSubmit()
  {
 
    localStorage.setItem("subCode",this.StaffCourseForm.get('code')?.value)
  
    this.quizService.getQuizByStaff(this.StaffCourseForm.get('staffId')?.value,localStorage.getItem("subCode")).subscribe(
      data=>{
        let publishedQuiz:Quiz[]=[]
        this.response=data
        publishedQuiz=this.response.data
        console.log(data)
        

        this.quizService.getQuiz(this.StaffCourseForm.get('staffId')?.value,localStorage.getItem("subCode")).subscribe(
          data=>{
            let pendingQuiz:Quiz[]=[]
            this.response=data
            pendingQuiz=this.response.data
            console.log(data)
            
            this.quizList=this.quizList.concat(publishedQuiz).concat(pendingQuiz)
            console.log(this.quizList)
          })

          this.quizList=[]
      }
    )
  }

  view(id:any)
  {
    // this.questionService.getQuestion(id).subscribe(
    //   res=>{
    //       this.que=res;
    //       console.log(res)
    //   })

    localStorage.setItem("id",id)
    this.router.navigate(['staffdashboard/viewquestion'])
  }


 

}
