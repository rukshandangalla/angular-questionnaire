import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { GrowlModule } from 'primeng/growl';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressBarModule } from 'primeng/progressbar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BlockUIModule } from 'primeng/blockui';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { LightboxModule } from 'primeng/lightbox';
import { TooltipModule } from 'primeng/tooltip';
import { DragDropModule } from 'primeng/dragdrop';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';

@NgModule({
    imports: [CommonModule],
    exports: [
        InputTextModule,
        ButtonModule,
        AccordionModule,
        SidebarModule,
        MenuModule,
        ConfirmDialogModule,
        CalendarModule,
        DialogModule,
        DropdownModule,
        CheckboxModule,
        RadioButtonModule,
        TabViewModule,
        MessagesModule,
        GrowlModule,
        InputSwitchModule,
        FileUploadModule,
        InputTextareaModule,
        PanelMenuModule,
        AutoCompleteModule,
        ProgressBarModule,
        MultiSelectModule,
        InputMaskModule,
        CardModule,
        ScrollPanelModule,
        TableModule,
        TreeModule,
        TreeTableModule,
        LightboxModule,
        KeyFilterModule,
        OverlayPanelModule,
        BlockUIModule,
        TooltipModule,
        DragDropModule,
        SplitButtonModule,
        PanelModule,
        StepsModule
    ],
    providers: [ConfirmationService]
})
export class PrimeNgModule { }

