import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit, OnChanges{


  private _color: string = 'red';
  private _mensaje: string = 'este campo es requerido';

  htmlElement: ElementRef<HTMLElement>;
  @Input() set color(valor:string ){
      //this.htmlElement.nativeElement.style.color = valor;
      this._color = valor;
      this.setColor();
  };
  

  //@Input() mensaje!:string;


  @Input() set mensaje(valor:string ){
    this._mensaje = valor;
    //this.htmlElement.nativeElement.innerText = valor;
    this.setMensaje();
};


@Input() set valido(valor:boolean ){
  if(valor === true){
    this.htmlElement.nativeElement.classList.add('hidden');
  }else{
    this.htmlElement.nativeElement.classList.remove('hidden');
  }
};

  constructor(private el:ElementRef<HTMLElement>) { 
    console.log('constructor directive');
    console.log(el);

    this.htmlElement = el;

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes.mensaje){
      const mensaje = changes.mensaje.currentValue;
      //this.htmlElement.nativeElement.innerText = this.mensaje;

      console.log('mensaje ngOnChanges', mensaje);
    }

    if(changes.color){
      const color = changes.color.currentValue;
      this.htmlElement.nativeElement.style.color = color;
    }
  }
  ngOnInit(): void {
    console.log('ErrorMsgDirective on init');
    this.setColor();
    this.setMensaje();
  }

  setColor():void {
    this.htmlElement.nativeElement.style.color = this._color;
    this.htmlElement.nativeElement.classList.add('form-text');
  }

  setMensaje():void{
    this.htmlElement.nativeElement.innerText = this._mensaje;
  }

}
