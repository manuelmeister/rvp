import { Component, OnInit, Input } from '@angular/core';
import { TrackComponent } from './track';
import { PlayheadComponent } from './playhead';
import { CursorComponent } from './cursor';
import { AnnotationComponent } from './track/annotation';
import { Timeline, Annotation } from '../shared/models';

@Component({
  moduleId: module.id,
  selector: 'app-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.css'],
  directives: [TrackComponent, PlayheadComponent, CursorComponent, AnnotationComponent]
})
export class TimelineComponent implements OnInit {

  @Input() data:Timeline;

  cursorTime;
  cursorDisplayTime;

  playheadTime = 2;
  playheadDisplayTime = 2;

  annotation:Annotation = {
    utc_timestamp: 10,
    duration: 5,
    fields:{
      title: "Titel of Annotation",
      description: "dancer enters stage"
    }
  };

  moveCursor($moveEvent) {

    function extround(myvalue,n) {
      myvalue = (Math.round(myvalue * n) / n);
      return myvalue;
    }

    this.cursorTime = $moveEvent.offsetX / $moveEvent.currentTarget.offsetWidth * 100,100;
    this.cursorDisplayTime = extround($moveEvent.offsetX / $moveEvent.currentTarget.offsetWidth * 100,100);
    //log.debug("offsetX",$event.offsetX, "targetWidth",$event.target.offsetWidth);
    //log.debug($event.currentTarget.className);
  }

  playheadClick($clickEvent){

    log.debug("bla");

    function extround(myvalue,n) {
      myvalue = (Math.round(myvalue * n) / n);
      return myvalue;
    }

    this.playheadTime = $clickEvent.offsetX / $clickEvent.currentTarget.offsetWidth * 100,100;
    this.playheadDisplayTime = extround($clickEvent.offsetX / $clickEvent.currentTarget.offsetWidth * 100,100);

  }

  constructor() {
  }

  ngOnInit() {
  }

}
