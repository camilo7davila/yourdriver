import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Mail, MailService } from './mail.service';
import { AppState } from './app.state';

@Component({
  selector: 'app-mail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
  providers: [MailService]
})
export class MailComponent {
  public mails: Observable<Mail[]>;
  public id: number;
  public type: string;
  public markAsRead = false;
  public markAsUnRead = false;
  public deleteChecked = false;

  constructor(private service: MailService, private route: ActivatedRoute, public router: Router, private state: AppState) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.id = this.route.snapshot.firstChild.params['id'];
        this.type = this.route.snapshot.firstChild.params['type'];
        setTimeout(() => {
          // jQuery('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
        });
      }
    });
  }
  status = false;

  public openClleft() {
    this.status = !this.status;
  }
}
