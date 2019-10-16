import { Component, OnInit, ViewChild, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 

interface ICalendarEvent {
  "id": number;
  "title": string;
  "start": string;
  "end": string;
  "backgroundColor": string;
}

enum ECalendarEventColor {
  reserved = "#0000FF",
  reservedSelected = "#7777FF",
  unReserved = "#11BB11",
  unReservedSelected = "#33FF33"
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input()
  title: string;

  events: ICalendarEvent[] = [];
  options: any;
  header: any;

  selectionStart: Date;
  selectionEnd: Date;
  autoIncrement: number = 4;
  selectedId: number;

  findEvent(info: any): number {
    return this.events.findIndex( (element) => { 
      return element.id == info.id 
    });
  }

  reloadEvents() {
    this.events = [
      ...this.events
    ];
  }

  checkTitleIsSet(id: number): boolean{
    return (this.events[id].title == undefined || this.events[id].title == '') ? false : true;
  }

  add() {
    this.autoIncrement++;
    this.events.push({
      "id": this.autoIncrement,
      "title": this.title,
      "start": this.selectionStart.toJSON(),
      "end": this.selectionEnd.toJSON(),
      "backgroundColor": undefined,
    });
    this.unselectEvent(this.findEvent({id: this.autoIncrement}));
    this.reloadEvents();
  }

  select(info: any) {
    this.selectionStart = info.start;
    this.selectionEnd = info.end;
  }

  move(info: any) {
    const index = this.findEvent(info);
    const end = info.end === null ? info.start : info.end;
    this.events[index].start = info.start.toJSON();
    this.events[index].end = end;
    this.reloadEvents();
  }

  resize(info: any) {
    const index = this.findEvent(info);
    this.events[index].end = info.end.toJSON();
    info.end.toJSON();
  }

  click(info: any) {
    if(this.selectedId !== undefined) {
      this.unselectEvent(this.selectedId);
    }
    const index = this.findEvent(info);
    if(this.selectedId == index) {
      this.unselectEvent(this.selectedId);
      this.selectedId = undefined;
      this.reloadEvents();
      return;
    }
    this.selectedId = index;
    this.selectEvent(this.selectedId);
    this.reloadEvents();
  }

  selectEvent(id: number) {
    if(this.checkTitleIsSet(id)) {
      this.events[id].backgroundColor = ECalendarEventColor.reservedSelected;
    } else {
      this.events[id].backgroundColor = ECalendarEventColor.unReservedSelected;
    }
  }

  unselectEvent(id: number) {
    if(this.checkTitleIsSet(id)) {
      this.events[id].backgroundColor = ECalendarEventColor.reserved;
    } else {
      this.events[id].backgroundColor = ECalendarEventColor.unReserved;
    }
  }

  remove() {
    if(this.selectedId === undefined) {
      return;
    }
    this.events.splice(this.selectedId,1);
    this.selectedId = undefined;
    this.reloadEvents();
  }

  reserve() {
    if(this.checkTitleIsSet(this.selectedId)) {
      return;
    }
    if(this.title == '' || this.title === undefined) {
      return;
    }
    this.events[this.selectedId].title = this.title;
    this.events[this.selectedId].backgroundColor = ECalendarEventColor.reserved;
    this.reloadEvents();
  }

  unreserve() {
    if(!this.checkTitleIsSet(this.selectedId)) {
      return;
    }
    this.events[this.selectedId].title = undefined;
    this.events[this.selectedId].backgroundColor = ECalendarEventColor.unReserved;
    this.reloadEvents();
  }

  constructor() { 
    this.events = [
      {
        "id": 0,
        "title": "Norbert Bańkowski",
        "start": "2019-07-28T07:00:00",
        "end": "2019-07-28T08:00:00",
        "backgroundColor": ECalendarEventColor.reserved
      },
      {
        "id": 1,
        "title": "Adam Nowak",
        "start": "2019-07-28T08:00:00",
        "end": "2019-07-28T09:00:00",
        "backgroundColor": ECalendarEventColor.reserved
      },
      {
        "id": 2,
        "title": "Jerzy Kowalski",
        "start": "2019-07-28T09:00:00",
        "end": "2019-07-28T10:00:00",
        "backgroundColor": ECalendarEventColor.reserved
      },
      {
        "id": 3,
        "title": "Janek Brzoza",
        "start": "2019-07-28T11:00:00",
        "end": "2019-07-28T12:00:00",
        "backgroundColor": ECalendarEventColor.reserved
      },
      {
        "id": 4,
        "title": undefined,
        "start": "2019-07-28T12:00:00",
        "end": "2019-07-28T13:00:00",
        "backgroundColor": ECalendarEventColor.unReserved
      }
  ];
  }

  ngOnInit() {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2019-08-01',
      defaultView: 'timeGridWeek',
      selectable: true,      
      customButtons: {
        add: {
          text: 'Add',
          click: () => this.add()
        },
        remove: {
          text: 'Remove',
          click: () => this.remove()
        },
        reserve: {
          text: 'Reserve',
          click: () => this.reserve()
        },
        unreserve: {
          text: 'Unreserve',
          click: () => this.unreserve()
        },
      },
      header: {
        left: 'prev,next,add,remove,reserve,unreserve',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      select: (info: any) => this.select(info),
      eventDrop: (info: any) => this.move(info.event),
      eventResize: (info: any) => this.resize(info.event),
      eventClick: (info: any) => this.click(info.event),
      editable: true
    };
  }

}