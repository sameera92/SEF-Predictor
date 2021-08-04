import {Component, Input, OnInit} from '@angular/core';
import { Loader } from '../models/loader';
import { LoaderService } from '../services/loaderService';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() public id: string = 'global';
  public show: boolean;

  constructor(private loaderService: LoaderService) {
  }

  public ngOnInit(): void {
    this.loaderService.loaderStatus$.subscribe((response: Loader) => {
      this.show = this.id === response.id && response.status;
    });
  }

}