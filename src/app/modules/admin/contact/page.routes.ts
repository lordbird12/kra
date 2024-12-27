import { Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { FormComponent } from './form/form.component';


export default [
    {
        path     : '',
        component: PageComponent,
        children : [
            {
                path     : 'form',
                component: FormComponent,
           
            },
        ],
    },


] as Routes;
