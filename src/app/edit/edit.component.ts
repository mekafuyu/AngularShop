import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  produtoName = ""
  produto: Product | undefined
  subscription: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopService) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe(p => {
        this.produtoName = p['produto'];
      });
    
    this.produto = this.service.getItemByName(this.produtoName)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setProduto(event: any) {
    if(this.produto != undefined)
      this.produto.produto = event.target.value;
  }

  setQuant(event: any) {
    if(this.produto != undefined)
      this.produto.quantidade = Number(event.target.value);
  }

  salvar() {
    if(this.produto != undefined)
      this.service.updateItemByName(this.produtoName, this.produto)
    this.router.navigate(['/shop'])
  }
}
