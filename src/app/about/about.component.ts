import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, noop, of, concat } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);
    const result$ = concat(source1$, source2$);
    result$.subscribe(console.log);
  }

}
