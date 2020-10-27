import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barbero-dormilon';

  public customersCounter: number = 0;
  public customersWaiting: any[] = [];
  public totalChairs: number = 5;


  public isSleeping: boolean = true;
  public isBusy: boolean = false;
  public customerName: string;

  constructor() {
    
    console.warn('Sistemas Operativos Avanzados 2020 - Prof: Candelero, Diego.')
    setInterval( () => {
      this.barber();
    }, 5000);

  }

  ngOnInit(): void {
    
  }

  public sitOnChair(): void {
    this.customersCounter ++;
    this.customersWaiting.push( 'Cliente ' + this.customersCounter );
  }

  public customer(): void {
    console.warn('Proceso Cliente');
    if( this.checkBarberSleeping() ){
      this.wakeUpBarber();
    }
    if( this.checkChairsAvailable() ){
        console.log('El cliente se sienta a esperar...');
        this.sitOnChair();
    } else{
      console.log('El cliente se va de la tienda.');
    }
  }

  public barber(): void {
    setTimeout(() => {
      console.warn('Proceso Barbero');
      if( this.checkCustomersWaiting() ){
        console.log('Atiende a cliente...');
        this.isBusy = true;
        this.customerName = this.customersWaiting[0];
        this.customersWaiting.splice(0, 1);
        setTimeout(() => {
          this.cutHair();
          this.isBusy = false;
        }, 3000);
      } else{
        this.sleep();
      }
    }, 3000);
  }

  public checkChairsAvailable(): boolean {
    if( this.customersWaiting.length < this.totalChairs ){
      console.log('Hay sillas disponibles');
      return true;
    } else {
      console.log('No hay sillas disponibles');
      return false;
    }
  }

  public checkBarberSleeping(): boolean {
    if( this.isSleeping ){
      console.log('El barbero está durmiendo');
      return true;
    } else{
      console.log('El barbero está despierto');
      return false;
    }
  }

  public wakeUpBarber(): void {
    console.log('Se despierta al barbero');
    this.isSleeping = false;
  }

  public checkBarberBusy(): boolean {
    if( this.isBusy ){
      console.log('El barbero está ocupado');
      return true;
    } else {
      console.log('El barbero está libre');
      return false;
    }
  }

  public checkCustomersWaiting(): boolean{
    if( this.customersWaiting.length > 0 ){
      console.log('Hay clientes esperando');
      return true;
    } else{
      console.log('No hay clientes esperando');
      return false;
    }
  }

  public sleep(): void {
    console.log('El barbero se duerme Zzz');
    this.isSleeping = true;
  }

  public cutHair(): void {
    console.log('Corte finalizado');
  }


  public trackByItems( index: number, item: any ): number{
    return item.id;
  }


}
