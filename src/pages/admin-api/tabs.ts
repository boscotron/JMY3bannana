import { Component } from '@angular/core';

import { AdminApiPage } from '../admin-api/admin-api';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsApis {

  tab1Root = AdminApiPage;
  tab2Root = ContactPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
