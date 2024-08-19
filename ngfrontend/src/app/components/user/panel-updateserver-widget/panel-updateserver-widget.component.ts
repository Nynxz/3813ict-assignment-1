import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelloworldService } from '../../../test/helloworld.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-panel-updateserver-widget',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './panel-updateserver-widget.component.html',
  styleUrl: './panel-updateserver-widget.component.css',
})
export class PanelUpdateserverWidgetComponent {
  @Input() server: any;
  constructor(private helloWorldService: HelloworldService) {}

  handleSubmit() {
    console.log('Submitting??');
    this.helloWorldService.updateServer(this.server)?.subscribe((e: any) => {
      console.log(e);
      window.location.reload();
    });
  }
}
