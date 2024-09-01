import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroupService } from '@services/group/group.service';

@Component({
  selector: 'user-super-update-server-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './super-update-server-panel.component.html',
  styleUrl: './super-update-server-panel.component.css',
})
export class SuperUpdateServerPanelComponent {
  @Input() server: any;
  constructor(private groupService: GroupService) {}

  handleSubmit() {
    console.log('Submitting??');
    this.groupService.updateServer(this.server)?.subscribe((e: any) => {
      console.log(e);
      window.location.reload();
    });
  }
}
