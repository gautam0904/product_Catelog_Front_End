import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IUser } from '../../core/interfaces/model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  @Input() isedit: boolean = false
  @Input() profile : IUser | null = null

  signupForm!: FormGroup;
  selectedFile!: File;
  selectedRole!: string;

  constructor(private fb: FormBuilder,
     private auth: AuthService, 
     private router: Router, 
     private messageService: MessageService, ) {


    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      profilepic: [null, Validators.required],
      role: ['user', Validators.required]
    })
  }

  
  ngAfterViewChecked(){
    if (this.isedit) {
      
      // this.setInitialValues();
    }
  }


  // setInitialValues() {
  //   // Example of setting initial values
  //   const newvalues = this.ud.profileForm
  //   if (newvalues) {
  //     this.signupForm.patchValue({
  //       name:newvalues?.name,
  //       email: newvalues?.email,
  //       password: newvalues?.password,
  //       role: newvalues?.role
  //     });
  //     this.ud.deleteprofiledata();
  //   }
    
  // }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
    }
  }

  onSubmit() {
    this.auth.signup(this.signupForm.value, this.selectedFile).subscribe({
      next: (resdata: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: resdata.message });
        this.router.navigate(['/auth'])
      },
      error: (res: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
    })

  }

}
