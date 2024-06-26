import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Material Form Controls
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

// Material Navigation
// Импорт дополнительных модулей, если необходимо

// Material Layout
// Импорт дополнительных модулей, если необходимо

// Material Buttons & Indicators
import { MatIconModule } from '@angular/material/icon';

// Material Popups & Modals
// Импорт дополнительных модулей, если необходимо

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatMenuModule
    ],
    exports: [
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatMenuModule
    ]
})
export class MaterialModule {}
