import {Component, ViewChild} from '@angular/core';
import {SubscriptionsSearchService} from '../../subscriptions/search/search.service';
import {Subscriptions} from '../../subscriptions/subscriptions.data';
import {StatusService} from './status.service';
import {SubjectsService} from '../../subjects/subjects.service';

@Component({
  selector: 'app-compose-instances',
  providers: [SubscriptionsSearchService, StatusService, SubjectsService],
  templateUrl: 'instances.html'
})
export class InstancesComponent {


  @ViewChild('subscriptionsSearch') subscriptionsSearch;

  @ViewChild('subscriptionsEditor') subscriptionsEditor;


  notifyEditor(subscriptions: Subscriptions) {
    this.subscriptionsEditor.selected_subscriptions = subscriptions;
  }


}
