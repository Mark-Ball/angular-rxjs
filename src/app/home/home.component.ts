import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() { }

    ngOnInit() {
        const http$: Observable<Course[]> = createHttpObservable('/api/courses');

        const course$ = http$.pipe(
            map(res => Object.values(res['payload'])),
            shareReplay()
        );

        this.beginnerCourses$ = course$.pipe(
            map(courses => courses.filter(course => course.category === 'BEGINNER'))
        )

        this.advancedCourses$ = course$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED'))
        )
    }

}
