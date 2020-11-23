import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.builForm();
  }

  ngOnInit(): void {

  }

  save(event: Event) {
    event.preventDefault();
    console.log(this.form.value);
    // if (this.form){
    //   console.log(this.form.value);
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }

  private builForm() {
      this.form = this.formBuilder.group({
        email : ['' , [Validators.required, Validators.email]],
        nombre: [''],
        mensaje : [''],
        telefono: [''],
      });
  }


  get emailField(){
    return this.form.get('email');
  }

  get nombreField(){
    return this.form.get('nombre');
  }

  get mensajeField(){
    return this.form.get('mensaje');
  }

  get telefonoField(){
    return this.form.get('telefono');
  }

}
