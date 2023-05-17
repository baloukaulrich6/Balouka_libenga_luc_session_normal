import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Abonne } from 'src/app/models/Abonne.model';
import { AbonneService } from 'src/app/services/abonne.service';

declare var window: any;
@Component({
  selector: 'app-abonne',
  templateUrl: './abonne.component.html',
  styleUrls: ['./abonne.component.scss']
})
export class AbonneComponent {
    AbonneData!: any;
    fromModal: any;
    formValue!: FormGroup;
    showAdd!: boolean;
    showUpdate!: boolean;
    number!: number;
    abonneModel = new Abonne();
    constructor(private formbuilder: FormBuilder, private api: AbonneService) {}
  
    ngOnInit(): void {
      this.number = -1;
      this.fromModal = new window.bootstrap.Modal(
        document.getElementById('exampleModal')
      );
      this.formValue = this.formbuilder.group({
        Nom: [''],
        Prenom: [''],
        Age: [''],
        Sexe: [''],
        Profession: [''],
        Rue: [''],
        Code_postal: [''],
        Ville: [''],
        Pays: [''],
        Telephone: [''],
        Email: [''],
      });
  
      this.getAbonne();
    }
    openModal() {
      this.fromModal.show();
    }
    doSomeThing() {
      this.fromModal.hide();
    }
    clickAddabonne() {
      this.formValue.reset();
      this.showAdd = true;
      this.showUpdate = false;
    }
  
    postAbonne() {
      this.abonneModel.nom = this.formValue.value.Nom;
      this.abonneModel.prenom = this.formValue.value.Prenom;
      this.abonneModel.age = this.formValue.value.Age;
      this.abonneModel.sexe = this.formValue.value.Sexe;
      this.abonneModel.profession = this.formValue.value.Profession;
      this.abonneModel.rue = this.formValue.value.Rue;
      this.abonneModel.code_postal = this.formValue.value.Code_postal;
      this.abonneModel.ville = this.formValue.value.Ville;
      this.abonneModel.pays = this.formValue.value.Pays;
      this.abonneModel.telephone = this.formValue.value.Telephone;
      this.abonneModel.email = this.formValue.value.Email;
  
      this.api.postAbonne(this.abonneModel).subscribe(
        (res) => {
          console.log(res);
          console.log(this.abonneModel);
          alert('enregistrement effectue avec succes');
          this.formValue.reset();
          let ref = document.getElementById('cancel');
          ref?.click();
        },
        (err) => {
          alert('echec de l ajout');
        }
      );
    }
  
    getAbonne() {
      this.api.getAbonne().subscribe((res) => {
        this.AbonneData = res;
      });
    }

  
  
    deleteAbonne(abonne: any) {
      this.api.deleteAbonne(abonne.id).subscribe((res) => {
        alert('suppresion effectue avec success');
        this.getAbonne();
      });
    }
  
    modifierabonne(abonne: any) {
      this.showAdd = false;
      this.showUpdate = true;
      this.number = abonne.id;
     
      this.abonneModel.nom = abonne.nom;
      this.abonneModel.prenom = abonne.prenom;
      this.abonneModel.age = abonne.age;
      this.abonneModel.sexe = abonne.sexe;
      this.abonneModel.profession = abonne.profession;
      this.abonneModel.rue = abonne.rue;
      this.abonneModel.code_postal = abonne.code_postal;
      this.abonneModel.ville = abonne.ville;
      this.abonneModel.pays = abonne.pays;
      this.abonneModel.telephone = abonne.telephone;
      this.abonneModel.email = abonne.email;
  
      this.formValue.controls['Nom'].setValue(abonne.nom);
      this.formValue.controls['Prenom'].setValue(abonne.prenom);
      this.formValue.controls['Age'].setValue(abonne.age);
      this.formValue.controls['Sexe'].setValue(abonne.sexe);
      this.formValue.controls['Profession'].setValue(abonne.profession);
      this.formValue.controls['Rue'].setValue(abonne.rue);
      this.formValue.controls['Code_postal'].setValue(abonne.code_postal);
      this.formValue.controls['Ville'].setValue(abonne.ville);
      this.formValue.controls['Pays'].setValue(abonne.pays);
      this.formValue.controls['Telephone'].setValue(abonne.telephone);
      this.formValue.controls['Email'].setValue(abonne.email);
    }
    updateAbonne() {
        this.abonneModel.nom = this.formValue.value.Nom;
        this.abonneModel.prenom = this.formValue.value.Prenom;
        this.abonneModel.age = this.formValue.value.Age;
        this.abonneModel.sexe = this.formValue.value.Sexe;
        this.abonneModel.profession = this.formValue.value.Profession;
        this.abonneModel.rue = this.formValue.value.Rue;
        this.abonneModel.code_postal = this.formValue.value.Code_postal;
        this.abonneModel.ville = this.formValue.value.Ville;
        this.abonneModel.pays = this.formValue.value.Pays;
        this.abonneModel.telephone = this.formValue.value.Telephone;
        this.abonneModel.email = this.formValue.value.Email;
  
      this.api.updateAbonne(this.abonneModel, this.number).subscribe(
        (res) => {
          console.log(res);
          console.log(this.abonneModel);
          alert('modification effectue avec succes');
          this.formValue.reset();
          let ref = document.getElementById('cancel');
          ref?.click();
          this.getAbonne();
        },
        (err) => {
          alert('Echec de la mise ajour');
        }
      );
    }
  }
  
