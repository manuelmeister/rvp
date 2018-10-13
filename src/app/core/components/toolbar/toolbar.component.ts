import {
  Component, Input, OnInit,
  Output, ChangeDetectionStrategy,
  AfterViewInit, ViewChild,
  ElementRef, EventEmitter
} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'

import {fromEvent, Subscription} from 'rxjs'
import {debounceTime, pluck} from 'rxjs/operators'

import {_FORM_INPUT_DEBOUNCE_} from '../../../config/form'

interface ActionBtnMeta {
  id: string
  cls: string
  label: string
  title: string
}

@Component({
  selector: 'rv-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Input('currentAnnotationsOnly') readonly currentAnnotationsOnlyIn: boolean
  @Input('search') readonly searchIn: string
  @Input('applyToTimeline') readonly applyToTimelineIn: boolean

  leftForm: FormGroup|null = null
  rightForm: FormGroup|null = null

  @Output() readonly onCurrentAnnotationsOnlyChange = new EventEmitter<boolean>()
  @Output() readonly onSearchChange = new EventEmitter<string>()
  @Output() readonly onApplyToTimelineChange = new EventEmitter<boolean>()

  @ViewChild('search') private readonly _searchRef: ElementRef

  private readonly _subs: Subscription[] = []

  actionBtns: ActionBtnMeta[] = [
    {id: 'add_annotation', cls: 'ion-md-add-circle-outline', label: 'Add', title: 'Add Annotation'},
    {id: 'delete_annotation', cls: 'ion-md-remove-circle-outline', label: 'Delete', title: 'Delete Annotation'},
    {id: 'copy_annotation', cls: 'ion-md-copy', label: 'Copy', title: 'Copy Annotation'},
    {id: 'paste_annotation', cls: 'ion-md-clipboard', label: 'Paste', title: 'Paste Annotation'},
    {id: 'undo_action', cls: 'ion-md-undo', label: 'Undo', title: 'Undo Action'},
    {id: 'redo_action', cls: 'ion-md-redo', label: 'Redo', title: 'Redo Action'}
  ]

  constructor(private readonly _fb: FormBuilder) {}

  private _mapLeftModel() {
    return {currentAnnotationsOnly: this.currentAnnotationsOnlyIn}
  }

  private _mapRightModel() {
    return {
      search: this.searchIn,
      applyToTimeline: this.applyToTimelineIn
    }
  }

  ngOnInit() {
    this.leftForm = this._fb.group(this._mapLeftModel())
    this.rightForm = this._fb.group(this._mapRightModel())

    this._subs.push(
      this.leftForm.valueChanges
      .pipe(
        pluck('currentAnnotationsOnly'))
      .subscribe((value: boolean) => {
        this.onCurrentAnnotationsOnlyChange.emit(value)
      }))

    this._subs.push(
      this.rightForm.valueChanges
      .pipe(
        pluck('search'), debounceTime(_FORM_INPUT_DEBOUNCE_))
      .subscribe((value: string) => {
        this.onSearchChange.emit(value)
      }))

    this._subs.push(
      this.rightForm.valueChanges
        .pipe(pluck('applyToTimeline'))
        .subscribe((value: boolean) => {
          this.onApplyToTimelineChange.emit(value)
        }))
  }

  ngAfterViewInit() {
    this._subs.push(fromEvent(this._searchRef.nativeElement, 'keydown').subscribe((ev: KeyboardEvent) => {
      ev.stopPropagation()
    }))
  }

  actionBtnClick($event: MouseEvent, btn: ActionBtnMeta) {
    console.log('yeah')
  }

  ngOnDestroy() {
    this._subs.forEach(sub => sub.unsubscribe())
  }
}
