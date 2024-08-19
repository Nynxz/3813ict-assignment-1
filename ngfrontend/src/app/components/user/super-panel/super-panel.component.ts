import { Component, OnInit } from '@angular/core';
import { HelloworldService } from '../../../test/helloworld.service';
import { NgFor, NgIf } from '@angular/common';
import { GroupwidgetComponent } from '../../navbar/groupwidget/groupwidget.component';
import { PanelServerWidgetComponent } from '../panel-server-widget/panel-server-widget.component';
import { PanelUpdateserverWidgetComponent } from '../panel-updateserver-widget/panel-updateserver-widget.component';

@Component({
  selector: 'app-super-panel',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    GroupwidgetComponent,
    PanelServerWidgetComponent,
    PanelUpdateserverWidgetComponent,
  ],
  templateUrl: './super-panel.component.html',
  styleUrl: './super-panel.component.css',
})
export class SuperPanelComponent implements OnInit {
  servers: any;
  selectedServer: any = { serverName: '' };
  constructor(private helloWorldService: HelloworldService) {}

  ngOnInit(): void {
    this.helloWorldService.getServers().subscribe((e) => (this.servers = e));
  }

  updateSignal() {
    this.helloWorldService.updateTestSignal(1);
  }
}
