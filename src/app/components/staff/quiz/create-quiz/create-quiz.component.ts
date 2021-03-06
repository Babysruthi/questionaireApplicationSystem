import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { ClassService } from 'src/app/services/class.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {


  subjects: TeacherSubject[] | any
  quiz: Quiz = new Quiz()
  quizDetails: Quiz | any
  quizName:string=""
  staffId: number = Number(localStorage.getItem("staffId"))
  ngOnInit(): void {

  }

  constructor(private subjectService: SubjectService, private quizService: QuizService, private classService:ClassService,private router: Router) {
    this.quizName=this.StaffCourseForm.get('staffId')?.value
  }

  StaffCourseForm = new FormGroup(
    {
      staffId: new FormControl({value:'',disabled:true}, Validators.required),
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      quizDate: new FormControl(''),
      pass:new FormControl(''),
    }
  )
  getCourse() {
    //console.log(this.StaffCourseForm.get('staffId')?.value)
    this.subjectService.getCourseById(Number(localStorage.getItem("staffId"))).subscribe(
      response => {
        let responseBody: Response = response;
        this.subjects = responseBody.data
        console.log(this.subjects)  
      }
    )
  }

  get name()
  {
    return this.StaffCourseForm.get('name')
  }
  setSubCode() {
    localStorage.setItem("subCode", this.StaffCourseForm.get('code')?.value)
  }

  onSubmit() {

    this.quiz.code = this.StaffCourseForm.get('code')?.value;
    console.log(this.StaffCourseForm.get('code')?.value)
    this.quiz.name = this.StaffCourseForm.get('name')?.value;
    this.quiz.quizDate = this.StaffCourseForm.get('quizDate')?.value;
    this.quiz.passPercent=this.StaffCourseForm.get('pass')?.value,
    this.quiz.status="Pending";
    this.quizService.saveQuiz(Number(localStorage.getItem("staffId")), this.StaffCourseForm.get('code')?.value, this.quiz)
      .subscribe(response => {
        let responseBody:Response=response
        localStorage.setItem("quizId",responseBody.data )
        console.log(responseBody), (error: any) => console.log(error)

        // this.quizService.getQuiz(Number(localStorage.getItem("staffId")), this.StaffCourseForm.get('code')?.value).subscribe(
        //   response => {
        //     let responseBody: Response = response;
        //     this.quizDetails = responseBody.data

        //     for (var i = 0; i < this.quizDetails.length; i++) {
        //       console.log(this.quizDetails[i].name);
        //       if (this.quizDetails[i].name == this.StaffCourseForm.get('name')?.value) {
        //         console.log(this.quizDetails[i].autoId);
        //         console.log(this.quizDetails[i].name);
        //         // localStorage.setItem("quizId", this.quizDetails[i].autoId)
        //         console.log(localStorage.setItem("quizId", this.quizDetails[i].autoId))
        //       }
        //     }
        //   }
        // )
      })

    window.alert("quiz is created successfully!")
    this.router.navigate(['staffdashboard/createquestion'])
  }

publish()
{
  this.router.navigate(['staffdashboard/createanswer'])
}

}
