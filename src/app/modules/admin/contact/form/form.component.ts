
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { PageService } from '../page.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../brand-model/form-dialog/form-dialog.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'form-product',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
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
    DataTablesModule,
    MatCheckboxModule,
    NgxDropzoneModule,
    QuillModule
  ],

})
export class FormComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dataRow: any[] = [];
  brand: string[] = [
    'K', 'R', 'A'
  ];
  form: FormGroup;
  MenuList: any = [];
  formFieldHelpers: string[] = ['fuse-mat-dense'];
  fixedSubscriptInput: FormControl = new FormControl('', [Validators.required]);
  dynamicSubscriptInput: FormControl = new FormControl('', [Validators.required]);
  fixedSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
  dynamicSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
  Id: any;
  url_image: string;
  itemData: any;
  dtOptions: DataTables.Settings = {};
  /**
   * Constructor
   */
  categories: any[] = []; // เก็บข้อมูลประเภทเกม
  type: string[] = [
    'Text', 'Image'
  ];
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // รูปแบบข้อความ
      [{ 'header': [1, 2, 3, false] }],       // ขนาดหัวข้อ
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // ลิสต์
      ['link', 'image']                      // ลิงก์และรูปภาพ
    ]
  };
  user: any;
  constructor(
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _Service: PageService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService,
    public activatedRoute: ActivatedRoute,
  ) {
    this.Id = this.activatedRoute.snapshot.paramMap.get('id');
    this.user = JSON.parse(localStorage.getItem('user'))
    this.form = this._formBuilder.group({
      id: '',
      chat: [],
      line: ''
    })
  }

  ngOnInit(): void {
    // if (this.Id) {
    //   this._Service.getById(this.Id).subscribe((resp: any) => {
    //     this.itemData = resp.data;
    //     this.form.patchValue({
    //       ...this.itemData,
    //       detail: this.itemData?.detail ?? '',
    //       page_categorie_id: this.itemData?.category?.id,
    //       image: ''
    //     })
    //     this.url_image = this.itemData?.image;
    //   })
    // } else {
    //   this.form.patchValue({
    //     brand: this.user?.brand
    //   })
    // }


  }

  loadCategories(): void {
    // this._Service.getpageCategories().subscribe({
    //   next: (categories: any) => {
    //     this.categories = Array.isArray(categories) ? categories : [];
    //   },
    //   error: (err) => console.error('Failed to load categories', err),
    // });
  }

  onSubmit(): void {
    // const confirmation = this._fuseConfirmationService.open({
    //   "title": "แก้ไขข้อมูล",
    //   "message": "คุณต้องการแก้ไขข้อมูลใช่หรือไม่ ",
    //   "icon": {
    //     "show": false,
    //     "name": "heroicons_outline:exclamation",
    //     "color": "warning"
    //   },
    //   "actions": {
    //     "confirm": {
    //       "show": true,
    //       "label": "ยืนยัน",
    //       "color": "primary"
    //     },
    //     "cancel": {
    //       "show": true,
    //       "label": "ยกเลิก"
    //     }
    //   },
    //   "dismissible": true
    // });

    // Subscribe to the confirmation dialog closed action
    // confirmation.afterClosed().subscribe((result) => {
    //   if (result === 'confirmed') {
    //     const formData = new FormData();
    //     Object.entries(this.form.value).forEach(([key, value]: any[]) => {
    //       formData.append(key, value);
    //     });
    //     for (var i = 0; i < this.files.length; i++) {
    //       formData.append('image', this.files[i]);
    //     }
    //     if (this.Id) {
    //       this._Service.update(formData).subscribe({
    //         next: (resp: any) => {
    //           this._router.navigate(['/admin/order/list'])
    //         },
    //         error: (err: any) => {
    //           this._fuseConfirmationService.open({
    //             "title": "กรุณาระบุข้อมูล",
    //             "message": err.error.message,
    //             "icon": {
    //               "show": true,
    //               "name": "heroicons_outline:exclamation",
    //               "color": "warning"
    //             },
    //             "actions": {
    //               "confirm": {
    //                 "show": false,
    //                 "label": "ยืนยัน",
    //                 "color": "primary"
    //               },
    //               "cancel": {
    //                 "show": false,
    //                 "label": "ยกเลิก",

    //               }
    //             },
    //             "dismissible": true
    //           });
    //         }
    //       })
    //     } else {
    //       this._Service.create(formData).subscribe({
    //         next: (resp: any) => {
    //           this._router.navigate(['/admin/order/list'])
    //         },
    //         error: (err: any) => {
    //           this._fuseConfirmationService.open({
    //             "title": "กรุณาระบุข้อมูล",
    //             "message": err.error.message,
    //             "icon": {
    //               "show": true,
    //               "name": "heroicons_outline:exclamation",
    //               "color": "warning"
    //             },
    //             "actions": {
    //               "confirm": {
    //                 "show": false,
    //                 "label": "ยืนยัน",
    //                 "color": "primary"
    //               },
    //               "cancel": {
    //                 "show": false,
    //                 "label": "ยกเลิก",

    //               }
    //             },
    //             "dismissible": true
    //           });
    //         }
    //       })
    //     }

    //   }
    // })
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the form field helpers as string
   */
  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }

  backTo() {
    // this._router.navigate(['admin/game/list'])
  }

}
