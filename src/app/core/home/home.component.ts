import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/shared/services/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  forma: FormGroup

  constructor(private fb: FormBuilder, private secur: SecurityService, private router:Router) {


  }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {

    this.forma = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      lastname: ['', [Validators.minLength(3), Validators.required]],
      dni: ['', [Validators.minLength(3), Validators.required]],
      phone: ['', [Validators.min(99999999), Validators.max(999999999), Validators.required,]],
      adress: this.fb.group({
        street: ['', [Validators.minLength(3), Validators.required]],
        number: ['', [Validators.required]],
        city: ['', [Validators.minLength(3), Validators.required]],
      }),
      
      email: ['', [Validators.minLength(3), Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")], this.secur.isAdmin],
      subjects: this.fb.array([])

    });
  }

  addSubject() {
    this.getSubject.push(this.fb.control('', Validators.required));
  }
  removeSubject(i: number) {
    this.getSubject.removeAt(i);
  }
  get getSubject() {
    return this.forma.get('subjects') as FormArray;
  }





  saveForm() {


    if (this.forma.valid) {

      const students = {
        name: this.forma.get('name').value,
        lastname: this.forma.get('lastname').value,
        dni: this.forma.get('dni').value,
        phone: this.forma.get('phone').value,
        street: this.forma.get('adress.street').value,
        number: this.forma.get('adress.number').value,
        city: this.forma.get('adress.city').value,
        email: this.forma.get('email').value,
        subjects: this.forma.get('subjects').value,
  
      }
      this.secur.students.push(students);
      this.router.navigate(['/students']);
    }


  }




  get validName(): boolean { return this.forma.controls.name.status !== 'INVALID' && this.forma.controls.name.touched; }
  get invalidName(): boolean { return this.forma.controls.name.status === 'INVALID' && this.forma.controls.name.touched; }

  get validLastname(): boolean { return this.forma.controls.lastname.status !== 'INVALID' && this.forma.controls.lastname.touched; }
  get invalidLastname(): boolean { return this.forma.controls.lastname.status === 'INVALID' && this.forma.controls.lastname.touched; }

  get validDni(): boolean { return this.forma.controls.dni.status !== 'INVALID' && this.forma.controls.dni.touched; }
  get invalidDni(): boolean { return this.forma.controls.dni.status === 'INVALID' && this.forma.controls.dni.touched; }

  get validEmail(): boolean { return this.forma.controls.email.status !== 'INVALID' && this.forma.controls.email.touched; }
  get invalidEmail(): boolean { return this.forma.controls.email.status === 'INVALID' && this.forma.controls.email.touched; }

  get validStreet(): boolean { return this.forma.get('adress.street').status !== 'INVALID' && this.forma.get('adress.street').touched; }
  get invalidStreet(): boolean { return this.forma.get('adress.street').status === 'INVALID' && this.forma.get('adress.street').touched; }

  get validPhone(): boolean { return this.forma.controls.phone.status !== 'INVALID' && this.forma.controls.phone.touched; }
  get invalidPhone(): boolean { return this.forma.controls.phone.status === 'INVALID' && this.forma.controls.phone.touched; }

  get validCity(): boolean { return this.forma.get('adress.city').status !== 'INVALID' && this.forma.get('adress.city').touched; }
  get invalidCity(): boolean { return this.forma.get('adress.city').status === 'INVALID' && this.forma.get('adress.city').touched; }

  get validNumber(): boolean { return this.forma.get('adress.number').status !== 'INVALID' && this.forma.get('adress.number').touched; }
  get invalidNumber(): boolean { return this.forma.get('adress.number').status === 'INVALID' && this.forma.get('adress.number').touched; }

}
