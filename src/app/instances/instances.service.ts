import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Instances} from './instances.data';
import {ModelSub} from '../models/subscription/model-sub.data';

@Injectable()
export class InstancesService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  visit(modelSub: ModelSub): Observable<Instances> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + modelSub.subscriberId + '/status/' + modelSub.id;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  commit(status: Instances, modelSub: ModelSub): Observable<Instances> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + modelSub.subscriberId + '/status/' + modelSub.id;
    return this.http.put(url, status.map, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
