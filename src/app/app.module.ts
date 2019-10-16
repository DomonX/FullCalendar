import { PrimeModule } from './prime/prime.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { InputTextComponent } from './components/input-text/input-text.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    InputTextComponent,
  ],
  imports: [
    PrimeModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
