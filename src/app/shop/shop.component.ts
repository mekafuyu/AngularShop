import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit
{
  mostrarCprds = true
  list: Product[] = []
  produto = ""
  quant = 0
  subscription: any;

  constructor(
    private router: Router,
    private service: ShopService
    ) { }

  
  ngOnInit(): void
  {
    this.service.initItems();
    this.refresh();
  }

  refresh(){
    this.list = this.service.getItems();
  }

  markCheckbox(event: any,produto: string) {
    this.list.map(it => {
      if (it.produto == produto)
        it.comprado = event.target.checked;
    })
    this.service.setItems(this.list);
    console.log(this.list)
  }

  mostrarComprados(event: any) {
    this.mostrarCprds = !event.target.checked;
  }

  setProduto(event: any) {
    this.produto = event.target.value;
  }

  setQuant(event: any) {
    this.quant = Number(event.target.value);
  }
  
  addProduct() {
    if (this.produto == "" || this.quant < 1 || this.quant == null)
      return
  
    let newProduct : Product = {
      produto: this.produto,
      quantidade: this.quant,
      comprado: false
    }

    this.service.addItem(newProduct);
    this.refresh();
  }

  removeProduct(produto: string) {
    this.service.removeItemByName(produto);
    this.refresh();
  }

  editar(produto: string){
    console.log("a")
    this.router.navigate(['edit', produto])
  }
}
