import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})
export class LiveStreamComponent implements OnInit {

  @ViewChild('videoStream', { static: true }) video!: ElementRef<HTMLVideoElement>;


  constructor() { }

  ngOnInit() {
  }


}
