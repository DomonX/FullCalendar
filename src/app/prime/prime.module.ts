import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccordionModule,
    CheckboxModule,
    FullCalendarModule,
    ButtonModule,
    InputTextModule
  ],
  exports: [
    CheckboxModule,
    FullCalendarModule,
    ButtonModule,
    InputTextModule
  ]
})
export class PrimeModule { }
