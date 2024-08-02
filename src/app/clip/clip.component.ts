import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ClipComponent implements OnInit {
  id = '';
  @ViewChild('videoPlayer', {
    static: true,
  })
  target?: ElementRef;
  player?: videojs.Player;
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement, {
      controls: true,
      autoplay: true,
      sources: [
        { src: `https://example.com/video/${this.id}.mp4`, type: 'video/mp4' },
      ],
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }
}
