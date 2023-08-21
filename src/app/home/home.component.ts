import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm!:FormGroup
  registrationForm!:FormGroup
  showPassword: boolean = false;
  isModalOpen: boolean = false;
  responseMessage:any


  restaurantNames=[
    'Agra Restaurant',
    'Ahemdabad Restaurant',
    'Ajmer Restaurant',
    'Amritsar Restaurant',
    'Shimla Restaurant'
  ]


  allCountries=[
    {image:'../../assets/indianFlag.jpg',countryName:'India'},
    {image:'../../assets/usaFlag.jpg',countryName:'USA'},
    {image:'../../assets/nepalFlag.jpg',countryName:'Nepal'},
  ]

  restaurantBox=[
    {image:'../../assets/h1.jpg',restaurantNames:'Taj',offer:'50% off on advance booking', city:'chandigarh'},
    {image:'../../assets/h2.jpg',restaurantNames:'Saffron',offer:'50% off on advance booking', city:'chandigarh'},
    {image:'../../assets/h3.jpg',restaurantNames:'Mandrin',offer:'50% off on advance booking', city:'chandigarh'},
    {image:'../../assets/h4.jpg',restaurantNames:'Holiday',offer:'50% off on advance booking', city:'chandigarh'},
  ]

  offerFood=[
    {image:'../../assets/chicken1.jpg',restaurantName:'saffron',offer:'20% off',dishName:'chicken'},
    {image:'../../assets/food2.jpg',restaurantName:'Dawat',offer:'10% off',dishName:'Kadhai Paneer'},
    {image:'../../assets/food3.jpg',restaurantName:'Pawan',offer:'15% off',dishName:'chicken'},
    {image:'../../assets/food4.jpg',restaurantName:'Janta',offer:'20% off',dishName:'Soup'},
    {image:'../../assets/food5.jpg',restaurantName:'Krishna',offer:'5% off',dishName:'Noodles'},
    {image:'../../assets/food6.jpg',restaurantName:'saffron',offer:'30% off',dishName:'Biryani'},
  ]

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private service:ApiService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
    })

    this.registrationForm=this.fb.group({
      usernameReg:['',Validators.required],
      emailReg:['',Validators.required,Validators.email],
      // passwordReg:['',Validators.required],
      passwordReg: ['', [Validators.required, Validators.minLength(6), asyncValidator]],
      agreePolicyReg:['',Validators.required]
    })
  }

  customPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
    // Implement your custom password validation logic here
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    const isValid = hasUpperCase && hasLowerCase && hasNumber;

    return isValid ? null : { invalidPassword: true };
  }


  



  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.dismissModal()
      
    }
    if(this.registrationForm.valid){
      const data = {
        usernameReg: this.registrationForm.value.usernameReg,
        emailReg: this.registrationForm.value.emailReg,
        passwordReg: this.registrationForm.value.passwordReg,
        agreePolicyReg: this.registrationForm.value.agreePolicyReg
    }
      this.service.register(data).subscribe((response:any)=>{
       if(response.success == false){
        this.responseMessage=response.message
        // Swal.fire('Error', `<i>${data.emailReg}</i> this email already exist.`, 'error');
       }
       if(response.success == true){
        Swal.fire('Success', `${response.data.fullName} your account created successfully.<p>Please login</p>`, 'success');
        this.dismissModal();
       }
      })
    }
  }


  dismissModal() {
    // Hide and reset the modal
    const modal = document.getElementById('registrationModal');
    const modal1 = document.getElementById('loginModal');

    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        this.registrationForm.reset();
    }
    if (modal1) {
        modal1.classList.remove('show');
        modal1.style.display = 'none';
        this.loginForm.reset();
    }

    // Remove the modal backdrop
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modalBackdrop) {
        modalBackdrop.parentNode?.removeChild(modalBackdrop);
    }}


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  restaurantPage(){
    this.router.navigate(['/restaurant'])
  }

}


function asyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  // Simulate an asynchronous operation
  return new Observable(observer => {
    setTimeout(() => {
      if (control.value === 'someValue') {
        observer.next({ asyncValidationFailed: true }); // Return a validation error
      } else {
        observer.next(null); // Validation passed
      }
      observer.complete();
    }, 1000); // Simulate delay
  });
}
