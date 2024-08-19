import { NgClass, NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HelloworldService } from '../../../test/helloworld.service';

@Component({
  selector: 'app-panel-server-widget',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './panel-server-widget.component.html',
  styleUrl: './panel-server-widget.component.css',
})
export class PanelServerWidgetComponent {
  @Input() server: any;
  @Input() selected: any;
  selectedServer: any;
  folded = false;

  serverName = '';
  imageURL = '';

  fold() {
    this.selectedServer = this.server;
    // this.folded = !this.folded;
    console.log('Folding', this.server);
  }
}
