import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

// Initialization object needed to create a TimelineService instance
// (Essentially constructor params)
interface TimelineInputValues {
  timelineDuration: number|undefined;
  viewportWidth: number;
  zoom: number;
  scroll: number;
}

@Injectable()
export class TimelineService {

  private _inputs: BehaviorSubject<TimelineInputValues>;
  private _timelineWidth: BehaviorSubject<number>;

  // Observable Outputs
  timelineDurationStream: Observable<number>;
  viewportWidthStream: Observable<number>;
  zoomStream: Observable<number>;
  scrollStream: Observable<number>;
  timelineWidthStream: Observable<number>;

  constructor() {}

  init(initial: TimelineInputValues) {
    this._inputs = new BehaviorSubject<TimelineInputValues>(initial);
    this.timelineDurationStream = this._inputs.pluck('timelineDuration').distinctUntilChanged() as Observable<number>;
    this.viewportWidthStream = this._inputs.pluck('viewportWidth').distinctUntilChanged() as Observable<number>;
    this.zoomStream = this._inputs.pluck('zoom').distinctUntilChanged() as Observable<number>;
    this.scrollStream = this._inputs.pluck('scroll').distinctUntilChanged() as Observable<number>;
    // calculate timeline width [px] (from viewport width and zoom)
    this._timelineWidth = new BehaviorSubject<number>(1);
    Observable.combineLatest(this.viewportWidthStream, this.zoomStream)
      .map( ([viewportWidth, zoom]) => viewportWidth/zoom )
      .subscribe(this._timelineWidth);
    this.timelineWidthStream = this._timelineWidth.asObservable().distinctUntilChanged();
    log.debug('time service initialized', initial, this);
  };

  private changeInputValue(key: string, value: number) {
    let obj: {[key: string]: number} = {};
    obj[key] = value;
    let newValues = Object.assign( {}, this._inputs.value, obj );
    this._inputs.next(newValues);
  }

  // Set timeline duration [s] (> 0)
  set timelineDuration(duration: number) {
    if (duration <= 0) throw new Error('Invalid timeline duration. (Needs to be > 0)');
    this.changeInputValue('timelineDuration', duration);
  }

  get timelineDuration() {
    return this._inputs.value.timelineDuration;
  }

  // Set width of visible part of timeline (viewport) [px] (> 0)
  set viewportWidth(width: number) {
    // log.debug('setting viewport width', width);
    if (width <= 0) throw new Error('Invalid viewport width. (Needs to be > 0)');
    this.changeInputValue('viewportWidth', width);
  }

  get viewportWidth() {
    return this._inputs.value.viewportWidth;
  }

  // Set zoom level [0..1]
  set zoom(zoom: number) {
    // log.debug('setting zoom level', zoom);
    if (zoom < 0.001) { zoom = 0.001; }
    else if (zoom > 1) { zoom = 1; }
    this.changeInputValue('zoom', zoom);
  }

  get zoom() {
    return this._inputs.value.zoom;
  }

  // Set scroll position [0..1]
  set scroll(scroll: number) {
    // log.debug('setting scroll position', scroll);
    if (scroll < 0 || !scroll) { scroll = 0; } // also catch falsy values like NaN etc.
    else if (scroll > 1) { scroll = 1; }
    this.changeInputValue('scroll', scroll);
  }

  get scroll() {
    return this._inputs.value.scroll;
  }

  get timelineWidth() {
    return this._timelineWidth.value;
  }


  // Conversion Functions (one time)
  convertPixelsToSeconds(pixels: number): number {
    return pixels / this._timelineWidth.value * this._inputs.value.timelineDuration;
  }

  convertPercentToSeconds(percent: number): number {
    return percent * this._inputs.value.timelineDuration;
  }

  convertViewportPixelsToSeconds(pixels:number): number {
    let scrollOffset = this.convertPercentToSeconds((1 - this._inputs.value.zoom) * this._inputs.value.scroll);
    return scrollOffset + this.convertPixelsToSeconds(pixels);
  }

  convertSecondsToPixels(seconds:number): number {
    return seconds / this._inputs.value.timelineDuration * this._timelineWidth.value;
  }

  convertSecondsToPercent(seconds:number): number {
    return seconds / this._inputs.value.timelineDuration;
  }

}
