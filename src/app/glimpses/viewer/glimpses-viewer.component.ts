import {Component, Input} from '@angular/core';
import {Glimpse, Glimpses} from '../glimpses.data';
import {GlimpsesService} from '../glimpses.service';
@Component({
  selector: 'app-glimpses-viewer',
  providers: [],
  templateUrl: 'glimpses-viewer.html'
})
export class GlimpsesViewerComponent {

  private errorMessage: string;

  private glimpse: Glimpse;

  constructor(private glimpsesService: GlimpsesService) {
  }

  @Input()
  set selected_instance(glimpse: Glimpses) {
    this.glimpsesService.visit(glimpse).subscribe(
      data => this.handle_status(data),
      error => this.errorMessage = <any>error
    );
  }

  handle_status(glimpse: Glimpse) {
    this.glimpse = glimpse;
  }
}