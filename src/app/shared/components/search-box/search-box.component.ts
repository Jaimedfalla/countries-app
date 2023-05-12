import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit,OnDestroy{

  private debouncerSuscription?:Subscription;
  private debouncer:Subject<string> = new Subject<string>(); //Para esperar un tiempo y hacer la petición y no esperar que el usuario haga enter

  @Input()
  public term:string='';

  @Input()
  public placeholder:string='';

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(500)
      )
      .subscribe(value => {
        this.onValue.emit(value);
      })
    }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  onSetTerm(term:string):void
  {
    if(term.length ===0) return;

    this.onValue.emit(term);
  }

  onKeyPress(term:string):void{
    this.debouncer.next(term);
  }
}
