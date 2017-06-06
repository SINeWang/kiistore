import {Component, Input} from '@angular/core';

import {InstancesService} from '../instances.service';
import {Instances} from '../instances.data';
import {StatusService} from '../../statuses/status.service';
import {Statuses} from '../../statuses/statuses.data';
import {ActivatedRoute, Router} from '@angular/router';
import {Receipt, StatusPub} from '../../statuses/publication/status-pub.data';
@Component({
  selector: 'app-instances-editor',
  providers: [],
  templateUrl: 'inst-editor.html'
})
export class InstancesEditorComponent {

  errorMessage: string;

  instances: Instances;

  statuses: Statuses;

  visibility: string;

  publication = new StatusPub();

  @Input()
  set selected_statuses(value: Statuses) {
    this.statuses = value;
    this.instancesService.visit(value).subscribe(
      data => this.handle_status(data),
      error => this.errorMessage = <any>error
    );
  }

  publication_stability(stability: string) {
    this.publication.stability = stability;
  }

  publication_visibility(visibility: string) {
    this.publication.visibility = visibility;
  }

  constructor(private instancesService: InstancesService,
              private statusService: StatusService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  handle_status(instances: Instances) {
    this.instances = instances;
    this.instances.previous = Object.assign({}, instances.map);
    const kv = {};
    for (const key of Object.keys(instances.map)) {
      kv[key] = instances.map[key].value;
    }
    this.instances.current = Object.assign({}, kv);
  }


  save() {
    const next = Object.assign({}, this.instances);
    next.map = this.instances.current;
    this.instancesService.commit(next, this.statuses).subscribe(
      data => this.handle_status(data),
      error => this.errorMessage = <any>error
    );
  }

  publish() {
    this.statusService.commit(this.publication, this.statuses).subscribe(
      data => this.handle_receipt(data),
      error => this.errorMessage = <any>error
    );
  }

  handle_receipt(receipt: Receipt) {
    const parentPath = this.route.parent.snapshot.url[0].path;

    this.router.navigate([parentPath, 'statuses', receipt.pubSet]);

  }
}