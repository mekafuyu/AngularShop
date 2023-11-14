import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }
  
  storedData = localStorage.getItem('list');

  initItems()
  {
    if (this.storedData !== null)
      return;

    let initalData = [
      { produto: 'arroz', quantidade: 2, comprado: false },
      { produto: 'leite', quantidade: 8, comprado: false },
      { produto: 'nescau', quantidade: 1, comprado: false }
    ]
    localStorage.setItem('list', JSON.stringify(initalData));
  }

  getItems() : Product[]
  {
    var storedData = localStorage.getItem('list');
    if (storedData === null)
      return [];
    
    let data: Product[] = JSON.parse(storedData)
    return data
  }

  getItemByName(name: string) : Product | undefined
  {
    var storedData = localStorage.getItem('list');
    if (storedData === null)
      return undefined;
    
    let data: Product[] = JSON.parse(storedData)
    let produto = data.find((product) => product.produto == name)

    return produto
  }

  setItems(data: Product[])
  {
    localStorage.setItem('list', JSON.stringify(data));
  }

  addItem(product: Product)
  {
    let data: Product[] = this.getItems();
    if(data.length < 1)
      return;

    let index = data.findIndex((item) => item.produto == product.produto)

    if (index > -1)
      data[index].quantidade += product.quantidade
    else
      data.push(product)

    this.setItems(data)
  }

  removeItemByName(product: String)
  {
    let data: Product[] = this.getItems();
    if(data.length < 1)
      return;

    data = data.filter((item) => item.produto != product)

    this.setItems(data)
  }

  updateItemByName(oldProductName: String, newProduct: Product)
  {
    let data: Product[] = this.getItems();
    let index = data.findIndex((item) => item.produto == oldProductName)

    if (index < 0)
      return
    
    data[index] = newProduct
    this.setItems(data)
  }
}
