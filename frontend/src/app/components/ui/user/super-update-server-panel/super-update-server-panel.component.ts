import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroupService } from '@services/group/group.service';

@Component({
  selector: 'user-super-update-server-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './super-update-server-panel.component.html',
  styleUrl: './super-update-server-panel.component.css',
})
export class SuperUpdateServerPanelComponent implements OnChanges {
  @Input() group: { name: string; imageURL: string; _id?: string } = {
    name: '',
    imageURL: '',
  };
  @Input() creating: boolean = false;
  error = '';
  constructor(private groupService: GroupService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.error = '';
  }
  handleSubmit() {
    console.log('Submitting??');
    //TODO: this is jank afk, stop using names of things to check for state...
    if (!this.creating) {
      this.groupService.updateServer(this.group)?.subscribe((e: any) => {
        console.log(e);
        if (!e.error) window.location.reload();
        else this.error = e.error;
      });
    } else {
      this.groupService.createGroup(this.group)?.subscribe((e: any) => {
        console.log(e);
        if (!e.error) window.location.reload();
        else this.error = e.error;
      });
    }
  }
}
