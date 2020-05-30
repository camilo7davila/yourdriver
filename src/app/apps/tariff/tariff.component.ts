import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PriceService } from 'src/app/core/services/price-value/price.service';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css']
})
export class TariffComponent implements OnInit {

  isLogged: Boolean = false;
  password: string = ''

  form: FormGroup

  constructor(private formBuilter: FormBuilder,
    private priceService: PriceService) {
      this.buildForm()
    this.isLogged = false
  }

  ngOnInit() {
  }

  validPassword() {
    if (this.password === 'claverandom') {
      this.isLogged = true;
      this.priceService.getPriceValue().subscribe(data => {
        this.form.patchValue(data)
      })
    } else {
      alert('clave no valida')
    }
  }

  async updateTariff (event) {
    console.log(this.form.value);
    await this.priceService.editPriceValue(this.form.value)
    alert('editado correctamente')
  }

  async resetPayments() {
    const payment = {
      totalPayments: 0
    }
    await this.priceService.editPriceValue(payment)
    alert('se reinicio los pagos')
  }

  private buildForm() {
    this.form = this.formBuilter.group({
      minPrice: ['', [Validators.required, Validators.min(0.01)]],
      priceperMeter: ['', [Validators.required, Validators.min(0.0001)]],
      priceperSeg: ['', [Validators.required, Validators.min(0.001)]],
      priceperTripCanceled: ['', [Validators.required, Validators.min(0.01)]],
      taxes: ['', [Validators.required, Validators.min(0.01)]],
      totalPayments: [{value:'', disabled: true}, Validators.required]
    })
  }

}
