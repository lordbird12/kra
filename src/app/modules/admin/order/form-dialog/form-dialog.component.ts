import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { PageService } from '../page.service';
import { Employee } from '../page.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-form-dialog',
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
        CommonModule
    ],
})
export class FormDialogComponent implements OnInit {
    addForm: FormGroup;
    selectedFile: File | null = null;
    // flashErrorMessage: string;
    positions: any[];
    
    flashMessage: 'success' | 'error' | null = null;
    taxType: any[] = [
        {
            id: 1,
            name: 'Text',
        },
        {
            id: 2,
            name: 'Image',
        },
    ];
    constructor(private dialogRef: MatDialogRef<FormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private _service: PageService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        // localStorage.setItem('user', JSON.stringify({ brand: 'K', type: 'Example Type' }));

        // สร้าง Reactive Form
        this.addForm = this.formBuilder.group({
            page_categorie_id: [],
            name: ['', Validators.required],
            show_step: [],
            type: [],
            brand: [''],
            image: ''
        });
    
        // ดึงค่าจาก localStorage
        const value = localStorage.getItem('user'); // ดึงข้อมูลที่เก็บไว้ใน key "user"
        console.log('Raw localStorage value:', value); // แสดงค่า raw จาก localStorage
        if (value) {
            const jsonObject = JSON.parse(value); // แปลง string เป็น JSON object
            console.log('Parsed localStorage object:', jsonObject); // แสดง JSON object
    
            const brandValue = jsonObject.brand || ''; // ตรวจสอบว่ามี key "brand" หรือไม่
            console.log('Brand value:', brandValue); // แสดงค่า brand
    
            this.addForm.patchValue({ brand: brandValue }); // ตั้งค่าในฟอร์ม
            console.log('Form value after patch:', this.addForm.value); // แสดงค่าฟอร์มหลังตั้งค่า
        }
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          this.selectedFile = input.files[0];
          console.log('Selected file:', this.selectedFile);
        }
      }
    onSaveClick(): void {
        if (this.addForm.invalid) {
          this._fuseConfirmationService.open({
            title: 'กรุณาระบุข้อมูล',
            icon: { show: true, name: 'heroicons_outline:exclamation', color: 'warning' },
            dismissible: true
          });
          return;
        }
    
        // Create FormData to send along with the file
        const formData = new FormData();
        formData.append('page_categorie_id', this.addForm.get('page_categorie_id')?.value || '');
        formData.append('name', this.addForm.get('name')?.value || '');
        formData.append('show_step', this.addForm.get('show_step')?.value || '');
        formData.append('type', this.addForm.get('type')?.value || '');
        formData.append('brand', this.addForm.get('brand')?.value || '');
    
        if (this.selectedFile) {
          formData.append('image', this.selectedFile, this.selectedFile.name);
        }
    
        // Send form data (including image file) to the server
        this._service.create(formData).subscribe({
          next: (resp) => {
            const confirmation = this._fuseConfirmationService.open({
                "title": "เพิ่มข้อมูล",
                "message": "คุณต้องการเพิ่มข้อมูลใช่หรือไม่ ",
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
    
            this.dialogRef.close(resp);
          },
          error: (err) => {
            this._fuseConfirmationService.open({
              title: 'เกิดข้อผิดพลาด',
              message: err.error?.message || 'ไม่สามารถบันทึกข้อมูลได้',
              icon: { show: true, name: 'heroicons_outline:exclamation', color: 'warning' },
              dismissible: true
            });
          }
        });
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

}
