import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { PageService } from '../page.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-form-dialog-warehouse',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    NgClass,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatRadioModule,
    CommonModule,
    NgxDropzoneModule
  ],
})
export class FormDialogComponent implements OnInit {
  formFieldHelpers: string[] = ['fuse-mat-dense'];
  addForm: FormGroup;
  isLoading: boolean = false;
  positions: any[];
  permissions: any[];
  Id: any;
  flashMessage: 'success' | 'error' | null = null;
  selectedFile: File = null;
  type: any[] = [
    'Banner', 'Jackpot'
  ];
  brand: any[] = [
    'K', 'R', 'A'
  ];
  url_image: string;
  constructor(private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private _service: PageService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _changeDetectorRef: ChangeDetectorRef,

  ) {

    this.addForm = this.formBuilder.group({
      id: [],
      show_step: [],
      brand: [],
      type: 'Banner',
      image: ''
    });

  }

  ngOnInit(): void {
    if (this.data) {
      this.addForm.patchValue({
        ...this.data.data,
        image: ''
      })
      this.Id = this.data?.data?.id
      this.url_image = this.data?.data?.image
    }
  }
  onSubmit(): void {
    const confirmation = this._fuseConfirmationService.open({
      "title": "บันทึกข้อมูล",
      "message": "คุณต้องการบันทึกข้อมูลใช่หรือไม่ ",
      "icon": {
        "show": false,
        "name": "heroicons_outline:exclamation",
        "color": "warning"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "ยืนยัน",
          "color": "primary"
        },
        "cancel": {
          "show": true,
          "label": "ยกเลิก"
        }
      },
      "dismissible": true
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        const formData = new FormData();
        Object.entries(this.addForm.value).forEach(([key, value]: any[]) => {
          formData.append(key, value);
        });
        for (var i = 0; i < this.files.length; i++) {
          formData.append('image', this.files[i]);
        }

        if (this.Id) {
          this._service.update(formData).subscribe({
            next: (resp: any) => {
              this.dialogRef.close(resp)
            },
            error: (err: any) => {
              this._fuseConfirmationService.open({
                "title": "กรุณาระบุข้อมูล",
                "message": err.error.message,
                "icon": {
                  "show": true,
                  "name": "heroicons_outline:exclamation",
                  "color": "warning"
                },
                "actions": {
                  "confirm": {
                    "show": false,
                    "label": "ยืนยัน",
                    "color": "primary"
                  },
                  "cancel": {
                    "show": false,
                    "label": "ยกเลิก",

                  }
                },
                "dismissible": true
              });
            }
          })
        } else {
          this._service.create(formData).subscribe({
            next: (resp: any) => {
              this.dialogRef.close()
            },
            error: (err: any) => {
              this._fuseConfirmationService.open({
                "title": "กรุณาระบุข้อมูล",
                "message": err.error.message,
                "icon": {
                  "show": true,
                  "name": "heroicons_outline:exclamation",
                  "color": "warning"
                },
                "actions": {
                  "confirm": {
                    "show": false,
                    "label": "ยืนยัน",
                    "color": "primary"
                  },
                  "cancel": {
                    "show": false,
                    "label": "ยกเลิก",

                  }
                },
                "dismissible": true
              });
            }
          })
        }
      }
    })
  }



  onCancelClick(): void {

    this.dialogRef.close();
  }

  showFlashMessage(type: 'success' | 'error'): void {
    // Show the message
    this.flashMessage = type;

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Hide it after 3 seconds
    setTimeout(() => {

      this.flashMessage = null;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    }, 3000);
  }

  files: File[] = [];
  url_logo: string;
  onSelect(event: { addedFiles: File[] }): void {
    this.url_image = ''
    this.files.push(...event.addedFiles);

    var reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onload = (e: any) =>
      this.url_logo = e.target.result;
    const file = this.files[0];
    this.addForm.patchValue({
      image: file
    });
  }

  onRemove(file: File): void {
    this.url_image = this.data?.data?.image
    const index = this.files.indexOf(file);
    if (index >= 0) {
      this.files.splice(index, 1);
    }
  }
}
