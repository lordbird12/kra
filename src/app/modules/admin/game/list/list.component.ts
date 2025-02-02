

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatTableModule } from '@angular/material/table';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { PageService } from '../page.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { PictureComponent } from '../../picture/picture.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
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
    ],
})

export class ListComponent implements OnInit, AfterViewInit {

    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    isLoading: boolean = false;
    dataRow: any[] = [];
    dtOptions: DataTables.Settings = {};
    positions: any[];
    form: FormGroup
    categories: any[] = []
    brand: string[] = [
        'K', 'R' ,'A'
    ];
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    // public dataRow: any[];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router,
        private _fb: FormBuilder
    ) {
        this.form = this._fb.group({
            game_categorie_id: null,
            brand: null
        })
     }

    ngOnInit() {
        this.loadTable();
        this.loadCategories();
     
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    loadCategories(): void {
        this._service.getGameCategories().subscribe({
            next: (categories: any) => {
                console.log('Categories:', categories); // ตรวจสอบค่าที่ได้
                this.categories = Array.isArray(categories) ? categories : []; // แปลงให้เป็นอาเรย์ถ้าจำเป็น
            },
            error: (err) => console.error('Failed to load categories', err),
        });
    }


    // เพิ่มเมธอด editElement(element) และ deleteElement(element)
    editElement(element: any) {
        // this._router.navigate(['/admin/game/edit/' + element.id])
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px', // กำหนดความกว้างของ Dialog
            data: element
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.rerender();
                // เมื่อ Dialog ถูกปิด ดำเนินการตามผลลัพธ์ที่คุณได้รับจาก Dialog
            }
        });
    }
    addElement() {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px', // กำหนดความกว้างของ Dialog
            maxHeight: '100Vh'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {

                this.rerender();
                // เมื่อ Dialog ถูกปิด ดำเนินการตามผลลัพธ์ที่คุณได้รับจาก Dialog
            }
        });
    }
    
  

    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable(): void {
        const that = this;
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 25,
            serverSide: true,
            processing: true,
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json",
            },
            ajax: (dataTablesParameters: any, callback) => {
                // dataTablesParameters.status = null;
                dataTablesParameters.game_categorie_id = this.form.value.game_categorie_id;
                dataTablesParameters.brand = this.form.value.brand
                that._service.getPage(dataTablesParameters).subscribe((resp: any) => {
                    this.dataRow = resp.data;
                    this.pages.current_page = resp.current_page;
                    this.pages.last_page = resp.last_page;
                    this.pages.per_page = resp.per_page;
                    if (resp.data.currentPage > 1) {
                        this.pages.begin =
                            parseInt(resp.per_page) *
                            (parseInt(resp.current_page) - 1);
                    } else {
                        this.pages.begin = 0;
                    }

                    callback({
                        recordsTotal: resp.total,
                        recordsFiltered: resp.total,
                        data: [],
                    });
                    this._changeDetectorRef.markForCheck();
                });
            },
            columns: [
                { data: 'No' },
                { data: 'image' },
                { data: 'name' },
                { data: 'brand' },
                { data: 'game_categorie' },
                { data: 'show_step' },
                { data: 'created_at' },
                { data: 'action',orderable: false },

            ],
        };
    }

    delete(itemid: any) {
        const confirmation = this._fuseConfirmationService.open({
            title: 'ลบข้อมูล',
            message: 'คุณต้องการลบข้อมูลใช่หรือไม่ ?',
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation-triangle',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'ยืนยัน',
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: 'ยกเลิก',
                },
            },
            dismissible: true,
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._service.delete(itemid).subscribe((resp) => {
                    this.rerender();
                });
            }
            error: (err: any) => {};
        });
    }

    showPicture(imgObject: any): void {
        this.dialog
            .open(PictureComponent, {
                autoFocus: false,
                data: {
                    imgSelected: imgObject,
                },
            })
            .afterClosed()
            .subscribe(() => {
                // Go up twice because card routes are setup like this; "card/CARD_ID"
                // this._router.navigate(['./../..'], {relativeTo: this._activatedRoute});
            });
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }
}


