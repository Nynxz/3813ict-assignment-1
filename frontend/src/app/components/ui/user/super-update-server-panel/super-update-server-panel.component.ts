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

  ngOnChanges() {
    this.error = '';
  }
  handleSubmit() {
    if (!this.creating) {
      this.groupService.updateGroup(this.group)?.subscribe((e: any) => {
        this.groupService.refreshGroups();
        console.log(e);
      });
    } else {
      this.groupService
        .http_postCreateGroup(this.group)
        ?.subscribe((e: any) => {
          console.log(e);
          if (!e.error) this.groupService.refreshGroups();
          else this.error = e.error;
        });
    }
  }

  deleteGroup() {
    this.groupService.http_postDeleteGroup(this.group).subscribe((e) => {
      this.groupService.refreshGroups();
      console.log(e);
    });
  }
}
