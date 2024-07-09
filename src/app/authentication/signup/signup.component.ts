import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IUser } from '../../core/interfaces/model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UpdateDataService } from 'src/app/core/services/update-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {

  isedit: boolean = false
  profile: IUser | null = null
  signupForm!: FormGroup;
  selectedFile!: File;
  selectedRole!: string;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService,
    private ud: UpdateDataService,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {


    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      profilePicture: [null, Validators.required],
      role: ['user', Validators.required]
    })
  }




  ngAfterViewInit() {
    this._route.queryParams.subscribe(params => {
      this.cdr.detectChanges();
      this.isedit = params['isedit'] as boolean;
    });
    if (this.isedit) {
      this.setInitialValues();
    }
  }


  setInitialValues() {
    // Example of setting initial values
    const newvalues = JSON.parse(localStorage.getItem('user') as string);
    this.profile = newvalues
    if (newvalues) {
      this.signupForm.patchValue({
        name: newvalues?.name,
        email: newvalues?.email,
      });
      this.ud.deleteprofiledata();
    }

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (event.target && event.target.result && this.profile !== null) {
          this.profile.profilePicture = event.target.result as string;

        }
      }
    } else {
      this.profile = null
    }

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
    }
  }

  onupdate() {
    this.auth.update(this.signupForm.value, this.selectedFile).subscribe({
      next: (resdata: any) => {
        Swal.fire({
          icon: "success",
          title: "Oops...",
          text: resdata.message,
        });
        const token = localStorage.getItem('token') as string;
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(resdata));
        this.router.navigate(['/page'])
      },
      error: (res: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error.message,
        });
      }

    })
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.auth.signup(this.signupForm.value, this.selectedFile).subscribe({
        next: (resdata: any) => {
          Swal.fire({
            icon: "success",
            title: "Oops...",
            text: resdata.message,
          });
          this.router.navigate(['/auth'])
        },
        error: (res: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.error.message,
          });
        }
      })
    }
  }

}
